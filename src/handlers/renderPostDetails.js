import {renderLayout} from "../views/renderLayout.js"
import {fetchSpecificPostById} from "../database.js"

export const renderPostDetails = async ({env, route, res}) => {

    const data = await fetchSpecificPostById(env, route.resource.id)
    // if (error) throw error

    console.log(data)

    let renderPageContent = async () => /*html*/`
        <article class="min-h-screen">
            <h1> Post Id: ${data[0].id}</h1>
            <h2> ${data[0].title}</h2>
            <p>${data[0].description} </p>
        </article>
    `
    const props = {
        title: "Posts List",
        description: "This here is the description of the post list page",
        page : await renderPageContent()
    }

    res.body = await renderLayout(props)
}
