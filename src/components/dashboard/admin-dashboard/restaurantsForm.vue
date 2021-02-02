<template>
    <q-form @submit="submitForm">
        <q-card class="q-mb-lg no-shadow mo-grey">
            <loading-alert :display="displayLoading"></loading-alert>
            <menudigital-alert
                :display="displayAlert"
                :title="alertTitle"
                :message="alertMessage"
                :type="alertType"
            ></menudigital-alert>
            <q-card-section>
                <div class="text-h6">Crear nuevo restaurante</div>
            </q-card-section>
            <q-card-section>
                <q-input
                    filled
                    class="q-mb-md"
                    label="Nombre"
                    v-model="form.restaurantName"
                    :rules="[val => val.length > 0 || 'Información Requerida']"
                />
                <q-input
                    filled
                    class="q-mb-md"
                    label="Correo"
                    v-model="form.email"
                    :rules="[
                        val => val.length > 0 || 'Información Requerida',
                        val => validEmail.test(val) || 'Formato incorrecto',
                    ]"
                />
                <q-input
                    filled
                    class="q-mb-md"
                    label="Numero"
                    v-model="form.phone"
                    mask="########"
                    :rules="[val => val.length > 0 || 'Información Requerida']"
                />
                <q-select
                    filled
                    class="q-mb-md"
                    label="Tipo"
                    :options="['Whatsapp Pedidos', 'Carta Digital']"
                    v-model="form.type"
                    :rules="[val => val.length > 0 || 'Información Requerida']"
                />
                <q-input
                    filled
                    class="q-mb-md"
                    label="/Path"
                    v-model="form.url"
                    :rules="[val => val.length > 0 || 'Información Requerida']"
                />
                <q-file
                    v-if="formStatusEdit"
                    filled
                    label="Actualizar Logo"
                    v-model="logoFile"
                >
                    <template v-slot:prepend>
                        <i class="fas fa-paperclip"></i>
                    </template>
                </q-file>
                <q-file
                    v-if="!formStatusEdit"
                    filled
                    label="Logo"
                    v-model="logoFile"
                    :rules="[val => !!val || 'Información Requerida']"
                >
                    <template v-slot:prepend>
                        <i class="fas fa-paperclip"></i>
                    </template>
                </q-file>
                <!-- <q-input filled class="q-mb-md" label="Splash color" v-model="form.splashColor">
                    <template v-slot:append>
                        <i class="fas fa-eye-dropper" style="cursor: pointer">
                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                                <q-color v-model="form.splashColor" />
                            </q-popup-proxy>
                        </i>
                    </template>
                </q-input> -->
                <!-- <q-input
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
                </q-input> -->
                <!-- <q-input
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
                </q-input> -->
            </q-card-section>
            <q-card-actions class="q-px-md">
                <q-space />
                <q-btn type="submit" color="accent" flat :label="formStatusEdit ? 'Actualizar' : 'Crear'" />
            </q-card-actions>
        </q-card>
    </q-form>
</template>

<script>
import * as api from '@/api/api'

import firebase from 'firebase/app'
import 'firebase/storage'

export default {
    props: {
        restaurantToForm: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            logoFile: null,
            form: {
                restaurantName: '',
                email: '',
                phone: '',
                type: '',
                url: '',
                logo: '',
                // splashColor: '',
                // splashButtonColor: '',
                // menuBackgroundColor: '',
            },
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            validEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            formStatusEdit: false,
            restID: '',
        }
    },
    methods: {
        clear() {
            this.form = {
                restaurantName: '',
                email: '',
                phone: '',
                url: '',
                logo: '',
                type: '',
                // splashColor: '',
                // splashButtonColor: '',
                // menuBackgroundColor: '',
            }

            this.logoFile = null
            this.formStatusEdit = false
            this.restID = ''
        },
        submitForm() {
            if (this.formStatusEdit) {
                this.updateRestaurant()
            } else {
                this.createNewRestaurant()
            }
        },
        async createNewRestaurant() {
            this.displayLoading = true
            let db = firebase.firestore()

            await this.uploadToFirebase(
                this.logoFile,
                `restaurants/${this.form.restaurantName}`,
                this.form.restaurantName
            ).then(async filename => {
                this.form.logo = filename
                api.createNewAdminRestaurant({Restaurant: this.form})
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
        async updateRestaurant() {
            this.displayLoading = true
            let db = firebase.firestore()

            if (this.logoFile != null) {
                await this.uploadToFirebase(
                    this.logoFile,
                    `restaurants/${this.form.restaurantName}`,
                    this.form.restaurantName
                ).then(async filename => {
                    this.form.logo = filename
                })
            }

            api.updateAdminRestaurantInfo({id: this.restID, Restaurant: this.form})
                .then(response => {
                        this.displayLoading = false
                        this.alertTitle = 'Exito!'
                        this.alertMessage =
                            'Se ha actualizado el restaurante con exito'
                        this.alertType = 'success'
                        this.displayAlert = true
                        this.clear()
                        this.$emit('restaurantUpdated')
                    })
                    .catch(error => {
                        console.log(error)
                        this.displayLoading = false
                        this.alertTitle = 'Error'
                        this.alertMessage = error
                        this.alertType = 'error'
                        this.displayAlert = true
                    })
        },
        uploadToFirebase(imageFile, fullDirectory, filename) {
            return new Promise(function (resolve, reject) {
                var storageRef = firebase
                    .storage()
                    .ref(fullDirectory + '/' + filename)
                //Upload file
                var task = storageRef.put(imageFile)
                //Update progress bar
                task.on(
                    'state_changed',
                    function (snapshot) {
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
                    function (error) {
                        // Handle unsuccessful uploads
                        console.log(`Error in uploadToFirebase: ${error}`)
                        reject(error)
                    },
                    function () {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        task.snapshot.ref
                            .getDownloadURL()
                            .then(function (downloadURL) {
                                console.log('File available at', downloadURL)
                                resolve(downloadURL)
                            })
                    }
                )
            })
        },
    },
    watch: {
        restaurantToForm(newValue, oldValue) {
            if (Object.keys(newValue).length > 0) {
                this.formStatusEdit = true
                this.restID = newValue.id
                this.form.restaurantName = newValue.restaurantName
                this.form.email = newValue.email
                this.form.phone = newValue.phone || "12345678" // Pepe: some test restaurants do not have phone number
                this.form.type = newValue.type
                this.form.url = newValue.url
                this.form.logo = newValue.logo // Pending: get logo file from firebase storage
            }
        }
    },
}
</script>

<style lang="scss" scoped></style>
