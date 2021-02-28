<template>
    <MainLayout
        :generalData="generalData"
        :cartSettings="cartSettings"
        :menu="menu"
    />
</template>
<script>
import MainLayout from '@/components/wp/MainLayout'
export default {
    data() {
        return {
            generalData: {
                folder: 'demo',
                accentColor: '',
                subtitleColor: '',
                categories: [
                    {
                        label: '',
                        value: '',
                    },
                ],
                whatsappNumber: '',
                wazeIntegration: false,
                googleSheets: {integration: false, url: ''},
                emailJs: {integration: false, emails: ['']},
            },
            cartSettings: {
                locationDefaults: {defaultLat: NaN, defaultLng: NaN},
                inputData: [
                    {type: '', label: '', required: true, placeholder: ''},
                ],
            },
            menu: [
                {
                    title: 'final test',
                    subtitle: '',
                    desc: '',
                    type: '',
                    pic: '',
                    price: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: '',
                            price: 0,
                        },
                    ],
                },
            ],
        }
    },
    components: {MainLayout},
}
</script>
