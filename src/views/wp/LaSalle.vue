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
                folder: 'lasalle',
                accentColor: 'red-8',
                subtitleColor: 'red-8',
                categories: [{label: 'Almuerzos', value: 'almuerzo'}],
                whatsappNumber: '66083084',
                wazeIntegration: false,
                googleSheets: {
                    integration: true,
                    url:
                        'https://script.google.com/macros/s/AKfycbybmCSxZchLRwk4V4B3ev_D0mIyXPiDtXTEA0lrBmgcGAetIJo/exec',
                },
                emailsJs: {
                    integration: false,
                    emails: ['email@email.com'],
                },
            },
            menu: [
                {
                    title: 'Pollo guisado, arroz con guandu y ensalada de papa',
                    subtitle: '',
                    desc: '',
                    type: 'almuerzo',
                    pic: 'almuerzo_1.jpeg',
                    price: 4,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                },
            ],
            cartSettings: {
                locationDefaults: {
                    defaultLat: 8.986059,
                    defaultLng: -79.511038,
                },
                inputData: [
                    {
                        type: 'text',
                        label: 'Nombre',
                        required: true,
                        placeholder: 'Nombre Apellido',
                    },
                    {
                        type: 'textarea',
                        label: 'Comentarios especiales',
                        required: false,
                        placeholder: 'La hamburguesa son mayonesa porfavor',
                    },
                    {
                        type: 'radio',
                        label: 'Metodo de pago',
                        required: true,
                        options: [
                            {label: 'Yappy', value: 'Yappy'},
                            {label: 'Efectivo', value: 'Efectivo'},
                            {label: 'Tarjeta', value: 'Tarjeta'},
                        ],
                    },
                ],
            },
        }
    },
    components: {
        MainLayout,
    },
}
</script>
