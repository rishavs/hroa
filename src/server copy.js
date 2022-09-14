import {renderHomePage} from "./handlers/renderHomePage.js"
import {setHTMLHeaders} from "./handlers/setHTMLHeaders.js"
import {initContext} from "./handlers/initContext.js"
import {renderAboutPage} from "./handlers/renderAboutPage.js"
import {renderPostDetails} from "./handlers/renderPostDetails.js"
import { renderErrorPage } from "./handlers/renderErrorPage.js"
import { throwError } from "./handlers/throwError.js"

class Pika {
    constructor(ctx) {
        this.ctx = ctx
    }
}

const pika = new Pika()

pika.get("/", [()=>"XX"])
pika.get("/post/:id", [()=>"XX"])
pika.post("/api", [()=>"XX"])
pika.onNotFound([])
pika.onError([])

let response = pika.run()
return response

let logger = async (ctx) => {
    ctx.store.timeTaken = Date.now() - ctx.store.reqStartedAt
    console.log(`Execution time: ${ctx.store.timeTaken} ms`);

    return ctx
}

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    'GET/'             : [initContext, setHTMLHeaders, renderHomePage, logger]
    , 'GET/about'      : [initContext, setHTMLHeaders, renderAboutPage, logger]
    , 'GET/p/:id'      : [initContext, setHTMLHeaders, renderPostDetails, logger]
    , 'GET/error'      : [initContext, setHTMLHeaders, throwError, logger]
};

class Context {
    constructor(request, env) {
        this.req = request
        this.res = {
            body:"",
            options: {
                status: 200,
                statusText: "OK",
                // headers: 
            },
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
        let ctx = new Context(request, env)

        try {        
            const url = new URL(request.url);
            // ------------------------------------------
            // Serve Static assets
            // ------------------------------------------
            if (url.pathname.startsWith("/pub/")) {
                return env.ASSETS.fetch(request);    
            }

            // ------------------------------------------
            // Serve Dynamic routes
            // ------------------------------------------
            let urlFrag = url.pathname.split('/')
            let requestedRoute = urlFrag[2] ? `${request.method}/${urlFrag[1]}/${urlFrag[2]}`: `${request.method}/${urlFrag[1]}`
    
            if (requestedRoute in routes) {
                let middlewares = routes[requestedRoute]
                for (const middleware of middlewares) {
                    await middleware(ctx)
                } 
            } else {
                throw new Error(404, {cause: "Not Found. Let me get mah map fer ya"})
            }
        } catch (e) {
            console.log(e.message)
            renderErrorPage(ctx, e)
            // if (["401", "404", "418"].includes(e.message)) {
            //     return new Response (`${e.name} ${e.message} : ${e.cause }`, {status: e.message})
            // } else {
            //     return new Response (`Server Error - 500\n${e.stack}`, {status: 500})
            // }
        }       
        return new Response(ctx.res.body, ctx.res.options)

    }
}

export default app
