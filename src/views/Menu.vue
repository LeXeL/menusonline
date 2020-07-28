<template>
    <div v-if="!loading">
        <div
            v-for="image in data[0].images"
            :key="image"
            class="q-pa-md"
            :style="{ backgroundColor: data[0].restaurante.menuBackgroundColor }"
        >
            <img :src="image.url" alt="menu" style="width:100%" class="shadow-5" />
        </div>
        <div :style="{ backgroundColor: data[0].restaurante.splashColor }">
            <p class="text-center q-mb-none q-py-sm" style="font-size: 9px;">
                Servicio por
                <a
                    href="#"
                    :style="{ color: data[0].restaurante.splashColor, textDecoration: 'none' }"
                >BlueBalloon Inc.</a>
            </p>
        </div>
        <q-dialog
            v-model="splash"
            persistent
            :maximized="true"
            transition-hide="slide-up"
            transition-show="slide-down"
        >
            <q-card
                class="text-white"
                :style="{ backgroundColor: data[0].restaurante.splashColor }"
            >
                <q-card-section class="absolute-center">
                    <div class="row justify-center">
                        <div class="text-h5 q-mb-lg main-font">¡Bienvenido!</div>
                        <q-img :src="require('@/assets/veranda.png')" class="q-mb-lg" />
                        <q-btn
                            label="Ver Menu"
                            class="main-font"
                            :style="{ backgroundColor: data[0].restaurante.splashButtonColor }"
                            @click="closeSplash"
                        />
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import * as api from '@/api/api'
export default {
    data() {
        return {
            src: '',
            splash: true,
            data: '',
            splashBgColor: '#09425f',
            ctaBgColor: '#c89c6b',
            menuBgColor: '#fff',
            loading: false,
        }
    },
    methods: {
        closeSplash() {
            this.splash = false
            setTimeout(function () {
                // document.documentElement.requestFullscreen()
            }, 300)
        },
    },
    async mounted() {
        let path = this.$route.params.path
        this.loading = true
        api.returRestaurantActiveMenu({path: path})
            .then(response => {
                this.data = response.data.data
            })
            .then(() => {
                this.loading = false
            })
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

#menu {
    height: 100vh;
    border: 1rem solid rgba(0, 0, 0, 0.1);
}

.main-font {
    font-family: 'Anton', sans-serif;
    letter-spacing: 1.5px;
}
</style>