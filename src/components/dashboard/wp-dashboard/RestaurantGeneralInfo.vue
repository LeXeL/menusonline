<template>
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
                v-model="secondaryColor"
                :options="options"
                label="Color secundario"
                class="q-mb-md"
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
                v-model="paymentMethods"
                multiple
                bottom-slots
                :options="paymentOptions"
                label="Metodos de pago"
                class="q-mb-md"
            >
                <template v-slot:hint>
                    <span class="text-primary">Seleccion multiple</span>
                </template>
            </q-select>
            <q-file filled label="Logo" bottom-slots v-model="logoUpload">
                <template v-slot:prepend>
                    <q-icon name="attach_file" />
                </template>
                <template v-slot:hint>
                    <span class="text-primary">1280px x 450px</span>
                </template>
            </q-file>
        </q-card-section>
        <q-card-actions>
            <q-space />
            <q-btn flat label="Editar" color="accent" />
        </q-card-actions>
    </q-card>
</template>

<script>
export default {
    data() {
        return {
            selectedMap: null,
            primaryColor: null,
            secondaryColor: null,
            paymentMethods: null,
            logoUpload: null,
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
        }
    },
}
</script>
