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
                folder: 'sokys',
                accentColor: 'amber',
                subtitleColor: 'amber',
                categories: [
                    {label: 'Principales', value: 'principales'},
                    {label: 'Hamburguesas', value: 'hamburguesas'},
                    {label: 'Pitas', value: 'pitas'},
                    {label: 'Dulces', value: 'dulces'},
                    {label: 'Bebidas', value: 'bebidas'},
                ],
                whatsappNumber: '65121562',
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
                    title: 'Pollos al Tandoor',
                    subtitle: '',
                    desc:
                        'Un cuarto de pollo preparado en horno tandoor. Acompañados de papas.',
                    type: 'principales',
                    pic: '',
                    price: 0,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Peri Peri',
                            price: 8.75,
                        },
                        {
                            title: 'Tandoori',
                            price: 8.25,
                        },
                    ],
                },
                {
                    title: 'Tikkas',
                    subtitle: '',
                    desc: 'Bites de pollo preparados en horno tandoor.',
                    type: 'principales',
                    pic: '',
                    price: 9.25,
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
                {
                    title: 'Wings 65`',
                    subtitle: '',
                    desc: 'Alitas de pollo al estilo 65` con dip de casa.',
                    type: 'principales',
                    pic: '',
                    price: 7.5,
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
                {
                    title: 'Samosas',
                    subtitle: '',
                    desc: 'Empanaditas rellenas de carne. 6 Unidades.',
                    type: 'principales',
                    pic: '',
                    price: 5.5,
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
                {
                    title: 'Hamburguesa Clasica',
                    subtitle: '',
                    desc:
                        'Hamburguesa clasica con pollo a la plancha. Acompañados de papas y soda.',
                    type: 'hamburguesas',
                    pic: '',
                    price: 9.75,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Peri Peri',
                            price: 0,
                        },
                        {
                            title: 'Tandoori',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Strip Burger',
                    subtitle: '',
                    desc:
                        'Hamburguesa de strips de pollo apanado con sweet & spicy coleslaw. Acompañados de papas y soda.',
                    type: 'hamburguesas',
                    pic: '',
                    price: 9.75,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Peri Peri',
                            price: 0,
                        },
                        {
                            title: 'Tandoori',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Dipped Burger',
                    subtitle: '',
                    desc:
                        'Hamburguesa de strips de pollo apanado bañados en salsa de casa. Acompañados de papas y soda.',
                    type: 'hamburguesas',
                    pic: '',
                    price: 10.5,
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
                {
                    title: 'Pitas',
                    subtitle: '',
                    desc:
                        'Pitas con pollo a la plancha y vegetales salteados. Acompañados de papas y soda.',
                    type: 'pitas',
                    pic: '',
                    price: 9.75,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Peri Peri',
                            price: 0,
                        },
                        {
                            title: 'Tandoori',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Dipped Pitas',
                    subtitle: '',
                    desc:
                        'Pitas de strips de pollo apanado bañados en salsa de la casa. Acompañados de papas y soda.',
                    type: 'pitas',
                    pic: '',
                    price: 10.5,
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
                {
                    title: 'Halwa de almendras',
                    subtitle: '',
                    desc: 'Dulce de almendras a base de leche.',
                    type: 'dulces',
                    pic: '',
                    price: 3.25,
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
                {
                    title: 'Gulab Jamun',
                    subtitle: '',
                    desc: 'Bolitas bañadas en sirope de rosa.',
                    type: 'dulces',
                    pic: '',
                    price: 2.99,
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
                {
                    title: 'Bebidas',
                    subtitle: '',
                    desc: 'Agua embotellada, soda.',
                    type: 'bebidas',
                    pic: '',
                    price: 0,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Agua embotellada',
                            price: 1,
                        },
                        {
                            title: 'Soda',
                            price: 1.5,
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
                        placeholder: 'La hamburguesa sin mayonesa porfavor.',
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
