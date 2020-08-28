import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'

import Menu from './views/Menu.vue'
import Restaurants from './views/Restaurants'
import Menus from './views/Menus'
import MenuDetails from './views/MenuDetails'
import Demo from './views/wp/Demo'
import BiggFive from './views/wp/BiggFive'
import CeciliaPescao from './views/wp/CeciliaPescao'
import Enid from './views/wp/Enid'

import DefaultLayout from './layouts/Default.vue'
import Login from './layouts/Login'
import Landing from './layouts/Landing'
import WhatsappOrders from './layouts/WhatsappOrders'

Vue.use(Router)

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next()
    } else next('/login/login')
}
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/restaurants/restaurants',
            component: DefaultLayout,
            beforeEnter: ifAuthenticated,
            children: [
                {
                    path: '/restaurants/restaurants',
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
            path: '/login/login',
            component: Login,
        },
        {
            path: '/',
            component: Landing,
        },
        {
            path: '/wp',
            component: WhatsappOrders,
            children: [
                {
                    path: '/wp/demo',
                    name: 'demo',
                    component: Demo,
                },
                {
                    path: '/wp/biggfive',
                    name: 'biggfive',
                    component: BiggFive,
                },
                {
                    path: '/wp/ceciliapescao',
                    name: 'ceciliapescao',
                    component: CeciliaPescao,
                },
                {
                    path: '/wp/enid',
                    name: 'enid',
                    component: Enid,
                },
            ],
        },
    ],
})
