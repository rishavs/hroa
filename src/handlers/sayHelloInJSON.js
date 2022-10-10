
export const sayHelloInJSON = async (ctx) => {
    // let msg = {
    //     greet: "Hello World"
    // }
    ctx.res.body = JSON.stringify(ctx.req)
}
