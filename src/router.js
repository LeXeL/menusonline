import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'

//DASHBOARD VIEWS
import Home from '@/views/dashboard/Home'
import Restaurants from '@/views/dashboard/Restaurants'
import RestaurantManager from '@/views/dashboard/RestaurantManager'
import InvoiceManager from '@/views/dashboard/Invoicing'

import Menu from './views/Menu.vue'
import Menus from './views/Menus'
import MenuDetails from './views/MenuDetails'
import Demo from './views/wp/Demo'
import BiggFive from './views/wp/BiggFive'
import CeciliaPescao from './views/wp/CeciliaPescao'
import Enid from './views/wp/Enid'
import Madamecoco from './views/wp/Madamecoco'
import PanamaHotdog from './views/wp/PanamaHotdog'
// import Decoralid from './views/wp/Decoralid'
// import RicaSazon from './views/wp/RicaSazon'
// import DeliciasBocatorenas from './views/wp/DeliciasBocatorenas'
import CeroTranque from './views/wp/CeroTranque'
// import LaVillaFood from './views/wp/LaVillaFood'
import GarageBurgers from './views/wp/GarageBurgers'
import SpecialOneBurger from './views/wp/SpecialOneBurger'

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
                    path: '/admin/restaurants/rest-uid',
                    name: 'restaurant-amanger',
                    component: RestaurantManager,
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
                // {
                //     path: '/wp/decoralid',
                //     name: 'decoralid',
                //     component: Decoralid,
                // },
                // {
                //     path: '/wp/ricasazon',
                //     name: 'ricasazon',
                //     component: RicaSazon,
                // },
                // {
                //     path: '/wp/deliciasbocatorenas',
                //     name: 'deliciasbocatorenas',
                //     component: DeliciasBocatorenas,
                // },
                {
                    path: '/wp/cerotranque',
                    name: 'cerotranque',
                    component: CeroTranque,
                },
                // {
                //     path: '/wp/lavillafood',
                //     name: 'lavillafood',
                //     component: LaVillaFood,
                // },
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
