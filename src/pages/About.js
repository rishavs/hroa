const m = require("mithril")
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

const About = {
    oninit: () => {
        NProgress.start();
        NProgress.done();
    },
    view: () => 

        <div class="ui main container pageEntry">
            <h1>About</h1>
        </div>

}

export default About;
