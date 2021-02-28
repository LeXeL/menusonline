import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'

import DefaultLayout from './layouts/Default.vue'
import Login from './layouts/Login'
import Landing from './layouts/Landing'
import WhatsappOrders from './layouts/WhatsappOrders'

//DASHBOARD VIEWS
import Home from '@/views/dashboard/Home'
import Restaurants from '@/views/dashboard/Restaurants'
import WPManager from '@/views/dashboard/WPManager'
import InvoiceManager from '@/views/dashboard/Invoicing'
import MenuBuilder from '@/views/dashboard/MenuBuilder'

//Carta Digital
import Menu from './views/cartadigital/Menu.vue'
import Menus from './views/cartadigital/Menus'
import MenuDetails from './views/cartadigital/MenuDetails'

//Whatsapp Pedidos
import Demo from './views/wp/Demo'
import BiggFive from './views/wp/BiggFive'
import CeciliaPescao from './views/wp/CeciliaPescao'
import Enid from './views/wp/Enid'
import Madamecoco from './views/wp/Madamecoco'
import PanamaHotdog from './views/wp/PanamaHotdog'
import CeroTranque from './views/wp/CeroTranque'
import GarageBurgers from './views/wp/GarageBurgers'
import SpecialOneBurger from './views/wp/SpecialOneBurger'

Vue.use(Router)

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next()
    } else next('/login/login')
}
export default new Router({
    mode: 'history',
    routes: [
        //LANDING
        {
            path: '/',
            component: Landing,
        },

        //LOGIN
        {
            path: '/login',
            component: Login,
        },

        //ADMIN PANEL
        {
            path: '/admin/restaurants',
            component: DefaultLayout,
            beforeEnter: ifAuthenticated,
            children: [
                {
                    path: '/admin/home',
                    name: 'home',
                    component: Home,
                },
                {
                    path: '/admin/restaurants',
                    name: 'restaurants',
                    component: Restaurants,
                },
                {
                    path: '/admin/restaurants/:restaurantId',
                    name: 'restaurant-amanger',
                    component: WPManager,
                },
                {
                    path: '/admin/invoicing',
                    name: 'invoice-manager',
                    component: InvoiceManager,
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
                {
                    path: '/menu-builder',
                    name: 'menu-builder',
                    component: MenuBuilder
                }
            ],
        },

        //CARTA DIGITAL
        {
            path: '/angel',
            component: Menu,
        },
        {
            path: '/demo',
            component: Menu,
        },

        //Whatsapp Pedidos
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
                {
                    path: '/wp/madamecoco',
                    name: 'madamecoco',
                    component: Madamecoco,
                },
                {
                    path: '/wp/panamahotdog',
                    name: 'panamahotdog',
                    component: PanamaHotdog,
                },
                {
                    path: '/wp/cerotranque',
                    name: 'cerotranque',
                    component: CeroTranque,
                },
                {
                    path: '/wp/garageburgers',
                    name: 'garageburgers',
                    component: GarageBurgers,
                },
                {
                    path: '/wp/specialoneburger',
                    name: 'specialoneburger',
                    component: SpecialOneBurger,
                },
            ],
        },
    ],
})
