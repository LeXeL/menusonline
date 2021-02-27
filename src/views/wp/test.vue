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
            generalData: {folder: '', accentColor: ''},
            subtitleColor: '',
            categories: [],
            whatsappNumber: '',
            wazeIntegration: false,
            googleSheets: {integration: false, url: ''},
        }
    },
    components: {MainLayout},
}
</script>
