const m = require("mithril")
import Backend from "./../services/Backend.js";

$(document).ready(function () {
    $('.ui.form').form({
        fields: {
            username: 'empty',
            password: ['minLength[3]', 'empty'],
        }
    });
})


const Register = {
    state: {

    },
    actions: {
        submit_form: async () => {

            let new_user = await Backend.register_user(
                document.getElementById("username_input").value,
                document.getElementById("password_input").value
            )
            if (new_user) {
                console.log("User was added successfully")
            }
            else {
                "New Comment reference not received"
            }
            return false
        }
    },
    oninit: () => {

    },
    view: (vnode) =>

        <div id="register_page" class="ui main container pageEntry">
            <form class="ui form" id="register_form" onsubmit={vnode.state.actions.submit_form}>
                <div class="field">
                    <label>Username</label>
                    <input type="text" id="username_input" placeholder="Username" />
                </div>
                <div class="field">
                    <label>Password</label>
                    <input type="text" id="password_input" placeholder="Password" />
                </div>

                <button class="ui button" type="submit" >Submit</button>

                <div class="ui error message"></div>
            </form>
        </div>

}

export default Register;