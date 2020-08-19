<template>
    <q-page class="q-pa-md">
        <loading-alert :display="displayLoading"></loading-alert>
        <brewthers-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
        ></brewthers-alert>
        <confirm-dialog
            :display="displayConfirm"
            :title="alertTitle"
            :message="alertMessage"
            @accept="deleteBrewery"
        ></confirm-dialog>
        <div class="row q-px-md">
            <div class="text-h5 mo-grey">Nombre del restaurante</div>
        </div>
        <div class="row">
            <div class="col-lg-8 q-pa-md">
                <q-card class="no-shadow">
                    <q-card-section>
                        <div class="text-h6 mo-grey">Mis Menus</div>
                    </q-card-section>
                    <menusTable
                        :data="data"
                        @delete="askForDeleteBrewery"
                        @changeActive="changeActiveStatus"
                    ></menusTable>
                </q-card>
            </div>
            <div class="col-lg-4 q-pa-md">
                <q-card class="q-mb-lg no-shadow mo-grey">
                    <q-card-section>
                        <div class="text-h6">Crear nuevo menu</div>
                    </q-card-section>
                    <q-card-section>
                        <q-input
                            filled
                            v-model="name"
                            label="Nombre del menu *"
                            lazy-rules
                            :rules="[
                                val =>
                                    (val && val.length > 0) ||
                                    'Porfavor ingresa un nombre.',
                            ]"
                        />
                        <q-btn color="secondary" class="q-mt-sm" @click="createMenu">Crear</q-btn>
                    </q-card-section>
                </q-card>
                <q-card class="no-shadow mo-grey">
                    <q-card-section>
                        <div class="text-h6">Ver mi codigo QR</div>
                    </q-card-section>
                    <q-card-section>
                        <q-btn color="warning" @click="CreateQrCode()">Ver QR</q-btn>
                    </q-card-section>
                </q-card>
            </div>
        </div>
        <q-dialog v-model="alert">
            <q-card>
                <q-card-section>
                    <div ref="qrcode"></div>
                    <!-- <q-img
                        src="https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market_full/generator/dist/generator/assets/images/websiteQRCode_noFrame.png"
                        style="width: 350px"
                    />-->
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Descargar" color="primary" v-close-popup />
                    <q-btn flat label="Cerrar" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
import * as api from '@/api/api'
import * as QRCode from 'easyqrcodejs'
import firebase from 'firebase/app'
import 'firebase/firestore'
import menusTable from '@/components/menusTable'

export default {
    data() {
        return {
            left: false,
            alert: false,
            restaurantId: '',
            name: '',
            data: [],
            displayLoading: false,
            displayAlert: false,
            displayConfirm: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            workingDeletedId: '',
            restaurantInfo: [],
        }
    },
    methods: {
        CreateQrCode(id, logo) {
            this.alert = true
            let options = {
                text: `https://mimenudigital.app/${this.restaurantInfo.url}`,
                width: 256,
                height: 256,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.L, // L, M, Q, H
                dotScale: 1, // Must be greater than 0, less than or equal to 1. default is 1
            }

            this.qrAlert = true
            setTimeout(() => {
                new QRCode(this.$refs.qrcode, options)
            }, 500)
        },
        changeActiveStatus(event) {
            this.data.forEach(element => {
                if (element.status === 'active') {
                    element.status = 'inactive'
                    api.updateMenusInformation({id: element.id, Menus: element})
                }
                if (element.id === event.id) {
                    element.status = 'active'
                    api.updateMenusInformation({
                        id: element.id,
                        Menus: element,
                    }).then(() => {
                        api.updateRestaurantesInformation({
                            id: element.restaurant,
                            Restaurantes: {activeMenu: element.id},
                        })
                    })
                }
            })
        },
        clear() {
            this.name = ''
        },
        createMenu() {
            this.displayLoading = true
            api.createMenusOnDatabase({
                Menu: this.name,
                restaurant: this.restaurantId,
            }).then(() => {
                api.addMenuToRestaurantes({
                    uid: this.restaurantId,
                    menu: this.name,
                })
                    .then(response => {
                        this.displayLoading = false
                        this.alertTitle = 'Exito!'
                        this.alertMessage = 'Se ha creado el menu con exito'
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
        addToData(id, data) {
            data.id = id
            this.data.push(data)
        },
        editData(id, data) {
            data.id = id
            this.data.forEach((d, index) => {
                if (d.id === id) {
                    this.data.splice(index, 1, data)
                }
            })
        },
        removeData(id) {
            this.data.forEach((d, index) => {
                if (d.id === id) {
                    this.data.splice(index, 1)
                }
            })
        },
        askForDeleteBrewery(event) {
            this.displayConfirm = true
            this.alertTitle = 'Esta seguro?'
            this.alertMessage =
                'Se va a proceder a eliminar esta casa cervecera'
            this.workingDeletedId = event.id
        },
        deleteBrewery() {
            this.displayLoading = true
            this.displayAlert = false
            this.displayConfirm = false
            api.deleteMenusInformation({
                id: this.workingDeletedId,
            })
                .then(() => {
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage = 'Se ha cambiado el estado con exito'
                    this.alertType = 'success'
                    this.displayAlert = true
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
    },
    async mounted() {
        this.restaurantId = this.$route.params.id
        let db = firebase.firestore()
        db.collection('Menus')
            .where('restaurant', '==', this.restaurantId)
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        this.addToData(change.doc.id, change.doc.data())
                    }
                    if (change.type === 'modified') {
                        this.editData(change.doc.id, change.doc.data())
                    }
                    if (change.type === 'removed') {
                        this.removeData(change.doc.id)
                    }
                })
            })
        await api
            .returnRestaurantById({id: this.restaurantId})
            .then(response => {
                this.restaurantInfo = response.data.data
            })
    },
    components: {
        menusTable,
    },
}
</script>
