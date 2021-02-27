<template>
    <MainLayout
        :generalData="generalData"
        :cartSettings="carSettings"
        :menu="menu"
    />
</template>
<script>
import MainLayout from '@/components/wp/MainLayout'

export default {
    data() {
        return {
            generalData: {
                folder: '',
                accentColor: '',
                subtitleColor: '',
                categories: [],
                whatsappNumber: '',
                wazeIntegration: false,
                googleSheets: {integration: false, url: ''},
                emailJs: {integration: false, emails: ['']},
            },
            cartSettings: {
                locationDefaults: {defaultLat: NaN, defaultLng: NaN},
                inputData: [
                    {
                        type: 'radio',
                        label: '',
                        required: true,
                        placeholder: '',
                        options: [
                            {label: 'yappy', value: 'yappy'},
                            {
                                label: 'tarjeta de credito',
                                value: 'tarjeta_de_credito',
                            },
                        ],
                    },
                    {
                        type: 'radio',
                        label: '',
                        required: false,
                        placeholder: '',
                        options: [
                            {label: 'en efectivo', value: 'en_efectivo'},
                            {label: 'con dinero', value: 'con_dinero'},
                        ],
                    },
                ],
            },
        }
    },
    components: {MainLayout},
}
</script>
