const m = require("mithril")
import Backend from "./../services/Backend.js";

const Register = {
    state: {

    },
    actions: {
        submit_form: () => {
            console.log(document.getElementById("email").value)
            console.log(document.getElementById("name").value)
            console.log(document.getElementById("password").value)
            console.log(document.getElementById("reenter_password").value)
            Backend.register_user(document.getElementById("email").value, document.getElementById("name").value, document.getElementById("password").value)
            return false
        }
    },
    oninit: () => {

    },
    view: (vnode) =>

        <div class="ui main container pageEntry">
            <form class="ui form" onsubmit={vnode.state.actions.submit_form}>
                <div class="field">
                    <label>Email</label>
                    <input type="text" id="email" placeholder="First Name" />
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