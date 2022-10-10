import {renderLayout} from "../views/renderLayout.js"

export const renderErrorPage = async (ctx, e) => {
    var props = {
        title: "Error Page",
        description: "MAY DAY MAYDAY!",
        // page : `${e.name} ${e.message} : ${e.cause }`
        // page : await postsList()
    }

    if (["401", "404", "418"].includes(e.message)) {
        props.page = `${e.name} ${e.message} : ${e.cause }`
        ctx.res.options = {status: e.message}
    } else {
        ctx.res.body = `Server Error: ${e}`
        ctx.res.options = {status: 500}
    }
    ctx.res.body = renderLayout(props)
}
