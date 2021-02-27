<template>
    <q-page class="q-pa-md">
        <div class="row q-px-md q-mb-md">
            <div class="text-h5 mo-grey">Menu Builder</div>
        </div>
        <div class="row">
            <div class="col-lg-4 q-pa-md">
                <q-card>
                    <q-card-section>
                        <div class="text-h6">Informacion General</div>
                    </q-card-section>
                    <q-card-section>
                        <q-input
                            label="Folder"
                            filled
                            class="q-mb-md"
                            v-model="generalData.folder"
                        />
                        <q-select
                            label="Color primario"
                            filled
                            class="q-mb-md"
                            :options="colorOptions"
                            v-model="generalData.accentColor"
                            map-options
                            emit-value
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
                            label="Color secundario"
                            filled
                            class="q-mb-md"
                            :options="colorOptions"
                            v-model="generalData.subtitleColor"
                            map-options
                            emit-value
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
                        <q-input
                            label="No. Whatsapp"
                            filled
                            class="q-mb-md"
                            mask="########"
                            v-model="generalData.whatsappNumber"
                        />
                        <q-select
                            label="Mapa de preferencia"
                            filled
                            class="q-mb-md"
                            :options="[
                                {label: 'Google Maps', value: 'google_maps'},
                                {label: 'Waze', value: 'waze'},
                            ]"
                            map-options
                            emit-value
                            v-model="selectedMap"
                        />
                        <q-input
                            label="Google Sheets URL"
                            filled
                            class="q-mb-md"
                            v-model="generalData.googleSheets.url"
                        />
                        <q-input
                            label="Emails for EmailJS"
                            filled
                            class="q-mb-md"
                            v-model="generalData.emailJs.emails"
                        />
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                        <div class="text-h6">Default Location</div>
                    </q-card-section>
                    <q-card-section>
                        <q-input
                            filled
                            class="q-mb-md"
                            label="Default Lat"
                            v-model="cartSettings.locationDefaults.defaultLat"
                        />
                        <q-input
                            filled
                            label="Default Lng"
                            v-model="cartSettings.locationDefaults.defaultLng"
                        />
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-lg-4 q-pa-md">
                <q-card>
                    <q-separator />
                    <q-card-section>
                        <div class="text-h6">Cart inputs</div>
                    </q-card-section>
                    <q-card-section
                        v-for="(input, i) in cartSettings.inputData"
                        :key="i"
                        :class="i % 2 != 0 ? 'bg-grey-3' : 'bg-white'"
                    >
                        <q-input
                            label="Label"
                            filled
                            class="q-mb-md"
                            v-model="cartSettings.inputData[i].label"
                        />
                        <q-input
                            label="Placeholder"
                            filled
                            class="q-mb-md"
                            v-model="cartSettings.inputData[i].placeholder"
                        />
                        <q-select
                            label="Required"
                            :options="[
                                {label: 'True', value: true},
                                {label: 'False', value: false},
                            ]"
                            emit-value
                            map-options
                            filled
                            class="q-mb-md"
                            v-model="cartSettings.inputData[i].required"
                        />
                        <q-select
                            label="Tipo"
                            :options="['text', 'textarea', 'radio']"
                            filled
                            class="q-mb-md"
                            v-model="cartSettings.inputData[i].type"
                        />
                        <q-input
                            label="Opciones"
                            filled
                            v-if="input.type == 'radio'"
                            v-model="cartSettings.inputData[i].options"
                        />
                    </q-card-section>
                    <q-card-actions>
                        <q-space />
                        <q-btn flat round icon="add" @click="addCartInput()" />
                    </q-card-actions>
                </q-card>
            </div>
        </div>
        <div class="row">
            <div class="col q-pa-md">
                <q-card>
                    <q-card-section>
                        <div class="text-h6">JSON EXPORT</div>
                    </q-card-section>
                    <q-card-section>
                        &lt;template&gt; &lt;MainLayout
                        :generalData="generalData" :cartSettings="carSettings"
                        :menu="menu" /&gt; &lt;/template&gt; &lt;script&gt;
                        import MainLayout from '@/components/wp/MainLayout'
                        <br /><br />
                        export default { data() { return { generalData: {
                        folder: '{{ generalData.folder }}', accentColor: '{{
                            generalData.accentColor
                        }}', subtitleColor: '{{ generalData.subtitleColor }}',
                        categories: [], whatsappNumber: '{{
                            generalData.whatsappNumber
                        }}', wazeIntegration: {{ returnSelectedMapValue }},
                        googleSheets: { integration:
                        {{ generalData.googleSheets.url ? true : false }}, url:
                        '{{ generalData.googleSheets.url }}'}, emailJs: {
                        integration:
                        {{
                            generalData.emailJs.emails.length > 0
                                ? true
                                : false
                        }}, emails: {{ returnEmailsinArray }} } }, cartSettings:
                        { locationDefaults: { defaultLat:
                        {{
                            parseFloat(
                                cartSettings.locationDefaults.defaultLat
                            )
                        }}, defaultLng:
                        {{
                            parseFloat(cartSettings.locationDefaults.defaultLng)
                        }}
                        }, inputData: [
                        <span
                            v-for="(input, i) in cartSettings.inputData"
                            :key="i"
                        >
                            {type: '{{ input.type }}', label: '{{
                                input.label
                            }}', required: {{ input.required }}, placeholder:
                            '{{ input.placeholder }}',
                            <span v-if="input.options.length > 0">
                                <span
                                    >options:
                                    {{
                                        returnFormatedOptions(input.options)
                                    }}</span
                                > </span
                            >},
                        </span>
                        ] } } }, components: { MainLayout } } &lt;/script&gt;
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<script>
export default {
    data() {
        return {
            selectedMap: '',
            //
            generalData: {
                folder: '',
                accentColor: '',
                subtitleColor: '',
                categories: [],
                whatsappNumber: '',
                wazeIntegration: '',
                googleSheets: {
                    integration: true,
                    url: '',
                },
                emailJs: {
                    integration: false,
                    emails: '',
                },
            },
            cartSettings: {
                locationDefaults: {
                    defaultLat: '',
                    defaultLng: '',
                },
                inputData: [
                    {
                        type: '',
                        label: '',
                        required: '',
                        placeholder: '',
                        options: '',
                    },
                ],
            },
            //
            colorOptions: [
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
        }
    },
    methods: {
        addCartInput() {
            this.cartSettings.inputData.push({
                type: '',
                label: '',
                required: '',
                placeholder: '',
                options: '',
            })
        },
        returnFormatedOptions(s) {
            let optionsArray = s.split(',')
            let formatedOptions = []
            optionsArray.forEach(option => {
                if (option[0] == ' ') {
                    option = option.substring(1)
                }

                let o = {}
                o.label = option
                o.value = option.replace(/\s/g, '_').toLowerCase()
                formatedOptions.push(o)
            })
            return formatedOptions
        },
    },
    computed: {
        returnSelectedMapValue() {
            if (this.selectedMap == 'waze') return true
            else return false
        },
        returnEmailsinArray() {
            return this.generalData.emailJs.emails.replace(/\s/g, '').split(',')
        },
    },
}
</script>
