<template>
    <MainLayout :generalData="generalData" :cartSettings="cartSettings" :menu="menu"/>
</template>

<script>
import MainLayout from '@/components/wp/MainLayout'

export default {
    data() {
        return {
            generalData: {
                folder: 'saboresderante',
                accentColor: 'orange-9',
                subtitleColor: 'green-8',
                categories: [
                    {label: 'Entradas', value: 'entradas'},
                    {label: 'Platos Fuertes', value: 'platos_fuertes'},
                    {label: 'Extras', value: 'extras'},
                    {label: 'Postres', value: 'postres'}
                ],
                whatsappNumber: '62384511',
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
                    title: 'Torrejitas de Bacalao',
                    subtitle: '',
                    desc: '',
                    type: 'entradas',
                    pic: '',
                    price: 3,
                    count: 0,
                    options: [{title: 'Regular', price: 0}],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'Sous de la casa',
                    subtitle: '',
                    desc: '',
                    type: 'entradas',
                    pic: '',
                    price: 2.75,
                    count: 0,
                    options: [{title: 'Regular', price: 0}],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'Wicked Wings',
                    subtitle: '',
                    desc: 'Elija entre 6 o 12 unidades de alitas.',
                    type: 'entradas',
                    pic: '',
                    price: 0,
                    count: 0,
                    options: [
                        {title: '6 Unidades', price: 6},
                        {title: '12 unidades', price: 10},
                    ],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'Choripan',
                    subtitle: '',
                    desc: '',
                    type: 'entradas',
                    pic: '',
                    price: 3,
                    count: 0,
                    options: [{title: 'Regular', price: 0}],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'Choripan Rante',
                    subtitle: '',
                    desc: 'Choripan con chorizo tableño',
                    type: 'entradas',
                    pic: '',
                    price: 3.5,
                    count: 0,
                    options: [{title: 'Regular', price: 0}],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'Filete de pescado',
                    subtitle: '',
                    desc:
                        'Acompañado de arroz con coco, ensalada y platano en tentacion.',
                    type: 'platos_fuertes',
                    pic: '',
                    price: 7.5,
                    count: 0,
                    options: [{title: 'Regular', price: 0}],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'Pescado al Escabeche',
                    subtitle: '',
                    desc:
                        'Acompañado de arroz con coco, ensalada y platano en tentacion.',
                    type: 'platos_fuertes',
                    pic: '',
                    price: 8.5,
                    count: 0,
                    options: [{title: 'Regular', price: 0}],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'One Pot',
                    subtitle: '',
                    desc:
                        'Arroz con coco, rabitos, camarones secos, y Bacalao. Acompañado de arroz con coco, ensalada y platano en tentacion.',
                    type: 'platos_fuertes',
                    pic: '',
                    price: 9.5,
                    count: 0,
                    options: [{title: 'Regular', price: 0}],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'Pollo al Curry en salsa de coco',
                    subtitle: '',
                    desc:
                        'Acompañado de arroz con coco, ensalada y platano en tentacion.',
                    type: 'platos_fuertes',
                    pic: '',
                    price: 6.5,
                    count: 0,
                    options: [{title: 'Regular', price: 0}],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'Langostinos al ajillo',
                    subtitle: "Especialidades D'Rante",
                    desc:
                        'Acompañado de arroz con coco, ensalada y platano en tentacion.',
                    type: 'platos_fuertes',
                    pic: '',
                    price: 12,
                    count: 0,
                    options: [{title: 'Regular', price: 0}],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'Pulpo Pacifico',
                    subtitle: "Especialidades D'Rante",
                    desc:
                        'Acompañado de arroz con coco, ensalada y platano en tentacion.',
                    type: 'platos_fuertes',
                    pic: '',
                    price: 12,
                    count: 0,
                    options: [{title: 'Regular', price: 0}],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'Acompañamiento extra',
                    subtitle: '',
                    desc:
                        'Elija entre arroz con coco, arroz con cilantro, yuca al mojo, ensalada de colslaw o platano ententacion.',
                    type: 'extras',
                    pic: '',
                    price: 0,
                    count: 0,
                    options: [
                        {title: 'Arroz con coco', price: 1.5},
                        {title: 'Arroz con cilantro', price: 1.5},
                        {title: 'Yuca al mojo', price: 1.25},
                        {title: 'Ensalada de colslaw', price: 1.5},
                        {title: 'Platano en tentacion', price: 1.5},
                    ],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'Flan de la casa',
                    subtitle: '',
                    desc: '',
                    type: 'postres',
                    pic: '',
                    price: 2.5,
                    count: 0,
                    options: [{title: 'Regular', price: 0}],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'Pie de limon',
                    subtitle: '',
                    desc: '',
                    type: 'postres',
                    pic: '',
                    price: 3,
                    count: 0,
                    options: [{title: 'Regular', price: 0}],
                    styles: [],
                    sides: [],
                },
                {
                    title: 'Tres Leches',
                    subtitle: '',
                    desc: '',
                    type: 'postres',
                    pic: '',
                    price: 3,
                    count: 0,
                    options: [{title: 'Regular', price: 0}],
                    styles: [],
                    sides: [],
                },
            ],
            cartSettings: {
                locationDefaults: {
                    defaultLat: 8.951266,
                    defaultLng: -79.527558,
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
                            {label: 'Efectivo', value: 'Efectivo'}
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
