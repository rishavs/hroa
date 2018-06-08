const m = require("mithril")
import Backend from "./../services/Backend.js";

const Register = {
    state: {

    },
    actions: {
        submit_form: async () => {
            // console.log(document.getElementById("username").value)
            // console.log(document.getElementById("email").value)
            // console.log(document.getElementById("name").value)
            // console.log(document.getElementById("password").value)
            // console.log(document.getElementById("reenter_password").value)
            let new_user = await Backend.register_user(
                document.getElementById("username").value, 
                document.getElementById("email").value, 
                document.getElementById("name").value, 
                document.getElementById("password").value
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
            <form class="ui form" onsubmit={vnode.state.actions.submit_form}>
                <div class="field">
                    <label>Username</label>
                    <input type="text" id="username" placeholder="Username" />
                </div>
                <div class="field">
                    <label>Email</label>
                    <input type="email" id="email" placeholder="First Name" />
                </div>
                <div class="field">
                    <label>Display Name</label>
                    <input type="text" id="name" placeholder="First Name" />
                </div>
                <div class="field">
                    <label>Password</label>
                    <input type="text" id="password" placeholder="Last Name" />
                </div>
                <div class="field">
                    <label>Re-enter Password</label>
                    <input type="text" id="reenter_password" placeholder="Last Name" />
                </div>
                <button class="ui button" type="submit" >Submit</button>
            </form>
        </div>

}

export default Register;