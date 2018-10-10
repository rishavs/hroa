const m = require("mithril")
import Backend from "./../services/Backend.js";
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

$(document).ready(function () {
    $('.ui.form').form({
        fields: {
            username: 'empty',
            password: ['minLength[3]', 'empty'],
        }
    });
})

const Login = {
    state: {

    },
    actions: {
        submit_form: async () => {
            console.log(document.getElementById("username_input").value)
            console.log(document.getElementById("password_input").value)
            try {
                let auth_token = await Backend.login(
                    document.getElementById("username_input").value, 
                    document.getElementById("password_input").value
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
        NProgress.start();
        NProgress.done();
    },
    view: (vnode) =>

        <div id="login_page" class="ui main container pageEntry">
            <form class="ui form" id="login_form" onsubmit={vnode.state.actions.submit_form}>
                <div class="field">
                    <label>Username</label>
                    <input type="text" id="username_input" placeholder="Username" />
                </div>
                <div class="field">
                    <label>Password</label>
                    <input type="text" id="password_input" placeholder="Password" />
                </div>
                <div class="field">
                    <div class="ui checkbox">
                        <input type="checkbox" tabindex="0" class="hidden" />
                        <label>Remember me</label>
                    </div>
                </div>

                <button class="ui button" type="submit" >Submit</button>

                <div class="ui error message"></div>
            </form>
        </div>

}

export default Login;