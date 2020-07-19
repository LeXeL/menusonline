import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'

import DefaultLayout from './layouts/Default.vue'
import Menu from './views/Menu.vue'
import Restaurants from './views/Restaurants'
import Menus from './views/Menus'
import MenuDetails from './views/MenuDetails'
import Login from './layouts/Login'
Vue.use(Router)

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        console.log(store.getters.isAuthenticated)
        next()
    } else next('/login')
}
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/restaurants',
            component: DefaultLayout,
            beforeEnter: ifAuthenticated,
            children: [
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
            path: '/:path',
            component: Menu,
        },
        {
            path: '/login',
            component: Login,
        },
    ],
})
