import Vue from 'vue'

import './styles/quasar.sass'
import iconSet from 'quasar/icon-set/fontawesome-v5.js'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import {Quasar} from 'quasar'
import {Notify} from 'quasar'

Vue.use(Quasar, {
    config: {},
    components: {},
    directives: {},
    plugins: {
        Notify,
    },
    iconSet: iconSet,
})
