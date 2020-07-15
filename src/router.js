import Vue from 'vue'
import Router from 'vue-router'
import DefaultLayout from './layouts/Default.vue'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Menu from './views/Menu.vue'
import Login from './layouts/Login'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: DefaultLayout,
            children: [
                {
                    path: '',
                    name: 'home',
                    component: Restaurants,
                },
                {
                    path: '/about',
                    name: 'about',
                    component: About,
                },
                {
                    path: '/restaurants',
                    name: 'restaurants',
                    component: Restaurants,
                },
                {
                    path: '/menus/:id',
                    name: 'menus',
                    component: Menus,
                },
                {
                    path: '/menu-details/:id',
                    name: 'menu-details',
                    component: MenuDetails,
                },
            ],
        },
        {
            path: '/menu/:id',
            component: Menu,
        },
        {
            path: '/login',
            component: Login,
        },
    ],
})
