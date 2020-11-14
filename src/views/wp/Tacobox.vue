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
                folder: 'tacobox',
                accentColor: 'red-8',
                subtitleColor: 'red-8',
                categories: [
                    {label: 'Tacoboxes', value: 'tacoboxes'},
                ],
                whatsappNumber: '65187633',
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
                    title: 'Tacobox 1/4 Kilo',
                    subtitle: '1 carne a elegir',
                    desc:
                        'Elige 1 opcion de carne entre carnitas de cerdo, pollo, bistec o vegano, tortillas de maiz, cilantro y cebolla o pico de gallo, salsa picante, guacamole y frijoles refritos.',
                    type: 'tacoboxes',
                    pic: '',
                    price: 14,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Carnitas de cerdo',
                            price: 0,
                        },
                        {
                            title: 'Pollo',
                            price: 0,
                        },
                        {
                            title: 'Bistec',
                            price: 0,
                        },
                        {
                            title: 'Vegano',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Tacobox 1/2 Kilo',
                    subtitle: '2 carnes a elegir',
                    desc:
                        'Elige 1 opcion de carne entre carnitas de cerdo, pollo, bistec o vegano, tortillas de maiz, cilantro y cebolla o pico de gallo, salsa picante, guacamole y frijoles refritos.',
                    type: 'tacoboxes',
                    pic: '',
                    price: 27,
                    count: 0,
                    styles: [
                      {
                            title: 'Carnitas de cerdo',
                            price: 0,
                        },
                        {
                            title: 'Pollo',
                            price: 0,
                        },
                        {
                            title: 'Bistec',
                            price: 0,
                        },
                        {
                            title: 'Vegano',
                            price: 0,
                        },
                    ],
                    sides: [],
                    options: [
                        {
                            title: 'Carnitas de cerdo',
                            price: 0,
                        },
                        {
                            title: 'Pollo',
                            price: 0,
                        },
                        {
                            title: 'Bistec',
                            price: 0,
                        },
                        {
                            title: 'Vegano',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Tacobox 1 Kilo',
                    subtitle: '2 carnes a elegir',
                    desc:
                        'Elige 1 opcion de carne entre carnitas de cerdo, pollo, bistec o vegano, tortillas de maiz, cilantro y cebolla o pico de gallo, salsa picante, guacamole y frijoles refritos.',
                    type: 'tacoboxes',
                    pic: '',
                    price: 50,
                    count: 0,
                    styles: [
                      {
                            title: 'Carnitas de cerdo',
                            price: 0,
                        },
                        {
                            title: 'Pollo',
                            price: 0,
                        },
                        {
                            title: 'Bistec',
                            price: 0,
                        },
                        {
                            title: 'Vegano',
                            price: 0,
                        },
                    ],
                    sides: [],
                    options: [
                        {
                            title: 'Carnitas de cerdo',
                            price: 0,
                        },
                        {
                            title: 'Pollo',
                            price: 0,
                        },
                        {
                            title: 'Bistec',
                            price: 0,
                        },
                        {
                            title: 'Vegano',
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
