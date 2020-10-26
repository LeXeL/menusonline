<template>
    <q-page class="q-pa-md">
        <div class="row q-px-md">
            <div class="text-h5 mo-grey">Panama Hotdog</div>
        </div>
        <div class="row">
            <div class="col-lg-3 q-pa-md">
                <q-card>
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
                        />
                        <q-select
                            label="Mapa de preferencia"
                            filled
                            :options="['Google Maps', 'Waze']"
                            class="q-mb-md"
                            v-model="selectedMap"
                        />
                        <q-select
                            filled
                            v-model="primaryColor"
                            :options="options"
                            label="Color primario"
                            class="q-mb-md"
                        >
                            <template v-slot:option="scope">
                                <q-item
                                    v-bind="scope.itemProps"
                                    v-on="scope.itemEvents"
                                >
                                    <q-item-section avatar>
                                        <q-icon
                                            name="palette"
                                            :color="scope.opt.value"
                                        />
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label
                                            v-html="scope.opt.label"
                                        />
                                    </q-item-section>
                                </q-item>
                            </template>
                        </q-select>
                        <q-select
                            filled
                            v-model="secondaryColor"
                            :options="options"
                            label="Color secundario"
                            class="q-mb-md"
                        >
                            <template v-slot:option="scope">
                                <q-item
                                    v-bind="scope.itemProps"
                                    v-on="scope.itemEvents"
                                >
                                    <q-item-section avatar>
                                        <q-icon
                                            name="palette"
                                            :color="scope.opt.value"
                                        />
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label
                                            v-html="scope.opt.label"
                                        />
                                    </q-item-section>
                                </q-item>
                            </template>
                        </q-select>
                        <q-select
                            filled
                            v-model="paymentMethods"
                            multiple
                            bottom-slots
                            :options="paymentOptions"
                            label="Metodos de pago"
                        >
                            <template v-slot:hint>
                                <span class="text-primary"
                                    >Seleccion multiple</span
                                >
                            </template>
                        </q-select>
                    </q-card-section>
                    <q-card-actions>
                        <q-space />
                        <q-btn flat label="Editar" color="accent" />
                    </q-card-actions>
                </q-card>
            </div>
            <div class="col-lg-6 q-pa-md">
                <q-card>
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
                                                props.row.required
                                                    ? 'white'
                                                    : 'black'
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
            </div>
            <div class="col-lg-3 q-pa-md">
                <iframe
                    class="shadow-8 q-mb-md"
                    src="/wp/panamahotdog"
                    style="overflow-y: hidden;"
                />
                <q-btn
                    label="Editar Menu"
                    color="accent"
                    class="full-width shadow-8"
                />
            </div>
        </div>
        <q-dialog v-model="inputFieldsDialog">
            <q-card style="width: 900px; max-width: 80vw;">
                <q-card-section>
                    <div class="text-h6">Agregar campo:</div>
                </q-card-section>
                <q-card-section>
                    <div class="row">
                        <div class="col-lg-6 q-px-md">
                            <q-input
                                label="Nombre"
                                filled
                                class="q-mb-md"
                                v-model="newInputFieldName"
                            />
                            <q-select
                                label="Tipo"
                                filled
                                class="q-mb-md"
                                v-model="newInputFieldType"
                                :options="[
                                    {label: 'Texto', value: 'text'},
                                    {label: 'Area de texto', value: 'textarea'},
                                    {label: 'Opcion multiple', value: 'radio'},
                                ]"
                                emit-value
                                map-options
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
                                v-if="newInputFieldType == 'radio'"
                                class="q-mb-md"
                                label="Opciones"
                                filled
                                use-input
                                use-chips
                                multiple
                                hide-dropdown-icon
                                input-debounce="0"
                                new-value-mode="add-unique"
                            />
                            <q-select
                                label="Requerido"
                                filled
                                class="q-mb-md"
                                :options="[
                                    {label: 'Obligatorio', value: true},
                                    {label: 'Opcional', value: false},
                                ]"
                                v-model="newImputfieldRequired"
                                emit-value
                                map-options
                            />
                        </div>
                        <div class="col-lg-6 q-pa-md bg-grey-9">
                            <div v-if="newInputFieldType == 'text'">
                                <div
                                    class="text-subtitle2 poppins-bold q-mb-sm text-white"
                                >
                                    {{ newInputFieldName }}:
                                    <span v-if="newImputfieldRequired">*</span>
                                </div>
                                <q-input
                                    :placeholder="newInputFieldPlaceholder"
                                    filled
                                    dark
                                    class="full-width poppins-regular"
                                />
                            </div>
                            <div v-if="newInputFieldType == 'textarea'">
                                <div
                                    class="text-subtitle2 poppins-bold q-mb-sm text-white"
                                >
                                    {{ newInputFieldName }}:
                                    <span v-if="newImputfieldRequired">*</span>
                                </div>
                                <q-input
                                    :placeholder="newInputFieldPlaceholder"
                                    filled
                                    dark
                                    type="textarea"
                                    rows="4"
                                    class="full-width poppins-regular"
                                />
                            </div>
                            <div v-if="newInputFieldType == 'radio'">
                                <div
                                    class="text-subtitle2 poppins-bold q-mb-sm text-white"
                                >
                                    {{ newInputFieldName }}:
                                    <span v-if="newImputfieldRequired">*</span>
                                </div>
                                <q-btn-toggle
                                    spread
                                    all-caps
                                    class="poppins-bold full-width"
                                    color="white"
                                    text-color="black"
                                    :options="newInputFieldRadioOpcions"
                                />
                            </div>
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
import InputText from '@/components/wp/InputText'
import TextArea from '@/components/wp/TextArea'
import ButtonGroup from '@/components/wp/ButtonGroup'

export default {
    data() {
        return {
            selectedMap: null,
            primaryColor: null,
            secondaryColor: null,
            paymentMethods: null,
            inputFieldsDialog: false,
            newInputFieldName: '',
            newInputFieldType: null,
            newInputFieldPlaceholder: '',
            newImputfieldRequired: '',
            newInputFieldRadioOpcions: ['test 1', 'test 2'],
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
        }
    },
    components: {
        InputText,
        TextArea,
        ButtonGroup,
    },
}
</script>

<style scoped>
iframe {
    border: solid 7px #2b2c31;
    border-radius: 20px;
    width: 100%;
    height: 720px;
}
</style>
