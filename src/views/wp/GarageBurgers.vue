<template>
    <MainLayout :generalData="generalData" :cartSettings="cartSettings" :menu="menu"/>
</template>

<script>
import MainLayout from '@/components/wp/MainLayout'

export default {
    data() {
        return {
            generalData: {
                folder: 'garageburgers',
                accentColor: 'orange-9',
                subtitleColor: 'red-8',
                categories: [
                    {label: 'Entradas', value: 'entradas'},
                    {label: 'Hamburguesas', value: 'hamburguesas'},
                    {label: 'Salchipapas', value: 'salchipapas'},
                    {label: 'Arepas', value: 'arepas'},
                    {label: 'Hotdogs Jumbo', value: 'hotdogs_jumbo'},
                    {label: 'Pepitos', value: 'pepitos'},
                    {label: 'Burritos', value: 'burritos'},
                    {label: 'Combos', value: 'combos'}
                ],
                whatsappNumber: '68909064',
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
                    title: 'Alitas',
                    desc:
                        '6 Unidades de alitas a la BBQ / Mostaza Miel, acompañadas con pasas fritas.',
                    type: 'entradas',
                    pic: 'alitas_2.jpeg',
                    price: 4.5,
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
                    title: 'Bowl Western',
                    desc: 'Papas western, carne molida, queso cheddar, bacon.',
                    type: 'entradas',
                    pic: 'bowl_western.jpeg',
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
                    title: 'Nachos',
                    desc:
                        'Tortillas de maiz, carne molida, pico de gallo, queso cheddar.',
                    type: 'entradas',
                    pic: 'nachos.jpeg',
                    price: 3.5,
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
                    title: 'Salchitortillas',
                    desc:
                        'Tortillas de maiz, salchichas jumbo, queso, salsa de la casa.',
                    type: 'entradas',
                    pic: '',
                    price: 2.5,
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
                    title: 'Hamburguesa clasica',
                    desc: 'Carne, queso cheddar, bacon, salsas de la casa.',
                    type: 'hamburguesas',
                    pic: 'hamburguesa_clasica.jpeg',
                    price: 2,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Garage Burger',
                    desc:
                        'Carne, queso cheddar, bacon, lechuga, tomate, cebolla, salsas de la casa.',
                    type: 'hamburguesas',
                    pic: 'hamburguesa_garage_burger.jpeg',
                    price: 3,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Starchicken',
                    desc:
                        'Milanesa de pollo, queso cheddar, bacon, lechuga, tomate, cebolla, salsas de la casa.',
                    type: 'hamburguesas',
                    pic: 'hamburguesa_starchicken.jpeg',
                    price: 3,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Bacon Burger',
                    desc: 'Carne, bacon, papitas fosforito, salsas de la casa.',
                    type: 'hamburguesas',
                    pic: '',
                    price: 3.5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Hamburguesa Especial',
                    desc:
                        'Carne, queso, cheddar, bacon, huevo frito, lechuga, tomate, cebolla , salsas de la casa.',
                    type: 'hamburguesas',
                    pic: '',
                    price: 4,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Hamburguesa Doble',
                    desc:
                        '2 Carnes, queso cheddar, bacon, tomate, lechuga, cebolla, salsas de la casa.',
                    type: 'hamburguesas',
                    pic: 'hamburguesa_doble.jpeg',
                    price: 4.5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Hamburguesa Triple',
                    desc:
                        'Carne, pollo, chuleta, queso cheddar, lechuga, tomate, cebolla, salsas de la casa.',
                    type: 'hamburguesas',
                    pic: 'hamburguesa_triple.jpeg',
                    price: 6,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Hamburguesa Bacon Cheddar',
                    desc:
                        '2 Carnes, queso cheddar, bacon, papitas fosforitos, salsas de la casa.',
                    type: 'hamburguesas',
                    pic: 'hamburguesa_bacon_cheddar.jpeg',
                    price: 4.25,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Hamburguesa Especial Premium',
                    desc:
                        'Carne, queso cheddar, bacon, huevo, tajada, lechuga, tomate, cebolla, salsas de la casa.',
                    type: 'hamburguesas',
                    pic: 'hamburguesa_especial_premium.jpeg',
                    price: 4.5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Hamburguesa Bacon Premium',
                    desc:
                        'Carne, queso mozzarella bacon, cebollas, acaramelizadas, papitas fosforito, salsas de la casa.',
                    type: 'hamburguesas',
                    pic: 'hamburguesa_bacon_premium_2.jpeg',
                    price: 4.5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Salchipapas sencillas',
                    desc:
                        'Papas fritas, salchicha jumbo, queso, salsas de la casa.',
                    type: 'salchipapas',
                    pic: 'salchipapas.jpeg',
                    price: 2.5,
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
                    title: 'Salchipapas con bacon',
                    desc:
                        'Papas fritas, salchicha jumbo, queso, bacon, maíz, salsas de la casa.',
                    type: 'salchipapas',
                    pic: '',
                    price: 3,
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
                    title: 'Salchipapas con chorizo',
                    desc:
                        'Papas fritas, salchicha jumbo, chorizo, queso, maíz, salsas de la casa.',
                    type: 'salchipapas',
                    pic: '',
                    price: 3.5,
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
                    title: 'Salchipapas con pollo',
                    desc:
                        'Papas fritas, pollo, salchicha jumbo, chorizo, queso, maíz, salsas de la casa.',
                    type: 'salchipapas',
                    pic: '',
                    price: 4.5,
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
                    title: 'Salchipapas con carne',
                    desc:
                        'Papas fritas, carne, salchicha jumbo, chorizo, queso, maíz, salsas de la casa.',
                    type: 'salchipapas',
                    pic: '',
                    price: 5,
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
                    title: 'Salchipapas de combinacion',
                    desc:
                        'Papas fritas, pollo, carne, salchicha jumbo, chorizo, queso, maíz, salsas de la casa.',
                    type: 'salchipapas',
                    pic: '',
                    price: 6,
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
                    title: 'Arepa con chorizo',
                    desc:
                        'Arepa con chorizo, queso mozzarella, salsa de la casa.',
                    type: 'arepas',
                    pic: 'arepa.jpeg',
                    price: 3,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Arepa con pollo',
                    desc:
                        'Arepa con pollo, queso mozzarella, salsa de la casa.',
                    type: 'arepas',
                    pic: '',
                    price: 3.5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Arepa con copa vieja',
                    desc:
                        'Arepa con ropa vieja, queso mozzarella, salsa de la casa.',
                    type: 'arepas',
                    pic: '',
                    price: 3.5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Arepa de combinacion',
                    desc:
                        'Arepa combinación, ropa vieja, pollo, chorizo, queso mozzarella, salsa de la casa.',
                    type: 'arepas',
                    pic: '',
                    price: 4,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Hotdog Sencillo',
                    desc: 'Ensalada de repollo y zanahoria, salsas de la casa.',
                    type: 'hotdogs_jumbo',
                    pic: '',
                    price: 1.5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Hotdog Especial',
                    desc:
                        'Ensalada de repollo y zanahoria, papitas fosforito, queso, bacon, salsa de la casa.',
                    type: 'hotdogs_jumbo',
                    pic: 'hotdog_jumbo_especial.jpeg',
                    price: 2.5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Hotdog Tropical',
                    desc:
                        'Ensalada de repollo y zanahoria, huevo sancochado, papitas fosforitos, bacon, salsas de la casa.',
                    type: 'hotdogs_jumbo',
                    pic: '',
                    price: 3,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Hotdog Premium',
                    desc:
                        'Bacon, queso mozzarella, papitas fosforito, salsas de la casa.',
                    type: 'hotdogs_jumbo',
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
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Hotdog con Chili',
                    desc: 'Carne molida, pico de gallo, bacon, queso cheddar.',
                    type: 'hotdogs_jumbo',
                    pic: 'hotdog_chili.jpeg',
                    price: 3.5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Pepito de Pollo',
                    desc:
                        'Pan de 1’ pie, lechuga, tomate, papas fritas, bacon, queso, maiz, salsas de la casa.',
                    type: 'pepitos',
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
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Pepito de Carne',
                    desc:
                        'Pan de 1’ pie, lechuga, tomate, papas fritas, bacon, queso, maíz, salsas de la casa.',
                    type: 'pepitos',
                    pic: '',
                    price: 5.75,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Pepito de Chuleta Ahumada',
                    desc:
                        'Pan de 1’ pie, lechuga, tomate, papas fritas, bacon, queso, maíz, salsas de la casa.',
                    type: 'pepitos',
                    pic: '',
                    price: 5.75,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Pepito de Combinacion',
                    desc:
                        'Pan de 1’ pie, lechuga, tomate, papas fritas, bacon, queso, maíz, salsas de la casa.',
                    type: 'pepitos',
                    pic: '',
                    price: 6.25,
                    count: 0,
                    styles: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                    sides: [],
                    options: [
                        {
                            title: 'Carne / Pollo',
                            price: 0,
                        },
                        {
                            title: 'Carne / Chuleta',
                            price: 0,
                        },
                        {
                            title: 'Pollo / Chuleta',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Pepito Triple',
                    desc:
                        'Pan de 1’ pie, Carne, pollo, chuleta, lechuga, tomate, papas fritas, bacon, queso, maíz, salsas de la casa.',
                    type: 'pepitos',
                    pic: '',
                    price: 7,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Pepito Ayala Vida',
                    desc:
                        'Pan de 2’ pie, Carne, pollo, chuleta, chorizo, lechuga, tomate, papas fritas, bacon, queso, maíz, salsas de la casa.',
                    type: 'pepitos',
                    pic: '',
                    price: 16,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Burrito de Pollo',
                    desc:
                        'Pico de gallo, maíz, queso mozzarella, salsa de la casa.',
                    type: 'burritos',
                    pic: 'burritos.jpeg',
                    price: 3,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Burrito de Carne',
                    desc: 'Pico de gallo, maíz, queso, salsa de la casa.',
                    type: 'burritos',
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
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Burrito de Combinacion',
                    desc:
                        'Pollo, carne, pico de gallo, maíz, queso mozzarella, salsa de la casa.',
                    type: 'burritos',
                    pic: '',
                    price: 4,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Combo 1',
                    desc:
                        '1 salchipapas sencillas, 2 hotdog jumbos sencillos, 2 hotdogjumbo especial, 2 sodas de lata.',
                    type: 'combos',
                    pic: '',
                    price: 12,
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
                    title: 'Combo 2',
                    desc:
                        '4 hamburguesas clásicas, 6 alitas a la BBQ / mostaza miel con papas, 1 Coca-Cola de 1.5 L',
                    type: 'combos',
                    pic: '',
                    price: 14.5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Salsa BBQ',
                            price: 0,
                        },
                        {
                            title: 'Mostaza miel',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Combo 3',
                    desc:
                        '1 Salchitortillas, 2 hotdog jumbos premium, 1 nachos, 2 sodas de lata.',
                    type: 'combos',
                    pic: '',
                    price: 14,
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
                    title: 'Combo 4',
                    desc:
                        '1 Salchitortillas, 2 hotdog jumbos premium, 1 nachos, 2 sodas de lata.',
                    type: 'combos',
                    pic: '',
                    price: 14,
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
                    title: 'Combo 5',
                    desc:
                        '6 alitas a la BBQ / mostaza miel con papas, 1 nachos, 2 hamburguesas clásicas, 2 hamburguesas garage, 1 Coca-Cola de 1.5 L',
                    type: 'combos',
                    pic: '',
                    price: 20,
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
                    defaultLat: 8.92788,
                    defaultLng: -79.726955,
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
