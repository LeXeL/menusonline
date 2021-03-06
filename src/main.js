import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store.js'
import './quasar'

import firebase from 'firebase/app'

import 'firebase/analytics'

import LoadingAlert from '@/components/general/LoadingAlert'
import ManuDigitalAlert from '@/components/general/Alert'
import Confirm from '@/components/general/Confirm'
import VueSmoothScroll from 'vue2-smooth-scroll'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueMeta from 'vue-meta'
import Hotjar from 'vue-hotjar'

import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init()

Vue.use(VueMeta, {
    // optional pluginOptions
    refreshOnceOnNavigation: true,
})
Vue.use(VueSmoothScroll)
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyBQ9QbePVZeAjzIlUSyaT7fMUJZNLMFtwA',
        libraries: 'places', // necessary for places input
    },
})
if (process.env.NODE_ENV == 'production') {
    var isProduction = true
} else {
    var isProduction = false
}
Vue.use(Hotjar, {
    id: '1989589', // Hotjar Site ID
    isProduction: isProduction,
})

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

Vue.component('menudigital-alert', ManuDigitalAlert)
Vue.component('loading-alert', LoadingAlert)
Vue.component('confirm-dialog', Confirm)

Vue.prototype.$analytics = firebase.analytics()

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
