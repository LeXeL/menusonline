<template>
    <q-page class="q-pa-md">
        <loading-alert :display="displayLoading"></loading-alert>
        <menudigital-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
        ></menudigital-alert>
        <div class="row q-px-md">
            <div class="text-h5 mo-grey">Administrador de restaurantes</div>
        </div>
        <div class="row">
            <div class="col-lg-2 q-pa-md">
                <q-input filled label="Nombre" v-model="filterName" />
            </div>
            <div class="col-lg-2 q-pa-md">
                <q-input filled label="Email" v-model="filterEmail" />
            </div>
            <div class="col-lg-2 q-pa-md">
                <q-select
                    label="Tipo"
                    filled
                    :options="['Todas', 'Whatsapp Pedidos', 'Carta Digital']"
                    v-model="filterType"
                />
            </div>
        </div>
        <div class="row">
            <div class="col-lg-8 q-pa-md">
                <q-card class="no-shadow">
                    <q-card-section>
                        <div class="text-h6 mo-grey">Mis Menus</div>
                    </q-card-section>
                    <restaurantsTable
                        :data="filteredData"
                        @showQrCode="CreateQrCode"
                        @activeToggle="toggleActiveStatus"
                    ></restaurantsTable>
                </q-card>
            </div>
            <div class="col-lg-4 q-pa-md">
                <restaurantsForm></restaurantsForm>
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
                    <q-btn
                        flat
                        label="Descargar"
                        color="primary"
                        v-close-popup
                    />
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
import restaurantsTable from '@/components/dashboard/admin-dashboard/restaurantsTable'
import restaurantsForm from '@/components/dashboard/admin-dashboard/restaurantsForm'

export default {
    computed: {
        user() {
            return this.$store.getters.user
        },
    },
    data() {
        return {
            left: false,
            alert: false,
            data: [],

            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            filterName: '',
            filterEmail: '',
            filterType: 'Todas',
        }
    },
    methods: {
        toggleActiveStatus(event) {
            this.displayLoading = true
            api.updateAdminRestaurantInfo({
                Restaurant: {active: event.active},
                id: event.id,
            })
                .then(response => {
                    this.displayLoading = false
                    this.alertType = 'success'
                    this.alertTitle = 'Éxito!'
                    this.alertMessage = 'Se ha actualizado el estado con éxito'
                    this.displayAlert = true
                })
                .catch(error => {
                    this.displayLoading = false
                    console.log(error)
                })
        },
        CreateQrCode(rest) {
            let options = {
                text: `https://mimenudigital.app/${rest.url}`,
                width: 256,
                height: 256,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.L, // L, M, Q, H
                dotScale: 1, // Must be greater than 0, less than or equal to 1. default is 1
            }
            setTimeout(() => {
                new QRCode(this.$refs.qrcode, options)
            }, 500)
            this.alert = true
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
        // For potential future use
        // removeData(id) {
        //     this.data.forEach((d, index) => {
        //         if (d.id === id) {
        //             this.data.splice(index, 1)
        //         }
        //     })
        // },
    },
    computed: {
        filteredData() {
            if (this.filterType === 'Todas') {
                return this.data
            }
            return this.data.filter(
                rest =>
                    rest.restaurantName
                        .toLowerCase()
                        .includes(this.filterName.toLowerCase()) &&
                    rest.email
                        .toLowerCase()
                        .includes(this.filterEmail.toLowerCase()) &&
                    rest.type.includes(this.filterType)
            )
        },
    },
    mounted() {
        let db = firebase.firestore()
        db.collection('Restaurants').onSnapshot(snapshot => {
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
    },
    components: {
        restaurantsTable,
        restaurantsForm,
    },
}
</script>
