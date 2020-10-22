<template>
    <MainLayout :generalData="generalData" :cartSettings="cartSettings" :menu="menu"/>
</template>

<script>
import MainLayout from '@/components/wp/MainLayout'

export default {
    data() {
        return {
            generalData: {
                folder: 'purosabor',
                accentColor: 'red-6',
                subtitleColor: 'red-8',
                categories: [
                    {label: 'Entradas', value: 'entradas'},
                    {label: 'Hamburguesas', value: 'hamburguesas'},
                    {label: 'Acompañamientos', value: 'acompañamientos'},
                    {label: 'Carnes de Res', value: 'carnes_de_res'},
                    {label: 'Pollo', value: 'pollo'},
                    {label: 'Para compartir', value: 'para_compartir'},
                    {label: 'Parrilla', value: 'parrilla'},
                    {label: 'Postres', value: 'postres'},
                    {label: 'Salsas', value: 'salsas'},
                    {label: 'Bebidas', value: 'bebidas'},
                ],
                whatsappNumber: '63006365',
                wazeIntegration: false,
                googleSheets: {
                    integration: false,
                    url: 'https://script.google.com/macros/s/AKfycbzPCB7GpZlqm0iKBy8mDPpa12_QFmcTukrsPlaINRFSYjWGvfD9/exec'
                },
                emailsJs: {
                    integration: false,
                    emails: ['email@email.com']
                },
                taxes: true
            },
            menu: [
                {
                    title: 'Alitas',
                    subtitle: '',
                    desc:
                        'Alitas envueltas en nuestras salsas de la casa BBQ o Buffalo acompañadas de salsa Ranch o Blue Cheese Chunks.',
                    type: 'entradas',
                    pic: '',
                    price: 0,
                    count: 0,
                    options: [
                        {
                            title: '8 unidades',
                            price: 6.95,
                        },
                        {
                            title: '16 unidades',
                            price: 12.95,
                        },
                        {
                            title: '24 unidades',
                            price: 18.95,
                        },
                    ],
                    styles: [
                        {
                            title: 'Salsa BBQ',
                            price: 0
                        },
                        {
                            title: 'Salsa Buffalo',
                            price: 0
                        },
                    ],
                    sides: [
                        {
                            title: 'Salsa Ranch',
                            price: 0
                        },
                        {
                            title: 'Blue Cheese Chunks',
                            price: 0
                        },

                    ],
                },
                {
                    title: 'Costillitas de cerdo',
                    subtitle: '',
                    desc:
                        'Acompañadas con limoncitos o bañadas en Salsa BBQ de la casa.',
                    type: 'entradas',
                    pic: '',
                    price: 0,
                    count: 0,
                    options: [
                        {
                            title: '6 unidades',
                            price: 6,
                        },
                        {
                            title: '12 unidades',
                            price: 12,
                        },
                        {
                            title: '18 unidades',
                            price: 17,
                        },
                    ],
                    styles: [
                        {
                            title: 'Limoncitos',
                            price: 0
                        },
                        {
                            title: 'Salsa BBQ',
                            price: 0
                        },
                    ],
                    sides: [],
                },
                {
                    title: 'Pork Belly',
                    subtitle: '',
                    desc:
                        'Trocitos de piel con carne de cerdo acompañados con limon.',
                    type: 'entradas',
                    pic: '',
                    price: 6,
                    count: 0,
                    options: [
                        {
                            title: 'Regular',
                            price: 0
                        }
                    ],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'Deditos de Mozarrella',
                    subtitle: '',
                    desc:
                        '6 Unidaddes.',
                    type: 'entradas',
                    pic: '',
                    price: 5,
                    count: 0,
                    options: [
                        {
                            title: 'Regular',
                            price: 0
                        }
                    ],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'La Sensation',
                    subtitle: '',
                    desc:
                        'Rica hamburguesa de 3/4 lb de carne de res, con cebolla asada, queso amarillo, bacon y mayonesa en un pan liso. (Acompañamiento de su preferencia).',
                    type: 'hamburguesas',
                    pic: '',
                    price: 0,
                    count: 0,
                    options: [
                        {
                            title: 'Ligera',
                            price: 9.45
                        },
                        {
                            title: 'Regular',
                            price: 11.95
                        },
                    ],
                    styles: [
                        {
                            title: 'Yuca Frita',
                            price: 0
                        },
                        {
                            title: 'Patacones',
                            price: 0
                        },
                        {
                            title: 'Papas Fritas',
                            price: 0
                        },
                        {
                            title: 'Camote Frito',
                            price: 0
                        },
                        {
                            title: 'Aros de Cebolla',
                            price: 0
                        },
                    ],
                    sides: [
                        {
                            title: 'Sin extras',
                            price: 0
                        },
                        {
                            title: 'Extra queso',
                            price: 0.5
                        },
                        {
                            title: 'Extra bacon',
                            price: 1
                        },
                        {
                            title: 'Extra carne',
                            price: 2.5
                        },
                        {
                            title: 'Extra aros de cebolla',
                            price: 1.5
                        },
                    ],
                },
                {
                    title: 'La Gringa',
                    subtitle: '',
                    desc:
                        'Tipica hamburguesa americana 3/4 lb carne de res, lechuga, tomate, cebolla, queso amarillo, bacon, ketchup, mayonesa y mostaza en pan con ajonjoli negro y blanco. (Acompañamiento de su preferencia).',
                    type: 'hamburguesas',
                    pic: '',
                    price: 0,
                    count: 0,
                    options: [
                        {
                            title: 'Ligera',
                            price: 8.95
                        },
                        {
                            title: 'Regular',
                            price: 10.95
                        },
                    ],
                    styles: [
                        {
                            title: 'Yuca Frita',
                            price: 0
                        },
                        {
                            title: 'Patacones',
                            price: 0
                        },
                        {
                            title: 'Papas Fritas',
                            price: 0
                        },
                        {
                            title: 'Camote Frito',
                            price: 0
                        },
                        {
                            title: 'Aros de Cebolla',
                            price: 0
                        },
                    ],
                    sides: [
                        {
                            title: 'Sin extras',
                            price: 0
                        },
                        {
                            title: 'Extra queso',
                            price: 0.5
                        },
                        {
                            title: 'Extra bacon',
                            price: 1
                        },
                        {
                            title: 'Extra carne',
                            price: 2.5
                        },
                        {
                            title: 'Extra aros de cebolla',
                            price: 1.5
                        },
                    ],
                },
                {
                    title: 'La Niña de los Anillos',
                    subtitle: '',
                    desc:
                        'Deliciosa hamburguesa de 3/4 lb carne de res, lechuga, tomate, queso amarillo, anillos de cebolla bañados en salsa de ajo, en pan con ajonjoli negro y blanco. (Acompañamiento de su preferencia).',
                    type: 'hamburguesas',
                    pic: '',
                    price: 0,
                    count: 0,
                    options: [
                        {
                            title: 'Ligera',
                            price: 9.95
                        },
                        {
                            title: 'Regular',
                            price: 11.95
                        },
                    ],
                    styles: [
                        {
                            title: 'Yuca Frita',
                            price: 0
                        },
                        {
                            title: 'Patacones',
                            price: 0
                        },
                        {
                            title: 'Papas Fritas',
                            price: 0
                        },
                        {
                            title: 'Camote Frito',
                            price: 0
                        },
                        {
                            title: 'Aros de Cebolla',
                            price: 0
                        },
                    ],
                    sides: [
                        {
                            title: 'Sin extras',
                            price: 0
                        },
                        {
                            title: 'Extra queso',
                            price: 0.5
                        },
                        {
                            title: 'Extra bacon',
                            price: 1
                        },
                        {
                            title: 'Extra carne',
                            price: 2.5
                        },
                        {
                            title: 'Extra aros de cebolla',
                            price: 1.5
                        },
                    ],
                },
                {
                    title: 'La Cheese Burger',
                    subtitle: '',
                    desc:
                        'Clasico de clasicos. 3/4 lb de carne de res, con abundante queso amarillo, cebollas y pepinillos. Todo en nuestro pan que ya conoces, con la salsa mas conocida a nivel mundial, Ketchup. (Acompañamiento de su preferencia).',
                    type: 'hamburguesas',
                    pic: '',
                    price: 0,
                    count: 0,
                    options: [
                        {
                            title: 'Ligera',
                            price: 9.45
                        },
                        {
                            title: 'Regular',
                            price: 11.45
                        },
                    ],
                    styles: [
                        {
                            title: 'Yuca Frita',
                            price: 0
                        },
                        {
                            title: 'Patacones',
                            price: 0
                        },
                        {
                            title: 'Papas Fritas',
                            price: 0
                        },
                        {
                            title: 'Camote Frito',
                            price: 0
                        },
                        {
                            title: 'Aros de Cebolla',
                            price: 0
                        },
                    ],
                    sides: [
                        {
                            title: 'Sin extras',
                            price: 0
                        },
                        {
                            title: 'Extra queso',
                            price: 0.5
                        },
                        {
                            title: 'Extra bacon',
                            price: 1
                        },
                        {
                            title: 'Extra carne',
                            price: 2.5
                        },
                        {
                            title: 'Extra aros de cebolla',
                            price: 1.5
                        },
                    ],
                },
                {
                    title: 'La Inolvidable',
                    subtitle: '',
                    desc:
                        '3/4 lb carne de res con queso gouda, sobre parn artesanal y su deliciosa crema de pistacho y pancetta troceada finalizando con un remolino de cebollas fritas bañadas en jalea de tomates deshidratados. (Acompañamiento de su preferencia).',
                    type: 'hamburguesas',
                    pic: '',
                    price: 0,
                    count: 0,
                    options: [
                        {
                            title: 'Ligera',
                            price: 10.65
                        },
                        {
                            title: 'Regular',
                            price: 13.95
                        },
                    ],
                    styles: [
                        {
                            title: 'Yuca Frita',
                            price: 0
                        },
                        {
                            title: 'Patacones',
                            price: 0
                        },
                        {
                            title: 'Papas Fritas',
                            price: 0
                        },
                        {
                            title: 'Camote Frito',
                            price: 0
                        },
                        {
                            title: 'Aros de Cebolla',
                            price: 0
                        },
                    ],
                    sides: [
                        {
                            title: 'Sin extras',
                            price: 0
                        },
                        {
                            title: 'Extra queso',
                            price: 0.5
                        },
                        {
                            title: 'Extra bacon',
                            price: 1
                        },
                        {
                            title: 'Extra carne',
                            price: 2.5
                        },
                        {
                            title: 'Extra aros de cebolla',
                            price: 1.5
                        },
                    ],
                },
                {
                    title: 'Acompañamientos adicionales',
                    subtitle: '',
                    desc:
                        'Yuca frita, patacones, papas fritas, camote frito, aros de cebolla',
                    type: 'acompañamientos',
                    pic: '',
                    price: 0,
                    count: 0,
                    options: [
                        {
                            title: 'Yuca Frita',
                            price: 2.5
                        },
                        {
                            title: 'Patacones',
                            price: 2.5
                        },
                        {
                            title: 'Papas Fritas',
                            price: 2.5
                        },
                        {
                            title: 'Camote Frito',
                            price: 2.5
                        },
                        {
                            title: 'Aros de Cebolla',
                            price: 3
                        },
                    ],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'Brocheta de Res',
                    subtitle: '',
                    desc:
                        'Pincho de filete de res, con pimientos y cebolla asada, a la parrilla. (Acompañamiento de su preferencia).',
                    type: 'carnes_de_res',
                    pic: '',
                    price: 10.45,
                    count: 0,
                    options: [
                        {
                            title: 'Yuca Frita',
                            price: 0
                        },
                        {
                            title: 'Patacones',
                            price: 0
                        },
                        {
                            title: 'Papas Fritas',
                            price: 0
                        },
                        {
                            title: 'Camote Frito',
                            price: 0
                        },
                        {
                            title: 'Aros de Cebolla',
                            price: 0
                        },
                    ],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'Filete de Res',
                    subtitle: '',
                    desc:
                        'Tierno y jugoso filete de res de 12oz a la parrilla bañado con chimichurri artesanal de la casa. (Acompañamiento de su preferencia).',
                    type: 'carnes_de_res',
                    pic: '',
                    price: 15.95,
                    count: 0,
                    options: [
                        {
                            title: 'Yuca Frita',
                            price: 0
                        },
                        {
                            title: 'Patacones',
                            price: 0
                        },
                        {
                            title: 'Papas Fritas',
                            price: 0
                        },
                        {
                            title: 'Camote Frito',
                            price: 0
                        },
                        {
                            title: 'Aros de Cebolla',
                            price: 0
                        },
                    ],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'Brocheta de Pollo',
                    subtitle: '',
                    desc:
                        'Una rica mezcla de pollo, pimientos y cebolla a la parrilla en un pincho. (Acompañamiento de su preferencia).',
                    type: 'pollo',
                    pic: '',
                    price: 8.45,
                    count: 0,
                    options: [
                        {
                            title: 'Yuca Frita',
                            price: 0
                        },
                        {
                            title: 'Patacones',
                            price: 0
                        },
                        {
                            title: 'Papas Fritas',
                            price: 0
                        },
                        {
                            title: 'Camote Frito',
                            price: 0
                        },
                        {
                            title: 'Aros de Cebolla',
                            price: 0
                        },
                    ],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'Filete de Pollo',
                    subtitle: '',
                    desc:
                        'Jugosa pechuga de pollo cocida a la parrilla, bañada con salsa BBQ o chimichurri de la casa. (Acompañamiento de su preferencia).',
                    type: 'pollo',
                    pic: '',
                    price: 10.95,
                    count: 0,
                    options: [
                        {
                            title: 'Yuca Frita',
                            price: 0
                        },
                        {
                            title: 'Patacones',
                            price: 0
                        },
                        {
                            title: 'Papas Fritas',
                            price: 0
                        },
                        {
                            title: 'Camote Frito',
                            price: 0
                        },
                        {
                            title: 'Aros de Cebolla',
                            price: 0
                        },
                    ],
                    styles: [
                        {
                            title: 'Salsa BBQ',
                            price: 0
                        },
                        {
                            title: 'Chimichurri',
                            price: 0
                        },
                    ],
                    sides: [],
                },
                {
                    title: 'Chicken Fingers',
                    subtitle: '',
                    desc:
                        'Disfrutalos con la salsa de tu preferencia. (Acompañamiento de su preferencia).',
                    type: 'pollo',
                    pic: '',
                    price: 7.95,
                    count: 0,
                    options: [
                        {
                            title: 'Yuca Frita',
                            price: 0
                        },
                        {
                            title: 'Patacones',
                            price: 0
                        },
                        {
                            title: 'Papas Fritas',
                            price: 0
                        },
                        {
                            title: 'Camote Frito',
                            price: 0
                        },
                        {
                            title: 'Aros de Cebolla',
                            price: 0
                        },
                    ],
                    styles: [
                        {
                            title: 'Ajo',
                            price: 0
                        },
                        {
                            title: 'BBQ',
                            price: 0
                        },
                        {
                            title: 'Ranch',
                            price: 0
                        },
                        {
                            title: 'Bufalo',
                            price: 0
                        },
                        {
                            title: 'Pistacho',
                            price: 0
                        },
                        {
                            title: 'Honey Mustard',
                            price: 0
                        },
                        {
                            title: 'Blue Cheese',
                            price: 0
                        },
                        {
                            title: 'Chimichurri',
                            price: 0
                        },
                        {
                            title: 'Tomate Deshidratado',
                            price: 0
                        },
                    ],
                    sides: [],
                },
                {
                    title: 'Sampler Chiricano',
                    subtitle: '',
                    desc:
                        'Conjunto de 5 alitas Bufalo, 5 alitas BBQ y 6 costillitas de cerdo. Acompañados con patacones y papas fritas espolvoreadas con rub de la casa.',
                    type: 'para_compartir',
                    pic: '',
                    price: 18.95,
                    count: 0,
                    options: [
                        {
                            title: 'Regular',
                            price: 0
                        },
                    ],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'Parrillita Mixta',
                    subtitle: '',
                    desc:
                        'Filete de res, pechuga de pollo, mazorca y chorizo de cerdo artesanal. Todo a la parrilla con el toque de Puro Sabor. (Acompañamiento de su preferencia).',
                    type: 'parrilla',
                    pic: '',
                    price: 16.45,
                    count: 0,
                    options: [
                        {
                            title: 'Yuca Frita',
                            price: 0
                        },
                        {
                            title: 'Patacones',
                            price: 0
                        },
                        {
                            title: 'Papas Fritas',
                            price: 0
                        },
                        {
                            title: 'Camote Frito',
                            price: 0
                        },
                        {
                            title: 'Aros de Cebolla',
                            price: 0
                        },
                    ],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'Flan de la casa',
                    subtitle: '',
                    desc:
                        '',
                    type: 'postres',
                    pic: '',
                    price: 4.50,
                    count: 0,
                    options: [
                        {
                            title: 'Regular',
                            price: 0
                        },
                    ],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'Salsas adicionales',
                    subtitle: '',
                    desc:
                        '',
                    type: 'salsas',
                    pic: '',
                    price: 0,
                    count: 0,
                    options: [
                        {
                            title: 'Ajo',
                            price: 1
                        },
                        {
                            title: 'BBQ',
                            price: 0.75
                        },
                        {
                            title: 'Ranch',
                            price: 0.75
                        },
                        {
                            title: 'Bufalo',
                            price: 1
                        },
                        {
                            title: 'Pistacho',
                            price: 1.25
                        },
                        {
                            title: 'Honey Mustard',
                            price: 1
                        },
                        {
                            title: 'Blue Cheese',
                            price: 1.25
                        },
                        {
                            title: 'Chimichurri',
                            price: 1
                        },
                        {
                            title: 'Tomate Deshidratado',
                            price: 1.25
                        },
                    ],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'Bebidas',
                    subtitle: '',
                    desc:
                        'Agua, soda, te frio, malteada de vainilla.',
                    type: 'bebidas',
                    pic: '',
                    price: 0,
                    count: 0,
                    options: [
                        {
                            title: 'Agua',
                            price: 1.5
                        },
                        {
                            title: 'Soda',
                            price: 1.5
                        },
                        {
                            title: 'Te Frio',
                            price: 1.5
                        },
                        {
                            title: 'Malteada de vainilla',
                            price: 4.5
                        },
                    ],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'Licuados',
                    subtitle: '',
                    desc:
                        'Fresa, melon, papaya, piña, ponche de frutas.',
                    type: 'bebidas',
                    pic: '',
                    price: 3,
                    count: 0,
                    options: [
                        {
                            title: 'Fresa',
                            price: 0
                        },
                        {
                            title: 'Melon',
                            price: 0
                        },
                        {
                            title: 'Papaya',
                            price: 0
                        },
                        {
                            title: 'Piña',
                            price: 0
                        },
                         {
                            title: 'Ponche de frutas',
                            price: 0
                        },
                    ],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'Batidos',
                    subtitle: '',
                    desc:
                        'Fresa, melon, papaya, piña, ponche de frutas.',
                    type: 'bebidas',
                    pic: '',
                    price: 3.75,
                    count: 0,
                    options: [
                        {
                            title: 'Fresa',
                            price: 0
                        },
                        {
                            title: 'Melon',
                            price: 0
                        },
                        {
                            title: 'Papaya',
                            price: 0
                        },
                        {
                            title: 'Piña',
                            price: 0
                        },
                         {
                            title: 'Ponche de frutas',
                            price: 0
                        },
                    ],
                    styles: [],
                    sides: [],
                },
            ],
            cartSettings: {
                locationDefaults: {
                    defaultLat: 8.440701,
                    defaultLng: -82.425004,
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
