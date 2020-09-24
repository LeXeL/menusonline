<template>
    <div>
        <div v-if="!loading">
            <div
                v-for="(image, index) in data[0].images"
                :key="index"
                class="q-pa-md"
                :style="`backgroundColor: ${decorations[restaurant].menuBackgroundColor}`"
            >
                <q-img
                    :src="image.url"
                    alt="menu"
                    style="width: 100%"
                    class="shadow-5"
                />
            </div>
            <footer>
                <div class="container">
                    <div class="row text-center">
                        <div class="col">
                            <q-img
                                :src="require('@/assets/landing/logo_grey.png')"
                                style="width: 150px"
                                @click="$router.push('/')"
                            />

                            <p>Powered By BlueBalloon Inc.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
        <q-dialog
            v-if="render"
            v-model="splash"
            persistent
            :maximized="true"
            transition-hide="slide-up"
            transition-show="slide-down"
        >
            <q-card
                class="text-white"
                :style="`backgroundColor: ${decorations[restaurant].splashColor}`"
            >
                <q-card-section class="absolute-center">
                    <div class="row justify-center">
                        <div
                            class="text-h5 q-mb-lg main-font"
                            :style="`color: ${decorations[restaurant].textColor}`"
                        >
                            ¡Bienvenido!
                        </div>
                        <q-img
                            :src="
                                require(`@/assets/restaurant-logos/${
                                    this.decorations[this.restaurant].logo
                                }`)
                            "
                            class="q-mb-lg"
                        />
                        <q-btn
                            label="Ver Menu"
                            class="main-font"
                            :style="`backgroundColor: ${decorations[restaurant].splashButtonColor}`"
                            v-if="!this.loading"
                            @click="closeSplash"
                        />
                        <q-spinner-facebook
                            v-if="loading"
                            :color="decorations[restaurant].spinerColor"
                            size="2em"
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
            render: false,
            restaurant: '',
            decorations: {
                angel: {
                    splashButtonColor: '#000000',
                    splashColor: '#ffffff',
                    logo: 'Angel.jpeg',
                    menuBackgroundColor: '#f7f7f7',
                    textColor: '#000000',
                    spinerColor: 'black',
                },
            },
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
        this.render = false
        let path = await this.$route.params.path
        this.restaurant = path
        this.render = true
        this.$analytics.logEvent('Menu Enter', {
            path: `${this.$route.params.path}`,
        })
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
