import {renderHomePage} from "./handlers/renderHomePage.js"
import {renderOauthPage} from "./handlers/renderOauthPage.js"
import {setHTMLHeaders} from "./handlers/setHTMLHeaders.js"
import {setAPIHeaders} from "./handlers/setAPIHeaders.js"
import {initContext} from "./handlers/initContext.js"
import {renderAboutPage} from "./handlers/renderAboutPage.js"
import {renderPostDetails} from "./handlers/renderPostDetails.js"
import { renderErrorPage } from "./handlers/renderErrorPage.js"
import {sayHelloInJSON} from "./handlers/sayHelloInJSON.js"
import { throwError } from "./handlers/throwError.js"

import {Pika} from "./pika.js"

export default {
    async fetch(request, env) {
        console.log (env)
        const pika = new Pika(request, env)

        pika.serveStatic("/pub")
        pika.get("/",           [initContext, setHTMLHeaders, renderHomePage])
        pika.get("/posts/:id",  [initContext, setHTMLHeaders, renderPostDetails])
        pika.get("/oauth/:id",        [initContext, setHTMLHeaders, renderOauthPage])
        // pika.get("/oauth/google/callback",       [sayHelloInJSON])
        pika.post("/api",       [initContext, setAPIHeaders, sayHelloInJSON])
        
        pika.onNotFound([initContext, setHTMLHeaders, renderHomePage])
        pika.onError([initContext, setHTMLHeaders, renderHomePage])

        return pika.run()
    }
}

