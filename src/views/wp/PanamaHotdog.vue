<template>
    <q-page class>
        <q-img :src="require('@/assets/wp/panamahotdog/logo.jpg')" />
        <div class="q-pa-md">
            <div class="text-h5 text-center q-mt-sm q-mb-lg poppins-bold">
                REALIZA TU PEDIDO
            </div>

            <!-- MENU ITEMS -->
            <div class="row q-mb-xl" v-for="(item, i) in menu" :key="i">
                <div class="col-4">
                    <q-img
                        class="rounded-borders q-mb-md"
                        :src="require(`@/assets/wp/panamahotdog/${item.pic}`)"
                        v-if="item.pic != null"
                    />
                </div>
                <div class="col q-px-md">
                    <div class="text-h5 q-mb-sm poppins-bold">
                        {{ item.title }}
                    </div>
                    <div class="text-body2 q-mb-sm poppins-regular">
                        {{ item.desc }}
                    </div>
                    <div
                        class="text-h6 q-mb-md poppins-bold"
                        v-if="item.price != null"
                    >
                        $ {{ item.price.toFixed(2) }}
                    </div>
                    <q-btn
                        color="amber-13"
                        text-color="black"
                        class="poppins-bold full-width"
                        @click="selectItem(i)"
                        >Agregar</q-btn
                    >
                </div>
            </div>
            <!-- END MENU ITEMS -->

            <!-- GOOGLE MAP -->
            <div>
                <div class="text-h6 q-mb-md poppins-bold">
                    Ubicacion de entrega
                </div>
                <GoogleMaps
                    v-if="Object.keys(center).length > 0"
                    @markerPosition="setMarkerPosition"
                    :editable="true"
                    :markers="markers"
                    :mapCenter="center"
                ></GoogleMaps>
            </div>
            <!-- END GOOGLE MAP -->

            <!-- ADDRESS INPUT -->
            <div class="row q-my-lg">
                <div class="text-h6 q-mb-md poppins-bold">
                    Direccion panameña
                </div>
                <q-input
                    v-model="address"
                    filled
                    type="textarea"
                    class="full-width poppins-regular"
                    placeholder="Brisas, calle 15, casa 2b, color crema, diagonal al palo de mango"
                    color="amber-13"
                    rows="4"
                />
            </div>
            <!-- END ADDRESS INPUT -->

            <!-- PAYMENT METHOD RADIOS -->
            <div class="row q-mb-lg">
                <div class="text-h6 q-mb-sm poppins-bold">Metodo de pago:</div>
                <q-option-group
                    :options="paymentMethods"
                    type="radio"
                    v-model="selectedPaymentMethod"
                    class="full-width poppins-regular"
                    color="amber-13"
                    size="md"
                />
            </div>
            <!-- END PAYMENT METHOD RADIOS -->

            <hr dark />

            <!-- TOTAL TO PAY -->
            <div class="row q-my-lg">
                <div class="col">
                    <div class="text-h5 text-right poppins-bold">
                        Total: $ {{ total.toFixed(2) }}
                    </div>
                </div>
            </div>
            <!-- END TOTAL TO PAY -->

            <!-- VIEW CART BUTTON -->
            <div class="row q-mb-md">
                <q-btn
                    color="green-7"
                    class="full-width poppins-bold"
                    @click="cartDialog = true"
                    >Ver carrito</q-btn
                >
            </div>
            <!-- END VIEW CART BUTTON -->

            <!-- OPTIONS DIALOG -->
            <q-dialog v-model="optionsDialog">
                <q-card style="width: 700px; max-width: 80vw;">
                    <q-card-section>
                        <div class="text-h6 text-center poppins-bold">
                            ELIJA
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <q-btn
                            color="green-7"
                            class="poppins-bold full-width q-mb-md"
                            v-for="(option, i) in menu[selectedItemIndex]
                                .options"
                            :key="i"
                            @click="addItemToCart(option)"
                        >
                            {{ option.title }}
                            <br />
                            {{
                                option.price > 0
                                    ? '$' + option.price.toFixed(2)
                                    : ''
                            }}
                        </q-btn>
                        <q-btn
                            color="red-7"
                            class="poppins-bold full-width q-mb-md"
                            @click="optionsDialog = false"
                            >Cancelar</q-btn
                        >
                    </q-card-section>
                </q-card>
            </q-dialog>
            <!-- END OPTIONS DIALOG -->

            <!-- SUCCESS DIALOG -->
            <q-dialog v-model="successDialog">
                <q-card style="width: 700px; max-width: 80vw;">
                    <q-card-section>
                        <div class="text-h6 text-center poppins-bold">
                            Agregado con exito
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <q-btn
                            color="green-7"
                            class="poppins-bold full-width q-mb-md"
                            @click="successDialog = false"
                            >Aceptar</q-btn
                        >
                    </q-card-section>
                </q-card>
            </q-dialog>
            <!-- END SUCCESS DIALOG -->

            <!-- CART DIALOG -->
            <q-dialog v-model="cartDialog">
                <q-card
                    style="width: 700px; max-width: 80vw;"
                    v-if="cart.length > 0"
                >
                    <q-card-section>
                        <div class="text-h6 text-center poppins-bold">
                            Detalle de pedido
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <div
                            class="row q-mb-md"
                            v-for="(item, i) in cart"
                            :key="i"
                        >
                            <div class="col-2">
                                <q-btn
                                    color="red-7"
                                    size="sm"
                                    @click="removeItemFromCart(i)"
                                >
                                    <i class="fas fa-times"></i>
                                </q-btn>
                            </div>

                            <div class="col">
                                <div class="text-body2 q-pl-sm poppins-regular">
                                    <strong v-if="item.type == 'main'"
                                        >({{ item.amount }}) {{ item.title }} -
                                        {{ item.options.title }}</strong
                                    >
                                    <strong v-if="item.type == 'extras'"
                                        >({{ item.amount }}) Extra -
                                        {{ item.options.title }}</strong
                                    >
                                    <strong v-if="item.type == 'drinks'"
                                        >({{ item.amount }}) Bebida -
                                        {{ item.options.title }}</strong
                                    >
                                </div>
                            </div>
                        </div>
                    </q-card-section>
                    <hr />
                    <q-card-section>
                        <div class="text-body2 poppins-regular">
                            <strong>Direccion de entrega:</strong>
                            {{ address }}
                        </div>
                        <div class="text-body2 poppins-regular">
                            <strong>Metodo de pago:</strong>
                            {{ selectedPaymentMethod }}
                        </div>
                        <br />
                        <div
                            class="text-body2 text-center poppins-regular"
                            v-if="selectedPaymentMethod == 'Yappy'"
                        >
                            Recuerda enviar el comprobante de pago a nuestro
                            Whatsapp.
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <q-btn
                            color="green-7"
                            class="full-width q-mb-md poppins-bold"
                            @click="sendChat"
                            >Enviar</q-btn
                        >
                        <q-btn
                            color="red-7"
                            class="full-width q-mb-md poppins-bold"
                            @click="cartDialog = false"
                            >Cancelar</q-btn
                        >
                    </q-card-section>
                </q-card>
                <q-card style="width: 700px; max-width: 80vw;" v-else>
                    <q-card-section>
                        <div class="text-h6 text-center poppins-bold">
                            Primero debes agregar algo a tu pedido.
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <q-btn
                            color="green-7"
                            class="poppins-bold full-width q-mb-md"
                            @click="cartDialog = false"
                            >Aceptar</q-btn
                        >
                    </q-card-section>
                </q-card>
            </q-dialog>
            <!-- END CART DIALOG -->
        </div>
    </q-page>
</template>

<script>
import GoogleMaps from '../../components/general/GoogleMaps'
export default {
    data() {
        return {
            selectedItemIndex: 0,
            whatsappNumber: '62042578',
            selectedItem: {},
            paymentMethods: [
                {label: 'Yappy', value: 'Yappy'},
                {label: 'Efectivo', value: 'Efectivo'},
            ],
            selectedPaymentMethod: null,
            address: '',
            total: 0,
            location: [],
            markers: [],
            center: {},
            optionsDialog: false,
            successDialog: false,
            cartDialog: false,
            cart: [],
            menu: [
                {
                    title: 'Hotdog Hawaiiano',
                    desc:
                        'Ketchup, mayonesa, queso blanco rayado, papitas trituradas y jalea de piña.',
                    type: 'main',
                    pic: 'empty.png',
                    price: 2,
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
                    pic: 'empty.png',
                    price: 2,
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
                    pic: 'empty.png',
                    price: 2.5,
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
                    pic: 'empty.png',
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
                    pic: 'revoltosa.jpeg',
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
                    ],
                },
                {
                    title: 'Hamburguesa de carne',
                    desc:
                        'Ketchup, mayonesa, lechuga, tomate, queso amarillo fundido, carne de res 8oz.',
                    type: 'main',
                    pic: 'empty.png',
                    price: 4,
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
                    pic: 'empty.png',
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
                    title: 'Arepa de pollo',
                    desc:
                        'Tender de pechuga de pollo, queso blanco, salsa tartara, chicharrón.',
                    type: 'main',
                    pic: 'empty.png',
                    price: 4,
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Arepa de carne desmechada',
                    desc:
                        'Carne desmechada, queso blanco, salsa tartara, chicharrón.',
                    type: 'main',
                    pic: 'arepa_carne_mechada.jpeg',
                    price: 4,
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Arepa Mixta',
                    desc:
                        'Pollo, carne, chorizo, queso blanco, salsa tartara, chicharrón.',
                    type: 'main',
                    pic: 'empty.png',
                    price: 4,
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Burrito de carne',
                    desc:
                        'Carne molida, queso amarillo, mayonesa, pico de gallo.',
                    type: 'main',
                    pic: 'empty.png',
                    price: 4,
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Burrito de pollo',
                    desc:
                        'Pechuga de pollo apanada, pico de gallo, queso amarillo fundido, ketchup, mayonesa.',
                    type: 'main',
                    pic: 'empty.png',
                    price: 4,
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Burrito mixto',
                    desc:
                        'Ketchup, mayonesa, pico de gallo, carne molida, pollo, queso amarillo fundido.',
                    type: 'main',
                    pic: 'empty.png',
                    price: 5,
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Club sandwich con papas',
                    desc: '',
                    type: 'main',
                    pic: 'club_sandwich.jpeg',
                    price: 6,
                    options: [
                        {
                            title: 'Regular',
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
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Empanadas',
                    desc: '',
                    type: 'main',
                    pic: 'empty.png',
                    price: 2,
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
                    title: 'Empanadas venezolanas',
                    desc: '',
                    type: 'main',
                    pic: 'empty.png',
                    price: 2,
                    options: [
                        {
                            title: 'Carne',
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
                    pic: 'empty.png',
                    price: 1.5,
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Soda',
                    desc: 'Coca Cola, Ginger ale, Squirt',
                    type: 'main',
                    pic: 'soda.jpg',
                    price: 1,
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
                            title: 'Dr. Peper',
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
                        {
                            title: 'Suerte',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Jugo',
                    desc: 'Naranja, Piña, etc.',
                    type: 'main',
                    pic: 'jugos.jpg',
                    price: 1,
                    options: [
                        {
                            title: 'Naranja',
                            price: 0,
                        },
                        {
                            title: 'Piña',
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
                    options: [
                        {
                            title: 'Botella 600ml',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Batido',
                    desc: 'Batidos de fresa, maracuya, papaya, etc.',
                    type: 'main',
                    pic: 'batido.jpeg',
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
                            title: 'Cornflakes',
                            price: 2.5,
                        },
                    ],
                },
                {
                    title: 'Limonada con hierbabuena',
                    desc: '',
                    type: 'main',
                    pic: 'empty.png',
                    price: 2,
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Pescado con patacones',
                    desc: '',
                    type: 'main',
                    pic: 'filete_de_pescado.jpeg',
                    price: 10,
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Saus',
                    desc: '',
                    type: 'main',
                    price: 2,
                    pic: 'saus.jpeg',
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Ceviche',
                    desc: '',
                    type: 'main',
                    pic: 'ceviche.jpeg',
                    options: [
                        {
                            title: 'Tradicional',
                            price: 2.5,
                        },
                        {
                            title: 'Gourmet',
                            price: 3,
                        },
                    ],
                },
            ],
        }
    },
    methods: {
        selectItem(index) {
            this.selectedItemIndex = index
            this.selectedItem = Object.assign({}, this.menu[index])
            this.optionsDialog = true
        },
        checkIfDuplicate() {
            let isDuplicate = false
            if (this.cart.length <= 0) {
                isDuplicate = false
            }

            this.cart.forEach(c => {
                if (
                    c.type === this.selectedItem.type &&
                    c.title === this.selectedItem.title &&
                    c.options.title === this.selectedItem.options.title
                ) {
                    isDuplicate = true
                }
            })

            return isDuplicate
        },
        addItemToCart(option) {
            this.selectedItem.options = option
            if (!this.checkIfDuplicate()) {
                this.selectedItem.amount = 1
                this.cart.push(this.selectedItem)
                this.optionsDialog = false
                this.successDialog = true
                this.calculateTotal()
            } else {
                this.cart.forEach(c => {
                    if (
                        c.type === this.selectedItem.type &&
                        c.title === this.selectedItem.title &&
                        c.options.title === this.selectedItem.options.title
                    ) {
                        c.amount++
                    }
                })
                this.optionsDialog = false
                this.successDialog = true
                this.calculateTotal()
            }
        },
        removeItemFromCart(i) {
            this.cart.splice(i, 1)
        },
        calculateTotal() {
            let total = 0
            this.cart.forEach(c => {
                if (c.price) total += c.price * c.amount
                total += c.options.price * c.amount
            })
            this.total = total
        },
        generateMessage() {
            let message =
                'Buenas, me gustaria realizar un pedido de:%0D%0A%0D%0A'
            for (let item of this.cart) {
                message += `- (${item.amount}) ${item.title} - ${item.options.title}%0D%0A`
            }
            message += `%0D%0AUbicacion: ${this.getLocationForMessage()}%0D%0ADireccion panameña: ${
                this.address
            }%0D%0AMetodo de pago: ${
                this.selectedPaymentMethod
            }%0D%0ATotal: $ ${this.total.toFixed(2)}`
            message = message.replace(/\+/g, '%2B')
            message = message.replace(/&/g, '%26')
            message = message.replace(/#/g, '%23')
            return message
        },
        sendChat() {
            if (this.address == '') {
                alert(
                    'Debes ingresar tu direccion completa para la entrega de tu pedido.'
                )
                return
            }
            if (this.selectedPaymentMethod == null) {
                alert('Debes seleccionar un metodo de pago.')
                return
            } else {
                window.location.href = `https://wa.me/507${
                    this.whatsappNumber
                }?text=${this.generateMessage()}`
            }
        },
        getLocationForMessage() {
            if (this.location.length <= 0) {
                let lat = parseFloat(this.center.lat)
                let lng = parseFloat(this.center.lng)
                if (lat < 0) lat = `+${lat}`
                if (lng < 0) lng = `+${lng}`
                return `https://www.google.com/maps?q=${lat},${lng}`
            } else {
                let lat = parseFloat(this.location.lat)
                let lng = parseFloat(this.location.lng)
                if (lat < 0) lat = `+${lat}`
                if (lng < 0) lng = `+${lng}`
                return `https://www.google.com/maps?q=${lat},${lng}`
            }
        },
        setMarkerPosition(event) {
            this.location = event
        },
        geolocate() {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.center = {
                        lat: parseFloat(position.coords.latitude),
                        lng: parseFloat(position.coords.longitude),
                    }
                    this.markers.push({position: this.center})
                },
                error => {
                    this.center = {
                        lat: parseFloat(9.068463),
                        lng: parseFloat(-79.452694),
                    }
                    this.markers.push({position: this.center})
                }
            )
        },
    },
    mounted() {
        this.geolocate()
    },
    components: {
        GoogleMaps,
    },
    watch: {
        selectedArea: function() {
            this.cart = []
            this.calculateTotal()
        },
        cart: function() {
            this.calculateTotal()
        },
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

.poppins-regular {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
}

.poppins-bold {
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
}
</style>
