import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './quasar'

import firebase from 'firebase/app'
import 'firebase/analytics'

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

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
