const m = require("mithril")
import Backend from "./../services/Backend.js";

const Login = {
    state: {

    },
    actions: {
        submit_form: async () => {
            console.log(document.getElementById("username").value)
            console.log(document.getElementById("password").value)
            try {
                let auth_token = await Backend.login(
                    document.getElementById("username").value, 
                    document.getElementById("password").value
                )                
                console.log("User logged in successfully with token:")
                console.log(auth_token)
            } catch (err) {
                console.log('Error getting documents', err)
            }

            return false
        }
    },
    oninit: () => {

    },
    view: (vnode) =>

        <div class="ui main container pageEntry">
            <form class="ui form" onsubmit={vnode.state.actions.submit_form}>
                <div class="field">
                    <label>User Name</label>
                    <input type="text" id="username" placeholder="User Name" />
                </div>
                <div class="field">
                    <label>Password</label>
                    <input type="text" id="password" placeholder="Password" />
                </div>
                <div class="field">
                    <div class="ui checkbox">
                        <input type="checkbox" tabindex="0" class="hidden" />
                        <label>Remember me</label>
                    </div>
                </div>
                <button class="ui button" type="submit" >Submit</button>
            </form>
        </div>

}

export default Login;