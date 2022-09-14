import {renderHomePage} from "./handlers/renderHomePage.js"
import {setHTMLHeaders} from "./handlers/setHTMLHeaders.js"
import {setAPIHeaders} from "./handlers/setAPIHeaders.js"
import {initContext} from "./handlers/initContext.js"
import {renderAboutPage} from "./handlers/renderAboutPage.js"
import {renderPostDetails} from "./handlers/renderPostDetails.js"
import { renderErrorPage } from "./handlers/renderErrorPage.js"
import {sayHelloInJSON} from "./handlers/sayHelloInJSON.js"
import { throwError } from "./handlers/throwError.js"

class Pika {
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
        this.config = {
            env: env,
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
                return this.config.env.ASSETS.fetch(this.req);    
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
            // console.log(err)
            // return new Response(err)
            if (["401", "404", "418"].includes(err.message)) {
                return new Response (`${err.name} ${err.message} : ${err.cause }`, {status: err.message})
            } else {
                return new Response (`Server Error - 500\n${err.stack}`, {status: 500})
            }
        }
        // console.log(this.res)
        // return new Response(this.route.sanitised)
        return new Response(this.res.body, {status: 200, statusText: "OK", headers: this.res.options.headers})

    }
}

export default {
    async fetch(request, env) {
        const pika = new Pika(request, env)

        pika.serveStatic("/pub")

        pika.get("/",           [initContext, setHTMLHeaders, renderHomePage])
        pika.get("/posts/:id",  [initContext, setHTMLHeaders, renderHomePage])
        pika.post("/api",       [initContext, setAPIHeaders, sayHelloInJSON])
        
        pika.onNotFound([initContext, setHTMLHeaders, renderHomePage])
        pika.onError([initContext, setHTMLHeaders, renderHomePage])

        let response = pika.run()
        return response
    }
}

