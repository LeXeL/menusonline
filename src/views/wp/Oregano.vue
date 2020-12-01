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
                folder: 'oregano',
                accentColor: 'light-green-8',
                subtitleColor: 'light-green-8',
                categories: [{label: 'Lasañas', value: 'lasañas'}],
                whatsappNumber: '65807614',
                wazeIntegration: false,
                googleSheets: {
                    integration: false,
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
                    title: 'Lasaña Bolognesa',
                    subtitle: '',
                    desc: '',
                    type: 'lasañas',
                    pic: '',
                    price: 0,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Personal',
                            price: 7.5,
                        },
                        {
                            title: 'Mediana',
                            price: 15,
                        },
                        {
                            title: 'Familiar',
                            price: 30,
                        },
                    ],
                },
                {
                    title: 'Lasaña de Hongos',
                    subtitle: '',
                    desc: '',
                    type: 'lasañas',
                    pic: '',
                    price: 0,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Personal',
                            price: 7.5,
                        },
                        {
                            title: 'Mediana',
                            price: 15,
                        },
                        {
                            title: 'Familiar',
                            price: 30,
                        },
                    ],
                },
                {
                    title: 'Lasaña de Hongos con Espinaca',
                    subtitle: '',
                    desc: '',
                    type: 'lasañas',
                    pic: '',
                    price: 0,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Personal',
                            price: 7.5,
                        },
                        {
                            title: 'Mediana',
                            price: 15,
                        },
                        {
                            title: 'Familiar',
                            price: 30,
                        },
                    ],
                },
                {
                    title: 'Lasaña Bolognesa con Hongos',
                    subtitle: '',
                    desc: '',
                    type: 'lasañas',
                    pic: '',
                    price: 0,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Personal',
                            price: 8.5,
                        },
                        {
                            title: 'Mediana',
                            price: 16.5,
                        },
                        {
                            title: 'Familiar',
                            price: 32,
                        },
                    ],
                },
                {
                    title: 'Lasaña Bolognesa con Espinaca',
                    subtitle: '',
                    desc: '',
                    type: 'lasañas',
                    pic: '',
                    price: 0,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Personal',
                            price: 8.5,
                        },
                        {
                            title: 'Mediana',
                            price: 16.5,
                        },
                        {
                            title: 'Familiar',
                            price: 32,
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
