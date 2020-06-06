<template>
    <div>
        <div v-for="image in images" :key="image" class="q-pa-md">
            <img :src="image" alt="menu" />
        </div>
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
        }
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