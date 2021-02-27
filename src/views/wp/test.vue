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
                categories: [{label: '', value: ''}],
                whatsappNumber: '',
                wazeIntegration: false,
                googleSheets: {integration: false, url: ''},
                emailJs: {integration: false, emails: ['']},
            },
            cartSettings: {
                locationDefaults: {defaultLat: NaN, defaultLng: NaN},
                inputData: [
                    {type: '', label: '', required: false, placeholder: ''},
                ],
            },
            menu: [
                {
                    title: '',
                    subtitle: '',
                    desc: '',
                    type: '',
                    pic: '',
                    price: 0,
                    styles: [],
                    sides: [],
                    options: [{title: '', price: 0}],
                },
                {
                    title: '',
                    subtitle: '',
                    desc: '',
                    type: '',
                    pic: '',
                    price: 0,
                    styles: [],
                    sides: [],
                    options: [{title: '', price: 0}],
                },
            ],
        }
    },
    components: {MainLayout},
}
</script>
