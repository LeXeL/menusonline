import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store.js'
import './quasar'

import firebase from 'firebase/app'

import 'firebase/analytics'

import LoadingAlert from '@/components/general/LoadingAlert'
import BrewthersAlert from '@/components/general/Alert'
import Confirm from '@/components/general/Confirm'
import VueSmoothScroll from 'vue2-smooth-scroll'

import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()

Vue.use(VueSmoothScroll)

Vue.config.productionTip = false

const firebaseConfig = {
    apiKey: 'AIzaSyBQdeyP1g8ciatnKYMd_ZzdPzF-Jm8Alvk',
    authDomain: 'menusonline-f988f.firebaseapp.com',
    databaseURL: 'https://menusonline-f988f.firebaseio.com',
    projectId: 'menusonline-f988f',
    storageBucket: 'menusonline-f988f.appspot.com',
    messagingSenderId: '714514385228',
    appId: '1:714514385228:web:74371a3f4137cb3ceba7e9',
    measurementId: 'G-KVTDW7X2PD',
}
firebase.initializeApp(firebaseConfig)

firebase.analytics()

Vue.component('brewthers-alert', BrewthersAlert)
Vue.component('loading-alert', LoadingAlert)
Vue.component('confirm-dialog', Confirm)

Vue.prototype.$analytics = firebase.analytics()

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
