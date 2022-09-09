import { Hono } from 'hono'
const app = new Hono()

app.get('/', (c) => c.text('Hello World! This is Hono!'))

export default app
