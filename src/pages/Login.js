const m = require("mithril")

const Login = {
    state: {

    },
    actions: {
        submit_form: () => {
            console.log(document.getElementById("username").value)
            console.log(document.getElementById("password").value)
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
                    <input type="text" id="username" placeholder="First Name" />
                </div>
                <div class="field">
                    <label>Password</label>
                    <input type="text" id="password" placeholder="Last Name" />
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