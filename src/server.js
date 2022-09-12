
let initContext = async (ctx) => {
    console.log("Setting Context")
    ctx.store.state = "set"
    ctx.store.reqStartedAt = Date.now()
    return ctx
}
let serveHome = async (ctx) => {
    console.log("HOME")
    ctx.res.body = "HOME"
    return ctx
}
let serveAbout = async (ctx) => {
    console.log("About")
    ctx.res.body = "About"
    return ctx
}
let serveError = async (ctx) => {
    console.log("About")
    ctx.res.body = "About"
    throw new Error("This is some next level error. We have never its like in History!")
}
let servePostById = async (ctx) => {
    console.log("Id")
    ctx.res.body = "Id"
    return ctx
}
let logger = async (ctx) => {
    ctx.store.timeTaken = Date.now() - ctx.store.reqStartedAt
    console.log(`Execution time: ${ctx.store.timeTaken} ms`);

    return ctx
}

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    'GET/'             : [initContext, serveHome, logger]
    , 'GET/about'      : [initContext, serveAbout, logger]
    , 'GET/p/:id'      : [initContext, servePostById, logger]
    , 'GET/error'      : [initContext, serveError, logger]
};

class Context {
    constructor(request, env) {
        this.req = request
        this.res = {
            body:"",
            options: {},
            path: "",
            resourceType: "",
            resourceId: "",
        },
        this.env = env,
        this.store = {}
      }
}

const app = {
    async fetch(request, env) {
        try {
            let ctx = new Context(request, env)

            const url = new URL(request.url);
            let urlFrag = url.pathname.split('/')
            let requestedRoute = urlFrag[2] ? `${request.method}/${urlFrag[1]}/${urlFrag[2]}`: `${request.method}/${urlFrag[1]}`
    
            if (requestedRoute in routes) {
                let middlewares = routes[requestedRoute]
                for (const middleware of middlewares) {
                    await middleware(ctx)
                } 
                return new Response(ctx.res.body, ctx.res.options)
            } else {
                // return new Response ("404 NOT FOUND", {status: 404})
                throw new Error(404, {cause: "Not Found. Let me get map fer ya"})
            }
        } catch (e) {
            console.log(e.message)
            if (["401", "404", "418"].includes(e.message)) {
                return new Response (`${e.name} ${e.message} : ${e.cause }`, {status: e.message})
            } else {
                return new Response (`Server Error - 500\n${e.stack}`, {status: 500})
            }
        }       
    }
}

export default app
