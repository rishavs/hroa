const m = require("mithril")
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

const Home = {
    oninit: () => {
        NProgress.start();
        NProgress.done();
    },
    view: () => 

        <div class="ui main container pageEntry">
            <h1>Home</h1>
        </div>

}

export default Home;