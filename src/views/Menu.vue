<template>
    <div id="menu"></div>
</template>

<script>
import PDFObject from 'pdfobject'
import firebase from 'firebase/app'
import 'firebase/firestore'
export default {
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
                    PDFObject.embed(doc.data().menuUrl, '#menu')
                }
            })

            .catch(err => {
                console.log('Error getting documents', err)
            })
    },
}
</script>

<style scoped>
.pdfobject-container {
    height: 100vh;
    border: 1rem solid rgba(0, 0, 0, 0.1);
}
</style>