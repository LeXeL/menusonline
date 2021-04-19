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
                folder: 'wingzards',
                accentColor: 'amber',
                subtitleColor: 'red-8',
                categories: [
                    {label: 'Wings', value: 'wings'},
                    {
                        label: 'Quesadillas & Papimix',
                        value: 'quesadilla_papimix',
                    },
                    {label: 'Extras', value: 'extras'},
                ],
                whatsappNumber: '66083084',
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
                    title: '7 Wings',
                    subtitle: '',
                    desc:
                        '7 Deliciosas wings con 1 acompañamiento y 2 salsas de tu elección.',
                    type: 'wings',
                    pic: '',
                    price: 7,
                    count: 0,
                    styles: [
                        {
                            title: 'Buffalo',
                            price: 0,
                        },
                        {
                            title: 'BBQ',
                            price: 0,
                        },
                        {
                            title: 'Ajo Parmesano',
                            price: 0,
                        },
                        {
                            title: 'Honey Mustard',
                            price: 0,
                        },
                    ],
                    sides: [],
                    options: [
                        {
                            title: 'Buffalo',
                            price: 0,
                        },
                        {
                            title: 'BBQ',
                            price: 0,
                        },
                        {
                            title: 'Ajo Parmesano',
                            price: 0,
                        },
                        {
                            title: 'Honey Mustard',
                            price: 0,
                        },
                    ],
                },
                {
                    title: '14 Wings',
                    subtitle: '',
                    desc:
                        '14 Deliciosas wings con 1 acompañamiento y 2 salsas de tu elección.',
                    type: 'wings',
                    pic: '',
                    price: 13,
                    count: 0,
                    styles: [
                        {
                            title: 'Buffalo',
                            price: 0,
                        },
                        {
                            title: 'BBQ',
                            price: 0,
                        },
                        {
                            title: 'Ajo Parmesano',
                            price: 0,
                        },
                        {
                            title: 'Honey Mustard',
                            price: 0,
                        },
                    ],
                    sides: [],
                    options: [
                        {
                            title: 'Buffalo',
                            price: 0,
                        },
                        {
                            title: 'BBQ',
                            price: 0,
                        },
                        {
                            title: 'Ajo Parmesano',
                            price: 0,
                        },
                        {
                            title: 'Honey Mustard',
                            price: 0,
                        },
                    ],
                },
                {
                    title: '21 Wings',
                    subtitle: '',
                    desc:
                        '21 Deliciosas wings con 2 acompañamiento y 3 salsas de tu elección.',
                    type: 'wings',
                    pic: '',
                    price: 7,
                    count: 0,
                    styles: [
                        {
                            title: 'Buffalo',
                            price: 0,
                        },
                        {
                            title: 'BBQ',
                            price: 0,
                        },
                        {
                            title: 'Ajo Parmesano',
                            price: 0,
                        },
                        {
                            title: 'Honey Mustard',
                            price: 0,
                        },
                    ],
                    sides: [
                        {
                            title: 'Buffalo',
                            price: 0,
                        },
                        {
                            title: 'BBQ',
                            price: 0,
                        },
                        {
                            title: 'Ajo Parmesano',
                            price: 0,
                        },
                        {
                            title: 'Honey Mustard',
                            price: 0,
                        },
                    ],
                    options: [
                        {
                            title: 'Buffalo',
                            price: 0,
                        },
                        {
                            title: 'BBQ',
                            price: 0,
                        },
                        {
                            title: 'Ajo Parmesano',
                            price: 0,
                        },
                        {
                            title: 'Honey Mustard',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Cheez Wings',
                    subtitle: '',
                    desc:
                        '7 Deliciosas wings bañadas en queso mozzarella con 1 acompañamiento y 2 salsa de tu elección.',
                    type: 'wings',
                    pic: '',
                    price: 13,
                    count: 0,
                    styles: [
                        {
                            title: 'Buffalo',
                            price: 0,
                        },
                        {
                            title: 'BBQ',
                            price: 0,
                        },
                        {
                            title: 'Ajo Parmesano',
                            price: 0,
                        },
                        {
                            title: 'Honey Mustard',
                            price: 0,
                        },
                    ],
                    sides: [],
                    options: [
                        {
                            title: 'Buffalo',
                            price: 0,
                        },
                        {
                            title: 'BBQ',
                            price: 0,
                        },
                        {
                            title: 'Ajo Parmesano',
                            price: 0,
                        },
                        {
                            title: 'Honey Mustard',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Quesadilla',
                    subtitle: '',
                    desc:
                        '6 Quesadillas con papas y soda (Pollo, Pico de Gallo y Queso Mozzarella).',
                    type: 'quesadilla_papimix',
                    pic: '',
                    price: 6.5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [],
                },
                {
                    title: 'Papimix',
                    subtitle: '',
                    desc:
                        'Combinacion de pollo o salchicas con queso mozzarella, chicharron y salsas de la casa.',
                    type: 'quesadilla_papimix',
                    pic: '',
                    price: 0,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Salchipapas',
                            price: 6,
                        },
                        {
                            title: 'Papas Fritas + 5 Wings ',
                            price: 9,
                        },
                    ],
                },
                {
                    title: 'Salsas',
                    subtitle: '',
                    desc:
                        'Agrega salsas adicionales: Buffalo, BBQ, Ajo Parmesano, Honey Mustard',
                    type: 'extras',
                    pic: '',
                    price: 0.5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Buffalo',
                            price: 0,
                        },
                        {
                            title: 'BBQ',
                            price: 0,
                        },
                        {
                            title: 'Ajo Parmesano',
                            price: 0,
                        },
                        {
                            title: 'Honey Mustard',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Bebidas',
                    subtitle: '',
                    desc: '',
                    type: 'extras',
                    pic: '',
                    price: 0,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Sodas',
                            price: 1,
                        },
                        {
                            title: 'Jugos Naturales',
                            price: 2.5,
                        },
                    ],
                },
                {
                    title: 'Extras',
                    subtitle: '',
                    desc: 'Extra papas fritas, queso mozzarella o carne.',
                    type: 'extras',
                    pic: '',
                    price: 0,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Papas Fritas',
                            price: 2,
                        },
                        {
                            title: 'Queso Mozzarella',
                            price: 2.5,
                        },
                        {
                            title: 'Carne',
                            price: 2,
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
                        placeholder: 'Las alitas con salsa aparte por favor.',
                    },
                    {
                        type: 'radio',
                        label: 'Metodo de pago',
                        required: true,
                        options: [
                            {label: 'Efectivo', value: 'Efectivo'},
                            {label: 'ACH', value: 'ACH'},
                            {label: 'Nequi', value: 'Nequi'},
                            {label: 'Yappy', value: 'Yappy'},
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
