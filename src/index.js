const m = require("mithril")


import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound404 from './pages/NotFound404'


m.route.prefix('#')

m.route(document.body, '/', {
    '/' : {
        render: () => m(Layout, m(Home))
    },
    '/about' : {
        render: () => m(Layout, m(About))
    },
    '/login' : {
        render: () => m(Layout, m(Login))
    },
    '/register' : {
        render: () => m(Layout, m(Register))
    },
    '/:any...' : {
        render: () => m(Layout, m(NotFound404))
    },  
  
})