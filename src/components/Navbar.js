// import LogoURL from '../../img/logo.png';
// import backend from "./../services/backend.js";

const m = require("mithril")

export default {
    view: () => {
        return (
            <div class="ui fixed menu">
                <div class="ui container">
                    <a href="/" class="header item" oncreate={m.route.link}>
                        Digglu
        			</a>
                    <div class="item">
                        <a href="/login" class="ui blue button" oncreate={m.route.link}>Login</a>
                    </div>
				</div>
            </div>
        )
    }
}
