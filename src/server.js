import { Hono, serveStatic } from 'hono'
const app = new Hono()

// app.use('/pub/*', serveStatic({ root: './' }))

app.get('/pub/*', async (c) => {
    return await c.env.ASSETS.fetch(c.req)
})
  

app.get('/', (c) => c.html(
    /*html*/`
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <link rel="icon" type="image/x-icon" href="/pub/favicon.ico">
            <title>A Meaningful Page Title</title>
        </head>
        <body>

        The content of the document......
        <img src="/pub/bm.png" />

        </body>
    </html>
    `
))

export default app
