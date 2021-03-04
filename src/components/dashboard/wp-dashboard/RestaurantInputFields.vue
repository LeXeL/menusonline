<template>
    <div>
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
                    Campos de pedidos
                </div>
            </q-card-section>
            <q-card-section>
                <q-table :data="data" :columns="columns" row-key="name">
                    <template v-slot:body="props">
                        <q-tr :props="props">
                            <q-td key="name" :props="props">{{
                                props.row.name
                            }}</q-td>
                            <q-td key="type" :props="props">{{
                                props.row.type
                            }}</q-td>
                            <q-td key="required" :props="props">
                                <q-chip
                                    icon="check"
                                    size="sm"
                                    :color="
                                        props.row.required
                                            ? 'accent'
                                            : 'default'
                                    "
                                    :text-color="
                                        props.row.required ? 'white' : 'black'
                                    "
                                />
                            </q-td>
                            <q-td>
                                <q-btn-group>
                                    <q-btn
                                        color="accent"
                                        icon="edit"
                                        size="sm"
                                        flat
                                    />
                                    <q-btn
                                        color="red-7"
                                        icon="delete"
                                        size="sm"
                                        flat
                                    />
                                </q-btn-group>
                            </q-td>
                        </q-tr>
                    </template>
                </q-table>
            </q-card-section>
            <q-card-actions>
                <q-space />
                <q-btn
                    label="Agregar"
                    flat
                    color="accent"
                    @click="inputFieldsDialog = true"
                />
            </q-card-actions>
        </q-card>
        <q-dialog v-model="inputFieldsDialog" persistent>
            <q-card style="width: 900px; max-width: 80vw;">
                <q-card-section>
                    <div class="text-h6">Agregar campo:</div>
                </q-card-section>
                <q-card-section>
                    <div class="row">
                        <div class="col-lg-6 q-px-md">
                            <q-select
                                label="Tipo"
                                filled
                                class="q-mb-md"
                                v-model="newInputFieldType"
                                :options="newInputFieldTypeOptions"
                                emit-value
                                map-options
                            />
                            <q-input
                                label="Nombre"
                                filled
                                class="q-mb-md"
                                v-model="newInputFieldName"
                            />
                            <q-input
                                label="Ejemplo"
                                filled
                                class="q-mb-md"
                                v-model="newInputFieldPlaceholder"
                                v-if="
                                    newInputFieldType == 'text' ||
                                        newInputFieldType == 'textarea'
                                "
                            />
                            <q-select
                                v-if="newInputFieldType == 'btngroup'"
                                class="q-mb-md"
                                label="Opciones"
                                filled
                                use-input
                                use-chips
                                multiple
                                hide-dropdown-icon
                                input-debounce="0"
                                v-model="newInputFieldRadioOptions"
                                new-value-mode="add-unique"
                                bottom-slots
                            >
                                <template v-slot:hint>
                                    <span class="text-primary"
                                        >Presiona enter para agregar.</span
                                    >
                                </template>
                            </q-select>
                            <q-select
                                label="Requerido"
                                filled
                                class="q-mb-md"
                                :options="[
                                    {label: 'Obligatorio', value: true},
                                    {label: 'Opcional', value: false},
                                ]"
                                emit-value
                                map-options
                                v-model="newInputFieldRequired"
                            />
                        </div>
                        <div class="col-lg-6 q-pa-md bg-grey-9 rounded-borders">
                            <div class="text-h6 q-mb-xl text-white">
                                Visualizacion previa:
                            </div>
                            <div
                                class="text-subtitle2 poppins-bold q-mb-sm text-white"
                            >
                                {{ newInputFieldName }}:
                                <span v-if="newInputFieldRequired">*</span>
                            </div>
                            <div v-if="newInputFieldType == 'text'">
                                <q-input
                                    :placeholder="newInputFieldPlaceholder"
                                    filled
                                    dark
                                    class="full-width poppins-regular"
                                />
                            </div>
                            <div v-if="newInputFieldType == 'textarea'">
                                <q-input
                                    :placeholder="newInputFieldPlaceholder"
                                    filled
                                    dark
                                    type="textarea"
                                    rows="4"
                                    class="full-width poppins-regular"
                                />
                            </div>
                            <div v-if="newInputFieldType == 'btngroup'">
                                <q-btn-toggle
                                    spread
                                    all-caps
                                    class="poppins-bold full-width"
                                    color="white"
                                    text-color="black"
                                    :options="returnRadioOptions()"
                                    v-model="newInputRadioOptions"
                                />
                            </div>
                        </div>
                    </div>
                </q-card-section>
                <q-separator />
                <q-card-actions>
                    <q-space />
                    <q-btn
                        label="Cancelar"
                        color="red-7"
                        flat
                        @click="cleanInputDialog()"
                    />
                    <q-btn 
                        label="Crear" 
                        color="accent" 
                        flat
                        @click="addInputField()" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import * as api from '@/api/api'

import firebase from 'firebase/app'
import 'firebase/storage'

export default {
    data() {
        return {
            newInputFieldName: '',
            newInputFieldType: null,
            newInputFieldPlaceholder: '',
            newInputFieldRequired: '',
            newInputFieldRadioOptions: [],
            inputFieldsDialog: false,
            newInputRadioOptions: [],
            newInputFieldTypeOptions: [
                {
                    label: 'Texto',
                    value: 'text',
                },
                {
                    label: 'Texto multilinea',
                    value: 'textarea',
                },
                {
                    label: 'Opcion multiple',
                    value: 'btngroup',
                },
            ],
            columns: [
                {
                    name: 'name',
                    label: 'Nombre',
                    field: 'name',
                    align: 'left',
                },
                {
                    name: 'type',
                    label: 'Tipo',
                    field: 'type',
                    align: 'left',
                },
                {
                    name: 'required',
                    label: 'Requerido',
                    align: 'left',
                },
                {
                    name: 'actions',
                    label: 'Acciones',
                    align: 'left',
                },
            ],
            data: [
                {
                    name: 'Nombre',
                    type: 'Texto',
                    required: true,
                },
                {
                    name: 'Comentarios especiales',
                    type: 'Area de texto',
                    required: false,
                },
                {
                    name: 'Fecha de entrega',
                    type: 'Opcion multiple',
                    required: true,
                },
            ],
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
        }
    },
    methods: {
        returnRadioOptions() {
            let options = []
            this.newInputFieldRadioOptions.forEach(op => {
                options.push({
                    label: op,
                    value: op,
                })
            })
            return options
        },
        cleanInputDialog() {
            ;(this.newInputFieldType = null), (this.inputFieldsDialog = false)
        },
        async addInputField() {
            this.displayLoading = true
            let db = firebase.firestore()
            let field = {
                    newInputFieldType: this.newInputFieldType,
                    newInputFieldName: this.newInputFieldName,
                    newInputFieldRadioOptions: this.newInputFieldRadioOptions,
                    newInputFieldRequired: this.newInputFieldRequired,
                    newInputFieldPlaceholder: this.newInputFieldPlaceholder,
                }
            let id = this.$route.params.restaurantId
            
            return db.collection('Restaurants').doc(id).update({
                inputFields: firebase.firestore.FieldValue.arrayUnion(field)
                })
                .then(() => {
                    this.displayLoading = false
                        this.alertTitle = 'Exito!'
                        this.alertMessage =
                            'Se ha actualizado el restaurante con exito'
                        this.alertType = 'success'
                        this.displayAlert = true
                        this.cleanInputDialog()
                    })
                .catch(error => {
                    console.log(error)
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage = error
                    this.alertType = 'error'
                    this.displayAlert = true
                    this.cleanInputDialog()
                })
        },
    },
    watch: {
        newInputFieldType: function() {
            this.newInputFieldName = ''
            this.newInputFieldPlaceholder = ''
            this.newInputFieldRadioOptions = []
            this.newInputFieldRequired = null
        },
    },
}
</script>
