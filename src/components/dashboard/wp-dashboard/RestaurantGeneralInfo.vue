<template>
    <q-card>
        <loading-alert :display="displayLoading"></loading-alert>
        <menudigital-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
        ></menudigital-alert>
        <q-card-section>
            <div class="text-subtitle1">
                Informacion General
            </div>
        </q-card-section>
        <q-card-section>
            <q-input
                type="number"
                label="Numero de Whatsapp"
                filled
                placeholder="65657898"
                class="q-mb-md"
                v-model="form.whatsappNumber"
                :rules="[val => val.length > 0 || 'Información Requerida']"
            />
            <q-select
                label="Mapa de preferencia"
                filled
                :options="['Google Maps', 'Waze']"
                class="q-mb-md"
                v-model="form.selectedMap"
                :rules="[val => val.length > 0 || 'Información Requerida']"
            />
            <q-select
                filled
                v-model="form.primaryColor"
                :options="options"
                label="Color primario"
                class="q-mb-md"
                :rules="[val => val != null || 'Información Requerida']"
            >
                <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                        <q-item-section avatar>
                            <q-icon name="palette" :color="scope.opt.value" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label v-html="scope.opt.label" />
                        </q-item-section>
                    </q-item>
                </template>
            </q-select>
            <q-select
                filled
                v-model="form.secondaryColor"
                :options="options"
                label="Color secundario"
                class="q-mb-md"
                :rules="[val => val != null || 'Información Requerida']"
            >
                <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                        <q-item-section avatar>
                            <q-icon name="palette" :color="scope.opt.value" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label v-html="scope.opt.label" />
                        </q-item-section>
                    </q-item>
                </template>
            </q-select>
            <q-select
                filled
                v-model="form.paymentMethods"
                multiple
                bottom-slots
                :options="paymentOptions"
                label="Metodos de pago"
                class="q-mb-md"
                :rules="[val => val.length > 0 || 'Información Requerida']"
            >
                <template v-slot:hint>
                    <span class="text-primary">Seleccion multiple</span>
                </template>
            </q-select>
            <!-- Por ahora se utilizará el logo original cuando se crea el restaurant -->
            <!-- <q-file filled label="Logo" bottom-slots v-model="logoUpload">
                <template v-slot:prepend>
                    <q-icon name="attach_file" />
                </template>
                <template v-slot:hint>
                    <span class="text-primary">1280px x 450px</span>
                </template>
            </q-file> -->
        </q-card-section>
        <q-card-actions>
            <q-space />
            <q-btn @click="updateRestaurantGeneralInfo" flat label="Editar" color="accent" />
        </q-card-actions>
    </q-card>
</template>

<script>
import * as api from '@/api/api'

import firebase from 'firebase/app'
import 'firebase/storage'

export default {
    data() {
        return {
            // logoUpload: null,
            form: {
                whatsappNumber: '',
                selectedMap: '',
                primaryColor: '',
                secondaryColor: '',
                paymentMethods: '',
            },
            options: [
                {
                    label: 'Rojo',
                    value: 'red',
                },
                {
                    label: 'Rosado',
                    value: 'pink',
                },
                {
                    label: 'Morado',
                    value: 'purple',
                },
                {
                    label: 'Morado profundo',
                    value: 'deep-purple',
                },
                {
                    label: 'Indigo',
                    value: 'indigo',
                },
                {
                    label: 'Azul',
                    value: 'blue',
                },
                {
                    label: 'Celeste',
                    value: 'light-blue',
                },
                {
                    label: 'Cian',
                    value: 'cyan',
                },
                {
                    label: 'Verde azulado',
                    value: 'teal',
                },
                {
                    label: 'Verde',
                    value: 'green',
                },
                {
                    label: 'Verde claro',
                    value: 'light-green',
                },
                {
                    label: 'Lima',
                    value: 'lime',
                },
                {
                    label: 'Amarillo',
                    value: 'yellow',
                },
                {
                    label: 'Ambar',
                    value: 'amber',
                },
                {
                    label: 'Naranja',
                    value: 'orange',
                },
                {
                    label: 'Naranja profundo',
                    value: 'deep-orange',
                },
                {
                    label: 'Chocolate',
                    value: 'brown',
                },
                {
                    label: 'Gris',
                    value: 'grey',
                },
                {
                    label: 'Gris azulado',
                    value: 'blue-grey',
                },
            ],
            paymentOptions: ['Efectivo', 'Transferencia', 'Tarjeta'],
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
        }
    },
    methods: {
        async updateRestaurantGeneralInfo() {
            this.displayLoading = true

            api.updateAdminRestaurantInfo({id: this.$route.params.restaurantId, Restaurant: this.form})
                .then(response => {
                        this.displayLoading = false
                        this.alertTitle = 'Exito!'
                        this.alertMessage =
                            'Se ha actualizado el restaurante con exito'
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
        }
    },
    mounted() {
        let db = firebase.firestore()
        db.collection('Restaurants').doc(this.$route.params.restaurantId).get().then(
           snapshot => {
               this.form = {
                   whatsappNumber: snapshot.data().whatsappNumber,
                   selectedMap: snapshot.data().selectedMap,
                   primaryColor: snapshot.data().primaryColor,
                   secondaryColor: snapshot.data().secondaryColor,
                   paymentMethods: snapshot.data().paymentMethods,
                }
           } 
        )
    },
}
</script>


