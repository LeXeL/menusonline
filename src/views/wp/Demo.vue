<template>
    <MainLayout :generalData="generalData" :cartSettings="cartSettings" :menu="menu"/>
</template>

<script>
import MainLayout from '@/components/wp/MainLayout'

export default {
    data() {
        return {
            generalData: {
                folder: 'demo',
                accentColor: 'orange-9',
                subtitleColor: 'red-8',
                categories: [
                    {label: 'Hamburguesas', value: 'hamburguesas'},
                    {label: 'Hotdogs', value: 'hotdogs'},
                    {label: 'De Picar', value: 'de_picar'}
                ],
                whatsappNumber: '66083084',
                wazeIntegration: false,
                googleSheets: {
                    integration: false,
                    url: 'https://script.google.com/macros/s/AKfycbzPCB7GpZlqm0iKBy8mDPpa12_QFmcTukrsPlaINRFSYjWGvfD9/exec'
                },
                emailsJs: {
                    integration: false,
                    emails: ['email@email.com']
                }
            },
            menu: [
                {
                    title: 'Hamburguesa Clasica',
                    subtitle: '',
                    desc: 'Deliciosa carne angus hecha a la parrilla, con cebolla, tomate, lechuga, salsa de la casa y pan artesanal.',
                    type: 'hamburguesas',
                    pic: 'hamburguesa.jpg',
                    price: 6.5,
                    count: 0,
                    active: true,
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                            active: true,
                            available: true
                        },
                        {
                            title: 'Papas Fritas',
                            price: 1.5,
                            active: true,
                            available: true
                        },
                        {
                            title: 'Aros de cebolla',
                            price: 1.75,
                            active: true,
                            available: false
                        },
                        {
                            title: '2 Personas',
                            price: 8.25,
                            active: false,
                            available: true
                        },
                        {
                            title: '4 Personas',
                            price: 15.0,
                            active: false,
                            available: true
                        },
                        {
                            title: '6 unidades',
                            price: 4.25,
                            active: false,
                            available: true
                        },
                        {
                            title: '10 unidades',
                            price: 5.75,
                            active: false,
                            available: true
                        },
                    ],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'Hamburguesa con Queso y Bacon',
                    subtitle: '',
                    desc: 'Deliciosa carne angus hecha a la parrilla, queso amarillo, lechuga, tomate y deliciosas tiras de bacon.',
                    type: 'hamburguesas',
                    pic: 'bacon.jpg',
                    price: 7.5,
                    count: 0,
                    active: true,
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                            active: true,
                            available: true
                        },
                        {
                            title: 'Papas Fritas',
                            price: 1.5,
                            active: true,
                            available: true
                        },
                        {
                            title: 'Aros de cebolla',
                            price: 1.75,
                            active: true,
                            available: false
                        },
                        {
                            title: '2 Personas',
                            price: 8.25,
                            active: false,
                            available: true
                        },
                        {
                            title: '4 Personas',
                            price: 15.0,
                            active: false,
                            available: true
                        },
                        {
                            title: '6 unidades',
                            price: 4.25,
                            active: false,
                            available: true
                        },
                        {
                            title: '10 unidades',
                            price: 5.75,
                            active: false,
                            available: true
                        },
                    ],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'HotDog Clasico',
                    subtitle: '',
                    desc: 'Hotdog clasico con pico de gallo y queso fundido.',
                    type: 'hotdogs',
                    pic: 'hotdog_clasico.jpg',
                    price: 7.5,
                    count: 0,
                    active: true,
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                            active: true,
                            available: true
                        },
                        {
                            title: 'Papas Fritas',
                            price: 1.5,
                            active: true,
                            available: true
                        },
                        {
                            title: 'Aros de cebolla',
                            price: 1.75,
                            active: true,
                            available: false
                        },
                        {
                            title: '2 Personas',
                            price: 8.25,
                            active: false,
                            available: true
                        },
                        {
                            title: '4 Personas',
                            price: 15.0,
                            active: false,
                            available: true
                        },
                        {
                            title: '6 unidades',
                            price: 4.25,
                            active: false,
                            available: true
                        },
                        {
                            title: '10 unidades',
                            price: 5.75,
                            active: false,
                            available: true
                        },
                    ],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'ChilliDog',
                    subtitle: '',
                    desc: 'Hotdog con chille, queso y cebolla picada en pan artesanal.',
                    type: 'hotdogs',
                    pic: 'hotdog.jpg',
                    price: 7.5,
                    count: 0,
                    active: false,
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                            active: true,
                            available: true
                        },
                        {
                            title: 'Papas Fritas',
                            price: 1.5,
                            active: true,
                            available: true
                        },
                        {
                            title: 'Aros de cebolla',
                            price: 1.75,
                            active: true,
                            available: false
                        },
                        {
                            title: '2 Personas',
                            price: 8.25,
                            active: false,
                            available: true
                        },
                        {
                            title: '4 Personas',
                            price: 15.0,
                            active: false,
                            available: true
                        },
                        {
                            title: '6 unidades',
                            price: 4.25,
                            active: false,
                            available: true
                        },
                        {
                            title: '10 unidades',
                            price: 5.75,
                            active: false,
                            available: true
                        },
                    ],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'HotDog Hawaiano',
                    subtitle: '',
                    desc: 'Hotdog con mayonesa, queso blanco, papitas trituradas y mermelada de piña.',
                    type: 'hotdogs',
                    pic: 'hawaiano.jpg',
                    price: 6.75,
                    count: 0,
                    active: true,
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                            active: true,
                            available: true
                        },
                        {
                            title: 'Papas Fritas',
                            price: 1.5,
                            active: true,
                            available: true
                        },
                        {
                            title: 'Aros de cebolla',
                            price: 1.75,
                            active: true,
                            available: false
                        },
                        {
                            title: '2 Personas',
                            price: 8.25,
                            active: false,
                            available: true
                        },
                        {
                            title: '4 Personas',
                            price: 15.0,
                            active: false,
                            available: true
                        },
                        {
                            title: '6 unidades',
                            price: 4.25,
                            active: false,
                            available: true
                        },
                        {
                            title: '10 unidades',
                            price: 5.75,
                            active: false,
                            available: true
                        },
                    ],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'Picada de la Casa',
                    subtitle: '',
                    desc: 'Picada mixta con trocitos de carne de res, puerco, pollo, papas fritas, platanitos, aros de cebolla, lechuga y tomate.',
                    type: 'de_picar',
                    pic: 'picada.jpg',
                    price: 0,
                    count: 0,
                    active: true,
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                            active: false,
                            available: true
                        },
                        {
                            title: 'Papas Fritas',
                            price: 1.5,
                            active: false,
                            available: true
                        },
                        {
                            title: 'Aros de cebolla',
                            price: 1.75,
                            active: false,
                            available: false
                        },
                        {
                            title: '2 Personas',
                            price: 8.25,
                            active: true,
                            available: true
                        },
                        {
                            title: '4 Personas',
                            price: 15.0,
                            active: true,
                            available: true
                        },
                        {
                            title: '6 unidades',
                            price: 4.25,
                            active: false,
                            available: true
                        },
                        {
                            title: '10 unidades',
                            price: 5.75,
                            active: false,
                            available: true
                        },
                    ],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'Alitas',
                    subtitle: '',
                    desc: 'Elija entre 6 o 10 unidades de alitas + 2 salsas de su eleccion.',
                    type: 'de_picar',
                    pic: 'wings.jpg',
                    price: 0,
                    count: 0,
                    active: true,
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                            active: false,
                            available: true
                        },
                        {
                            title: 'Papas Fritas',
                            price: 1.5,
                            active: false,
                            available: true
                        },
                        {
                            title: 'Aros de cebolla',
                            price: 1.75,
                            active: false,
                            available: false
                        },
                        {
                            title: '2 Personas',
                            price: 8.25,
                            active: false,
                            available: true
                        },
                        {
                            title: '4 Personas',
                            price: 15.0,
                            active: false,
                            available: true
                        },
                        {
                            title: '6 unidades',
                            price: 4.25,
                            active: true,
                            available: true
                        },
                        {
                            title: '10 unidades',
                            price: 5.75,
                            active: true,
                            available: true
                        },
                    ],
                    styles: [
                        {
                            title: 'BBQ',
                            price: 0,
                        },
                        {
                            title: 'Honey Mustard',
                            price: 0,
                        },
                        {
                            title: 'Buffalo',
                            price: 0,
                        },
                        {
                            title: 'Honey BBQ',
                            price: 0,
                        },
                        {
                            title: 'Garlic',
                            price: 0,
                        },
                    ],
                    sides: [
                        {
                            title: 'BBQ',
                            price: 0,
                        },
                        {
                            title: 'Honey Mustard',
                            price: 0,
                        },
                        {
                            title: 'Buffalo',
                            price: 0,
                        },
                        {
                            title: 'Honey BBQ',
                            price: 0,
                        },
                        {
                            title: 'Garlic',
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
                        placeholder: 'Nombre Apellido'
                    },
                    {
                        type: 'textarea',
                        label: 'Comentarios especiales',
                        required: false,
                        placeholder: 'La hamburguesa son mayonesa porfavor'
                    },
                    {
                        type: 'radio',
                        label: 'Metodo de pago',
                        required: true,
                        options: [
                            {label: 'Yappy', value: 'Yappy'},
                            {label: 'Efectivo', value: 'Efectivo'},
                            {label: 'Tarjeta', value: 'Tarjeta'},
                        ]
                    }
                ]
            },
        }
    },
    components: {
        MainLayout
    }
}

</script>
