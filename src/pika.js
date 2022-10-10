export class Pika {
    constructor(request, env) {

        this.req = request
        this.res = {
            body:"Internal Server Error 500",
            options: {
                status: 500,
                statusText: "InternalServerError",
                headers: new Headers()
            },
        }
        this.route = {
            url: new URL(request.url),
            resource: {
                name: "",
                id: ""
            },
            sanitised: "",
            params: {},

        }
        this.store = {}
        this.env = env
        this.config = {
            routes : {},
            notFoundHandlers : [],
            errorHandlers : [],
            staticFilePath: ""
        }
    }

    async get (route, handlers) {
        this.config.routes["GET/" + route] = handlers
    }
    async post (route, handlers) {
        this.config.routes["POST/" + route] = handlers
    }
    async onNotFound (handlers) {
        this.config.notFoundHandlers = handlers
    }
    async onError (handlers) {
        this.config.errorHandlers = handlers
    }
    async serveStatic (path) {
        this.config.staticFilePath = path
    }

    async run() {
        try {
            // ------------------------------------------
            // Serve Static assets
            // ------------------------------------------
            if (this.route.url.pathname.startsWith(this.config.staticFilePath)) {
                return this.env.ASSETS.fetch(this.req);    
            }
            // ------------------------------------------
            // Serve Dynamic routes
            // ------------------------------------------
            let urlFrag = this.route.url.pathname.split('/').filter((a) => a)
            
            this.route.resource.name = urlFrag[0]
            this.route.resource.id = urlFrag[1]

            if(urlFrag[1]) { urlFrag[1] = ":id" }
            
            this.route.sanitised = `${this.req.method}//${urlFrag.join('/')}`

            if (this.route.sanitised in this.config.routes) {
                let middlewares = this.config.routes[this.route.sanitised]
                for (const middleware of middlewares) {
                    await middleware(this)
                } 
            } else {
                throw new Error("404", {cause:"Not all who wander are lost"})
            }
        } catch (err) {
            console.error(err)
            if (["401", "404", "418"].includes(err.message)) {
                return new Response (`${err.name} ${err.message} : ${err.cause }`, {status: err.message})
            } else {
                return new Response (`Server Error - 500\n${err.stack}`, {status: 500})
            }
        }
        return new Response(this.res.body, {status: 200, statusText: "OK", headers: this.res.options.headers})
    }
}
