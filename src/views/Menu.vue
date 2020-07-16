<template>
    <div>
        <div v-for="image in images" :key="image" class="q-pa-md" style="background-color: #f0f0f0">
            <img :src="image" alt="menu" style="width:100%" />
        </div>
        <q-dialog v-model="splash" persistent :maximized="true" transition-hide="slide-up">
            <q-card class="bg-primary text-white">
                <q-card-section class="absolute-center">
                    <div class="row justify-center">
                        <div class="text-h6 q-mb-lg">¡Bienvenido!</div>
                        <q-img :src="require('@/assets/logo.png')" class="q-mb-lg" />
                        <q-btn label="Ver Menu" color="warning" @click="closeSplash" />
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
export default {
    data() {
        return {
            src: '',
            images: [],
            splash: true,
        }
    },
    methods: {
        closeSplash() {
            this.splash = false
            setTimeout(function() {
                document.documentElement.requestFullscreen()
            }, 300)
        },
    },
    mounted() {
        let id = this.$route.params.id
        let db = firebase.firestore()
        let restRef = db
            .collection('Restaurantes')
            .doc(id)
            .get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!')
                } else {
                    this.images = doc.data().menus
                }
            })

            .catch(err => {
                console.log('Error getting documents', err)
            })
    },
}
</script>

<style scoped>
#menu {
    height: 100vh;
    border: 1rem solid rgba(0, 0, 0, 0.1);
}
body {
    background-color: grey;
}
</style>