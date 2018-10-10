const m = require("mithril")
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

const NotFound404 = {
    oninit: () => {
        NProgress.start();
        NProgress.done();
    },
    view: () => 

        <div class="ui main container pageEntry">
            <h1>404 Not Found</h1>
        </div>

}

export default NotFound404;