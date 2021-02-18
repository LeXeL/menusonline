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
                folder: 'panamahotdog',
                accentColor: 'red-8',
                subtitleColor: 'red-8',
                categories: [
                    {label: 'Hotdogs', value: 'hotdogs'},
                    {label: 'Salchipapas', value: 'salchipapas'},
                    {label: 'Hamburguesas', value: 'hamburguesas'},
                    {label: 'Arepas y Burritos', value: 'arepas_y_burritos'},
                    {label: 'De Picar', value: 'de_picar'},
                    {label: 'Combos', value: 'combos'},
                    {label: 'Adicionales', value: 'adiconales'},
                    {label: 'Bebidas', value: 'bebidas'},
                    {label: 'Especiales', value: 'especiales'},
                ],
                whatsappNumber: '60539696',
                wazeIntegration: true,
                googleSheets: {
                    integration: true,
                    url:
                        'https://script.google.com/macros/s/AKfycbybmCSxZchLRwk4V4B3ev_D0mIyXPiDtXTEA0lrBmgcGAetIJo/exec',
                },
                emailsJs: {
                    integration: false,
                    emails: ['email@email.com'],
                },
                instagram: {
                    account: 'PanamaHotdogOficial',
                    link: 'https://www.instagram.com/panamahotdogoficial/',
                },
                whatsappPOP: '6684-7121',
            },
            menu: [
                {
                    title: 'Hotdog Hawaiiano',
                    desc:
                        'Ketchup, mayonesa, queso blanco rayado, papitas trituradas y jalea de piña.',
                    type: 'main',
                    pic: 'hotdog_hawaiiano.jpg',
                    price: 2,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Chorizo',
                            price: 0.5,
                        },
                    ],
                },
                {
                    title: 'Hotdog Panameño',
                    desc:
                        'Ketchup, mayonesa, pico de gallo y queso amarillo fundido.',
                    type: 'main',
                    pic: 'hotdog_panameno.jpeg',
                    price: 2,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Chorizo',
                            price: 0.5,
                        },
                    ],
                },
                {
                    title: 'Chillidog',
                    desc:
                        'Ketchup, mayonesa, carne molida, y queso amarillo fundido.',
                    type: 'main',
                    pic: 'chillidog.jpeg',
                    price: 2.5,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Chorizo',
                            price: 0.5,
                        },
                    ],
                },
                {
                    title: 'Salchipapas Sencillas',
                    desc:
                        'Papas, salchichas, ketchup, mayonesa y queso amarillo.',
                    type: 'main',
                    pic: 'salchipapas.jpeg',
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Pequeño',
                            price: 3,
                        },
                        {
                            title: 'Grande',
                            price: 5,
                        },
                    ],
                },
                {
                    title: 'Salchipapas Revoltosa',
                    desc:
                        'Papas fritas, salchichas, ketchup, mayonesa, queso amarillo, carne molida o pollo y pico de gallo.',
                    type: 'main',
                    pic: 'salchipapas_revoltosa.jpeg',
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Carne molida - Pequeño',
                            price: 4,
                        },
                        {
                            title: 'Carne molida - Grande',
                            price: 6.5,
                        },
                        {
                            title: 'Pollo - Pequeño',
                            price: 4,
                        },
                        {
                            title: 'Pollo - Grande',
                            price: 6.5,
                        },
                        {
                            title: 'Mixta - Pequeña',
                            price: 4.5,
                        },
                        {
                            title: 'Mixta - Grande',
                            price: 7,
                        },
                    ],
                },
                {
                    title: 'Hamburguesa de carne',
                    desc:
                        'Ketchup, mayonesa, lechuga, tomate, queso amarillo fundido, carne de res 8oz.',
                    type: 'main',
                    pic: 'hamburguesa_carne.jpeg',
                    price: 4,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Con tocino',
                            price: 1,
                        },
                    ],
                },
                {
                    title: 'Hamburguesa de pollo',
                    desc:
                        'Mayonesa, lechuga, tomate, tender de pechuga de pollo, queso blanco, o amarillo.',
                    type: 'main',
                    pic: 'hamburguesa_pollo.jpeg',
                    styles: [],
                    sides: [],
                    price: 4,
                    options: [
                        {
                            title: 'Regular con queso blanco',
                            price: 0,
                        },
                        {
                            title: 'Regular con queso amarillo',
                            price: 0,
                        },
                        {
                            title: 'Con tocino y queso blanco',
                            price: 1,
                        },
                        {
                            title: 'Con tocino y queso amarillo',
                            price: 1,
                        },
                    ],
                },
                {
                    title: 'Hamburguesa Bulldog',
                    desc:
                        'Carne de res 8oz, tender de pollo, tocino, lechuga, tomate, queso amarillo fundido, ketchup y mayonesa.',
                    type: 'main',
                    pic: 'hamburguesa_bulldog.jpeg',
                    styles: [],
                    sides: [],
                    price: 6,
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Arepas',
                    desc:
                        'Elige entre arepa de pollo, arepa de carne desmechada o arepa mixta.',
                    type: 'main',
                    pic: 'arepa_mixta.jpeg',
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Pollo',
                            price: 4,
                        },
                        {
                            title: 'Carne desmechada',
                            price: 4,
                        },
                        {
                            title: 'Mixta',
                            price: 4,
                        },
                    ],
                },
                {
                    title: 'Burritos',
                    desc:
                        'Elige entre burrito de carne, burrito de pollo o burrito mixto.',
                    type: 'main',
                    pic: 'burrito_carne.jpeg',
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Carne',
                            price: 4,
                        },
                        {
                            title: 'Pollo',
                            price: 4,
                        },
                        {
                            title: 'Mixto',
                            price: 4,
                        },
                    ],
                },
                {
                    title: 'Club sandwich con papas',
                    desc: '',
                    type: 'main',
                    pic: 'club_sandwich.jpeg',
                    price: 6,
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
                    title: 'Nachos',
                    desc:
                        'Nachos con pico de gallo, queso fundido y carne molida.',
                    type: 'main',
                    pic: 'nachos.jpeg',
                    price: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Chicos',
                            price: 3.5,
                        },
                        {
                            title: 'Grandes',
                            price: 6,
                        },
                    ],
                },
                {
                    title: 'Combito de hamburguesa',
                    desc: '4 alas, papas, hamburguesa y soda',
                    type: 'main',
                    pic: 'combito_hamburguesa.jpeg',
                    price: 8,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Coca Cola',
                            price: 0,
                        },
                        {
                            title: 'GingerAle',
                            price: 0,
                        },
                        {
                            title: 'Dr. Pepper',
                            price: 0,
                        },
                        {
                            title: 'Kist Fresa',
                            price: 0,
                        },
                        {
                            title: 'Maltin Polar',
                            price: 0,
                        },
                        {
                            title: 'Root Beer',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Combito de Hotdog',
                    desc:
                        'Elije entre Hotdog Panameño o Hotdog Hawaiiano, acompañado de 4 alas, papas y soda.',
                    type: 'main',
                    pic: 'combito_hawaiiano.jpg',
                    price: 6,
                    styles: [
                        {
                            title: 'Hotdog Hawaiiano',
                            price: 0,
                        },
                        {
                            title: 'Hotdog Panameño',
                            price: 0,
                        },
                    ],
                    sides: [],
                    options: [
                        {
                            title: 'Coca Cola',
                            price: 0,
                        },
                        {
                            title: 'GingerAle',
                            price: 0,
                        },
                        {
                            title: 'Dr. Pepper',
                            price: 0,
                        },
                        {
                            title: 'Kist Fresa',
                            price: 0,
                        },
                        {
                            title: 'Maltin Polar',
                            price: 0,
                        },
                        {
                            title: 'Root Beer',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Alitas con papas',
                    desc: '',
                    type: 'main',
                    pic: 'alitas.jpeg',
                    price: 6,
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
                    title: 'Empanadas',
                    desc: 'Carne molida, carne desmechada, queso blanco.',
                    type: 'main',
                    pic: 'empanadas.jpeg',
                    price: 2,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Carne molida',
                            price: 0,
                        },
                        {
                            title: 'Carne desmechada',
                            price: 0,
                        },
                        {
                            title: 'Queso blanco',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Papas fritas',
                    desc: 'Orden extra de papas fritas.',
                    type: 'main',
                    pic: 'orden_papas.jpeg',
                    price: 1.5,
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
                    title: 'Soda',
                    desc:
                        'Coca Cola, GingerAle, Dr. Pepper, Kist Fresa, Maltin Polar, Root Beer',
                    type: 'main',
                    pic: 'soda.jpg',
                    price: 1,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Coca Cola',
                            price: 0,
                        },
                        {
                            title: 'GingerAle',
                            price: 0,
                        },
                        {
                            title: 'Dr. Pepper',
                            price: 0,
                        },
                        {
                            title: 'Kist Fresa',
                            price: 0,
                        },
                        {
                            title: 'Maltin Polar',
                            price: 0,
                        },
                        {
                            title: 'Root Beer',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Jugo',
                    desc: 'Melocoton, Pera, Manzana.',
                    type: 'main',
                    pic: 'jugos.jpg',
                    price: 1,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Melocoton',
                            price: 0,
                        },
                        {
                            title: 'Pera',
                            price: 0,
                        },
                        {
                            title: 'Manzana',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Agua',
                    desc: 'Botella de agua de 600ml.',
                    type: 'main',
                    pic: 'agua.jpg',
                    price: 1,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Botella 600ml',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Batido',
                    desc:
                        'Batidos de fresa, maracuya, papaya, Melocoton, Guanabana, Cornflakes.',
                    type: 'main',
                    pic: 'batido.jpeg',
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Fresa',
                            price: 2.5,
                        },
                        {
                            title: 'Maracuya',
                            price: 2.5,
                        },
                        {
                            title: 'Papaya',
                            price: 2.5,
                        },
                        {
                            title: 'Melocoton',
                            price: 2.5,
                        },
                        {
                            title: 'Guanabana',
                            price: 2.5,
                        },
                        {
                            title: 'Cornflakes',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Limonada con hierbabuena',
                    desc: '',
                    type: 'main',
                    pic: 'limonada.jpg',
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 2,
                        },
                        {
                            title: 'Con fresa',
                            price: 2.5,
                        },
                    ],
                },
                {
                    title: 'Pescado con patacones',
                    subtitle: 'Solo viernes y sabados',
                    desc: '',
                    type: 'extra',
                    pic: 'filete_de_pescado.jpeg',
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Filete',
                            price: 8,
                        },
                        {
                            title: 'Entero',
                            price: 10,
                        },
                    ],
                    days: [5, 6],
                },
                {
                    title: 'Patacones',
                    subtitle: 'Solo viernes y sabados',
                    desc: 'Orden extra de patacones fritos.',
                    type: 'extra',
                    pic: 'patacones.jpg',
                    price: 1.5,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                    days: [5, 6],
                },
                {
                    title: 'Saus',
                    subtitle: 'Solo viernes',
                    desc: '',
                    type: 'extra',
                    price: 2,
                    styles: [],
                    sides: [],
                    pic: 'saus.jpeg',
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                    days: [5],
                },
                {
                    title: 'Ceviche',
                    subtitle: 'Solo viernes y sabados',
                    desc: '',
                    type: 'extra',
                    pic: 'ceviche.jpeg',
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Tradicional 16oz.',
                            price: 5,
                        },
                        {
                            title: 'Gourmet 16oz.',
                            price: 6,
                        },
                    ],
                    days: [5, 6],
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
                        label: 'Comentarios especiales de tu pedido',
                        required: false,
                        placeholder: 'La hamburguesa sin mayonesa porfavor',
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
