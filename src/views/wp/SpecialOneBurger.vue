<template>
    <MainLayout :generalData="generalData" :cartSettings="cartSettings" :menu="menu"/>
</template>

<script>
import MainLayout from '@/components/wp/MainLayout'

export default {
    data() {
        return {
            generalData: {
                folder: 'specialoneburger',
                accentColor: 'red-8',
                subtitleColor: 'red-8',
                categories: [
                    {label: 'Hamburguesas', value: 'hamburguesas'},
                    {label: 'Bebidas', value: 'bebidas'},
                ],
                whatsappNumber: '62044616',
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
                    title: 'La Fanatica Burger',
                    subtitle: '',
                    desc:
                        'Deliciosa hamburguesa de 200g de carne jugosa, lechuga fresca, tomate, queso amarilo, exquisito queso blanco Oxaca, cebollas caramelizadas, bacon, pepinillos y salsa de la casa. En combo acompañado de papas wester y soda.',
                    type: 'hamburguesas',
                    pic: 'fanatica.jpeg',
                    price: 0,
                    count: 0,
                    options: [
                        {
                            title: 'Sola',
                            price: 4.25,
                        },
                        {
                            title: 'Combo',
                            price: 6.75,
                        },
                    ],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'La 2 Toques Burger',
                    subtitle: '',
                    desc:
                        'Deliciosa hamburguesa doble carne de 200g, lechuga fresca, 2 tomates, 2 quesos amarillos, exquisito queso blanco Oxaca, cebollas caramelizadas, bacon, huevo frito, pepinillos y salsa de la casa. En combo acompañado de papas wester y soda.',
                    type: 'hamburguesas',
                    pic: '2_toques.jpeg',
                    price: 0,
                    count: 0,
                    options: [
                        {
                            title: 'Sola',
                            price: 5.25,
                        },
                        {
                            title: 'Combo',
                            price: 7.75,
                        },
                    ],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'World Cup Burger',
                    subtitle: '',
                    desc:
                        'Deliciosa hamburguesa doble carne de 200g, lechuga, 2 tomates, 2 quesos amarillos, exquisito queso blanco Oxaca, cebolla caramelizada, bacon, una rebanada de piña, pepinillos y salsa de la casa. En combo acompañado de papas wester y soda.',
                    type: 'hamburguesas',
                    pic: 'world_cup.jpeg',
                    price: 0,
                    count: 0,
                    options: [
                        {
                            title: 'Sola',
                            price: 6.25,
                        },
                        {
                            title: 'Combo',
                            price: 8.75,
                        },
                    ],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'Soda',
                    subtitle: '',
                    desc:
                        'Coca Cola, Ginger Ale.',
                    type: 'bebidas',
                    pic: 'soda.jpg',
                    price: 1.5,
                    count: 0,
                    options: [
                        {
                            title: 'Coca Cola',
                            price: 0,
                        },
                        {
                            title: 'Ginger Ale',
                            price: 0,
                        },
                    ],
                    styles: [],
                    sides: [],
                },


                
            ],
            cartSettings: {
                locationDefaults: {
                    defaultLat: 9.046375,
                    defaultLng: -79.485699,
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
                        placeholder: 'La hamburguesa sin mayonesa porfavor'
                    },
                    {
                        type: 'radio',
                        label: 'Metodo de pago',
                        required: true,
                        options: [
                            {label: 'Yappy', value: 'Yappy'},
                            {label: 'Efectivo', value: 'Efectivo'},
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
