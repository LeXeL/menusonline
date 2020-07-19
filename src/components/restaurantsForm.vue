<template>
    <q-card class="q-mb-lg no-shadow mo-grey">
        <loading-alert :display="displayLoading"></loading-alert>
        <brewthers-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
        ></brewthers-alert>
        <q-card-section>
            <div class="text-h6">Crear nuevo restaurante</div>
        </q-card-section>
        <q-card-section>
            <q-input filled class="q-mb-md" label="Nombre" v-model="form.name" />
            <q-input filled class="q-mb-md" label="Correo" v-model="form.email" />
            <q-input filled class="q-mb-md" label="Numero" v-model="form.phone" />
            <q-input filled class="q-mb-md" label="/Path" v-model="form.url" />
            <q-file filled class="q-mb-md" label="Logo" v-model="logoFile">
                <template v-slot:prepend>
                    <i class="fas fa-paperclip"></i>
                </template>
            </q-file>
            <q-input filled class="q-mb-md" label="Splash color" v-model="form.splashColor">
                <template v-slot:append>
                    <i class="fas fa-eye-dropper" style="cursor: pointer">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                            <q-color v-model="form.splashColor" />
                        </q-popup-proxy>
                    </i>
                </template>
            </q-input>
            <q-input
                filled
                class="q-mb-md"
                label="Splash button color"
                v-model="form.splashButtonColor"
            >
                <template v-slot:append>
                    <i class="fas fa-eye-dropper" style="cursor: pointer">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                            <q-color v-model="form.splashButtonColor" />
                        </q-popup-proxy>
                    </i>
                </template>
            </q-input>
            <q-input
                filled
                class="q-mb-md"
                label="Menu Background color"
                v-model="form.menuBackgroundColor"
            >
                <template v-slot:append>
                    <i class="fas fa-eye-dropper" style="cursor: pointer">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                            <q-color v-model="form.menuBackgroundColor" />
                        </q-popup-proxy>
                    </i>
                </template>
            </q-input>
            <q-btn color="secondary" class="q-mt-sm" @click="Generate">Crear</q-btn>
        </q-card-section>
    </q-card>
</template>

<script>
import * as api from '@/api/api'

import firebase from 'firebase/app'
import 'firebase/storage'
export default {
    data() {
        return {
            logoFile: null,
            form: {
                name: '',
                email: '',
                phone: '',
                url: '',
                logo: '',
                splashColor: '',
                splashButtonColor: '',
                menuBackgroundColor: '',
            },
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
        }
    },
    methods: {
        clear() {
            this.form = {
                name: '',
                email: '',
                phone: '',
                url: '',
                logo: '',
                splashColor: '',
                splashButtonColor: '',
                menuBackgroundColor: '',
            }

            this.logoFile = null
        },
        async Generate() {
            this.displayLoading = true
            let db = firebase.firestore()
            await this.uploadToFirebase(
                this.logoFile,
                `menus/${this.form.name}`,
                this.form.name
            ).then(async filename => {
                this.form.logo = filename
                api.createRestaurantesOnDatabase({Restaurantes: this.form})
                    .then(response => {
                        this.displayLoading = false
                        this.alertTitle = 'Exito!'
                        this.alertMessage =
                            'Se ha creado el restaurante con exito'
                        this.alertType = 'success'
                        this.displayAlert = true
                        this.clear()
                    })
                    .catch(error => {
                        console.log(error)
                        this.displayLoading = false
                        this.alertTitle = 'Error'
                        this.alertMessage = error
                        this.alertType = 'error'
                        this.displayAlert = true
                    })
            })
        },
        uploadToFirebase(imageFile, fullDirectory, filename) {
            return new Promise(function(resolve, reject) {
                var storageRef = firebase
                    .storage()
                    .ref(fullDirectory + '/' + filename)
                //Upload file
                var task = storageRef.put(imageFile)
                //Update progress bar
                task.on(
                    'state_changed',
                    function(snapshot) {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        var progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100
                        console.log('Upload is ' + progress + '% done')
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED: // or 'paused'
                                console.log('Upload is paused')
                                break
                        }
                    },
                    function(error) {
                        // Handle unsuccessful uploads
                        console.log(`Error in uploadToFirebase: ${error}`)
                        reject(error)
                    },
                    function() {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        task.snapshot.ref
                            .getDownloadURL()
                            .then(function(downloadURL) {
                                console.log('File available at', downloadURL)
                                resolve(downloadURL)
                            })
                    }
                )
            })
        },
    },
}
</script>

<style lang="scss" scoped>
</style>