import {renderLayout} from "../views copy/renderLayout.js"
// import {postsList} from "./../views/pages/postsList.js"

export const renderHomePage = async ({res}) => {

    var props = {
        title: "Posts List",
        description: "This here is the description of the post list page",
        page : `<h1> HOME </h1>`
        // page : await postsList()
    }

    const view = renderLayout(props)
    res.body = view
}
