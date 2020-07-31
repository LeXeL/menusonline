<template>
    <div v-if="!loading">
        <div
            v-for="(image, index) in data[0].images"
            :key="index"
            class="q-pa-md"
            :style="{backgroundColor: data[0].restaurante.menuBackgroundColor}"
        >
            <img
                :src="image.url"
                alt="menu"
                style="width:100%"
                class="shadow-5"
            />
        </div>
        <footer>
            <div class="container">
                <div class="row text-center">
                    <div class="col">
                        <img
                            :src="require('@/assets/landing/logo_grey.png')"
                            width="150px;"
                            @click="$router.push('/')"
                        />

                        <p>
                            Powered By BlueBalloon Inc.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
        <q-dialog
            v-model="splash"
            persistent
            :maximized="true"
            transition-hide="slide-up"
            transition-show="slide-down"
        >
            <q-card
                class="text-white"
                :style="{
                    backgroundColor: data[0].restaurante.splashColor
                        ? data[0].restaurante.splashColor
                        : '#e9e9e9',
                }"
            >
                <q-card-section class="absolute-center">
                    <div class="row justify-center">
                        <div class="text-h5 q-mb-lg main-font">
                            ¡Bienvenido!
                        </div>
                        <q-img
                            :src="data[0].restaurante.logo"
                            class="q-mb-lg"
                        />
                        <q-btn
                            label="Ver Menu"
                            class="main-font"
                            :style="{
                                backgroundColor: data[0].restaurante
                                    .splashButtonColor
                                    ? data[0].restaurante.splashButtonColor
                                    : '#f56c12',
                            }"
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
            loading: true,
        }
    },
    methods: {
        closeSplash() {
            this.splash = false
            setTimeout(function() {
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
