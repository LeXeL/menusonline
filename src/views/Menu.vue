<template>
    <div id="menu">
        <pdf
            src="'https://firebasestorage.googleapis.com/v0/b/menusonline-f988f.appspot.com/o/menus%2F%5Bobject%20File%5D?alt=media&token=6209aa6d-c658-499a-95ed-cf141bdc698e'"
            @error="log()"
        ></pdf>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
export default {
    components: {
        pdf,
    },
    data() {
        return {
            src: '',
            pdf: undefined,
            pages: [],
        }
    },
    methods: {
        log(something) {
            console.log(something)
        },
    },
    created() {
        this.fetchPDF()
    },

    mounted() {
        let id = this.$route.params.id
        let db = firebase.firestore()
        let restRef = db.collection('Restaurantes').doc(id)
        let menuUrl = ''
        let allCities = restRef
            .get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!')
                } else {
                    console.log(doc.data().menuUrl)
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
</style>