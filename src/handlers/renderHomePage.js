import {renderLayout} from "../views/renderLayout.js"
import {fetchAllPosts} from "../database.js"
// import {postsList} from "./../views/pages/postsList.js"

export const renderHomePage = async ({res, env}) => {

    const { data, error } = await fetchAllPosts(env)
    if (error) throw error

    let postsList = ""
    data.forEach(item => 
        postsList += `<li><a href="/posts/${item.id}">${item.title}</a></li>\n`)

    let renderPageContent = async () => /*html*/`
        <article class="min-h-screen">
            <h1> HOME PAGE</h1>
            <ol> ${postsList} </ol>
        </article>
    `
    const props = {
        title: "Posts List",
        description: "This here is the description of the post list page",
        page : await renderPageContent()
    }

    res.body = renderLayout(props)
}
