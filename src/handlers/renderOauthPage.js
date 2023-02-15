import {renderLayout} from "../views/renderLayout.js"
// import {postsList} from "./../views/pages/postsList.js"

export const renderOauthPage = async ({req, res}) => {

    // const { data, error } = await db.from('posts').select('*').limit(10)
    // if (error) throw error

    // let postsList = ""
    // data.forEach(item => 
    //     postsList += `<li><a href="/posts/${item.id}">${item.title}</a></li>\n`)

    let renderPageContent = async () => /*html*/`
    <article class="min-h-screen">
        <h1> Google Auth PAGE</h1>
        <p>Redirects come here for Google Authentication</p>
        <p> ${req.body} </p>
    </article>

`
    const props = {
        title: "Posts List",
        description: "This here is the description of the post list page",
        page : await renderPageContent()
    }

    res.body = renderLayout(props)
}
