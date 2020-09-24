<template>
    <q-page class="bg-grey-2">
        <q-img
            :src="require('@/assets/wp/lavillafood/logo.jpg')"
            class="shadow-7"
        />
        <div class="q-pa-md">
            <div class="text-h5 text-center q-mt-sm q-mb-lg poppins-bold">
                REALIZA TU PEDIDO
            </div>

            <!-- MENU ITEMS -->
            <q-card
                class="full-width q-mb-lg"
                v-for="(item, i) in menu"
                :key="i"
            >
                <q-img
                    v-if="item.pic"
                    :src="require(`@/assets/wp/lavillafood/${item.pic}`)"
                />
                <q-card-section class="q-pb-none">
                    <div class="row">
                        <div
                            class="text-subtitle2 poppins-bold text-red-8 full-width"
                            v-if="item.subtitle != null"
                        >
                            {{ item.subtitle }}
                        </div>
                        <div class="text-h6">{{ item.title }}</div>
                    </div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div v-if="item.price" class="text-h6 poppins-bold">
                        $ {{ item.price.toFixed(2) }}
                    </div>
                    <div class="text-caption text-grey">{{ item.desc }}</div>
                </q-card-section>

                <q-separator />

                <q-card-actions>
                    <q-space />
                    <q-btn
                        flat
                        color="pink"
                        @click="selectItem(i)"
                        :disable="isWeekendItem(item)"
                        >Agregar</q-btn
                    >
                </q-card-actions>
            </q-card>
            <!-- END MENU ITEMS -->

            <!-- STYLES DIALOG -->
            <q-dialog v-model="stylesDialog">
                <q-card style="width: 700px; max-width: 80vw" class="bg-grey-2">
                    <q-card-section class="q-py-sm">
                        <div class="text-h6 text-center poppins-bold">
                            ESTILO
                        </div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                        <q-btn
                            text-color="black"
                            outline
                            class="poppins-bold full-width q-mb-md"
                            v-for="(style, i) in menu[selectedItemIndex].styles"
                            :key="i"
                            @click="addItemToCart('style', style)"
                        >
                            {{ style.title }}
                            <br />
                            {{
                                style.price > 0
                                    ? '$' + style.price.toFixed(2)
                                    : ''
                            }}
                        </q-btn>
                        <q-btn
                            color="red-7"
                            flat
                            class="poppins-bold full-width q-mb-md"
                            @click="stylesDialog = false"
                            >Cancelar</q-btn
                        >
                    </q-card-section>
                </q-card>
            </q-dialog>
            <!-- END STYLES DIALOG -->

            <!-- OPTIONS DIALOG -->
            <q-dialog v-model="optionsDialog">
                <q-card style="width: 700px; max-width: 80vw" class="bg-grey-2">
                    <q-card-section class="q-py-sm">
                        <div class="text-h6 text-center poppins-bold">
                            ELIJA
                        </div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                        <q-btn
                            text-color="pink"
                            outline
                            class="poppins-bold full-width q-mb-md"
                            v-for="(option, i) in menu[selectedItemIndex]
                                .options"
                            :key="i"
                            @click="addItemToCart('option', option)"
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
                            color="black"
                            flat
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
                <q-card style="width: 700px; max-width: 80vw" class="bg-grey-2">
                    <q-card-section>
                        <div class="text-h6 text-center poppins-bold">
                            Agregado con exito
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <q-btn
                            color="pink"
                            outline
                            class="poppins-bold full-width q-mb-md"
                            @click="successDialog = false"
                            >Aceptar</q-btn
                        >
                    </q-card-section>
                </q-card>
            </q-dialog>
            <!-- END SUCCESS DIALOG -->

            <!-- LOCATION DIALOG -->
            <q-dialog v-model="locationDialog" persistent>
                <q-card style="width: 700px; max-width: 80vw" class="bg-grey-2">
                    <q-card-section>
                        <div
                            class="text-subtitle2 text-center poppins-bold text-red-7"
                        >
                            Arrastra el marcador del mapa a la ubicacion donde
                            deseas recibir tu pedido.
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <q-btn
                            color="black"
                            outline
                            class="poppins-bold full-width q-mb-md"
                            @click="locationDialog = false"
                            >Aceptar</q-btn
                        >
                    </q-card-section>
                </q-card>
            </q-dialog>
            <!-- END LOCATION DIALOG -->

            <!-- CART DIALOG -->
            <q-dialog
                v-model="cartDialog"
                maximized
                transition-show="slide-up"
                transition-hide="slide-down"
            >
                <q-card class="bg-grey-9 text-white">
                    <q-bar style="height: 45px">
                        <q-space />
                        <q-btn
                            dense
                            flat
                            icon="close"
                            size="lg"
                            v-close-popup
                        ></q-btn>
                    </q-bar>
                    <q-card-section>
                        <div class="text-h6 text-center poppins-bold">
                            Detalle de pedido
                        </div>
                    </q-card-section>

                    <q-card-section v-if="cart.length > 0">
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
                                <div class="text-body2 poppins-regular">
                                    <strong>
                                        ({{ item.amount }}) {{ item.title }}
                                        {{
                                            item.styles.title
                                                ? `- ${item.styles.title}`
                                                : ''
                                        }}
                                        -
                                        {{ item.options.title }}
                                    </strong>
                                    <!-- <strong
                                        v-if="item.type == 'extras'"
                                    >({{ item.amount }}) Extra - {{item.options.title}}</strong>
                                    <strong
                                        v-if="item.type == 'drinks'"
                                    >({{ item.amount }}) Bebida - {{item.options.title}}</strong>-->
                                </div>
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-section v-else>
                        <div class="row">
                            <div class="col text-grey-6 text-center">
                                <i
                                    class="fas fa-utensils q-mt-lg q-mb-md"
                                    style="font-size: 75px"
                                ></i>
                                <div class="text-h5 poppins-bold q-mb-lg">
                                    Tu carrito esta vacio
                                </div>
                            </div>
                        </div>
                    </q-card-section>

                    <q-separator dark />
                    <q-card-section>
                        <div class="row text-center">
                            <div class="col">
                                <div class="text-h6 poppins-bold q-mb-md">
                                    Datos de orden
                                </div>
                            </div>
                        </div>
                        <div class="row q-mb-md">
                            <div class="text-subtitle2 poppins-bold q-mb-sm">
                                Nombre: *
                            </div>
                            <q-input
                                v-model="name"
                                filled
                                dark
                                type="text"
                                class="full-width poppins-regular"
                                placeholder="Nombre Apellido"
                                color="pink"
                                data-hj-allow
                            />
                        </div>
                        <div class="row q-mb-md">
                            <div class="text-subtitle2 poppins-bold q-mb-sm">
                                Comentarios especiales de tu pedido:
                            </div>
                            <q-input
                                v-model="specialComments"
                                filled
                                dark
                                type="textarea"
                                class="full-width poppins-regular"
                                placeholder="Algun comentario especial que desees agregar a tu pedido."
                                color="pink"
                                rows="4"
                                data-hj-allow
                            />
                        </div>
                        <div class="row q-mb-md">
                            <div class="text-subtitle2 poppins-bold q-mb-sm">
                                Metodo de entrega: *
                            </div>
                            <q-btn-toggle
                                v-model="selectedPickupMethod"
                                spread
                                all-caps
                                class="poppins-bold full-width"
                                toggle-color="pink"
                                color="white"
                                text-color="black"
                                :options="pickupMethods"
                            />
                        </div>
                        <div
                            class="row"
                            v-if="this.selectedPickupMethod == 'Delivery'"
                        >
                            <div
                                class="text-subtitle2 poppins-bold q-mb-sm full-width"
                            >
                                Ubicacion de entrega: *
                            </div>
                            <div
                                class="text-subtitle2 poppins-bold q-mb-md text-red-7"
                            >
                                Para mover el marcador debes arrastrarlo a la
                                ubicacion que deseas recibir tu pedido.
                            </div>
                        </div>
                        <GoogleMaps
                            class="q-mb-md"
                            v-if="
                                Object.keys(center).length > 0 &&
                                this.selectedPickupMethod == 'Delivery'
                            "
                            @markerPosition="setMarkerPosition"
                            :editable="true"
                            :markers="markers"
                            :mapCenter="center"
                        ></GoogleMaps>
                        <div
                            class="row q-mb-md"
                            v-if="selectedPickupMethod == 'Delivery'"
                        >
                            <div class="text-subtitle2 poppins-bold q-mb-sm">
                                Direccion de entrega (completa): *
                            </div>
                            <q-input
                                v-model="address"
                                filled
                                dark
                                type="textarea"
                                class="full-width poppins-regular"
                                placeholder="Barriada, No. Calle, No. Casa"
                                color="pink"
                                rows="4"
                                data-hj-allow
                            />
                        </div>
                        <div class="row">
                            <div class="text-subtitle2 poppins-bold q-mb-sm">
                                Metodo de pago: *
                            </div>
                            <q-btn-toggle
                                v-model="selectedPaymentMethod"
                                spread
                                all-caps
                                class="poppins-bold full-width"
                                toggle-color="pink"
                                color="white"
                                text-color="black"
                                :options="paymentMethods"
                            />
                            <div
                                class="text-subtitle2 text-center q-mt-lg poppins-bold"
                                v-if="selectedPaymentMethod == 'Yappy'"
                            >
                                Recuerda enviar el comprobante de pago por
                                WhatsApp al numero 6684-7121
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-section v-if="cart.length > 0">
                        <div class="row">
                            <div class="col text-center">
                                <div class="text-h5 poppins-bold">
                                    Total: $ {{ total.toFixed(2) }}
                                </div>
                                <div
                                    class="text-subtitle2 poppins-bold text-red-8"
                                    v-if="selectedPickupMethod == 'Delivery'"
                                >
                                    Sin costos por delivery.
                                </div>
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <q-btn
                            color="green-7"
                            class="full-width q-mb-md poppins-bold"
                            @click="sendChat"
                            :disable="cart.length <= 0"
                            >Enviar</q-btn
                        >
                    </q-card-section>
                </q-card>
            </q-dialog>
            <!-- END CART DIALOG -->

            <!-- NEW DIALOG -->
            <q-dialog v-model="seamless" seamless position="bottom">
                <q-card
                    style="width: 350px; border-radius: 0"
                    class="bg-pink text-white"
                >
                    <q-card-section class="row items-center no-wrap">
                        <div>
                            <div class="text-h6 poppins-bold">
                                <span class="text-subtitle2 poppins-bold"
                                    >Total:</span
                                >
                                $
                                {{ total.toFixed(2) }}
                            </div>
                        </div>

                        <q-space />

                        <q-btn
                            flat
                            icon="shopping_cart"
                            @click="cartDialog = true"
                            label="Ver carrito"
                        />
                        <!-- <q-btn flat round icon="send" /> -->
                        <!-- <q-btn flat round icon="close" /> -->
                    </q-card-section>
                </q-card>
            </q-dialog>
            <!-- END NEW DIALOG -->
        </div>
    </q-page>
</template>

<script>
import GoogleMaps from '../../components/general/GoogleMaps'

export default {
    metaInfo: {
        meta: [
            {charset: 'utf-8'},
            {
                name: 'viewport',
                content:
                    'width=device-width, initial-scale=1, user-scalable=no',
            },
        ],
    },
    data() {
        return {
            orderNo: '',
            name: '',
            specialComments: '',
            selectedItemIndex: 0,
            seamless: false,
            whatsappNumber: '64182043',
            selectedItem: {},
            paymentMethods: [
                {label: 'Yappy', value: 'Yappy'},
                {label: 'Efectivo', value: 'Efectivo'},
            ],
            pickupMethods: [
                {label: 'Delivery', value: 'Delivery'},
                {label: 'Retirar en local', value: 'Retirar en local'},
            ],
            selectedPickupMethod: '',
            selectedPaymentMethod: null,
            address: '',
            total: 0,
            location: [],
            markers: [],
            center: {},
            optionsDialog: false,
            stylesDialog: false,
            successDialog: false,
            cartDialog: false,
            locationDialog: false,
            cart: [],
            menu: [
                {
                    title: 'Promo 1',
                    desc: '5 Pasteles + 10 Tequeños y bebida gratis.',
                    type: 'main',
                    pic: 'combo1.jpg',
                    price: 10,
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
                    title: 'Promo 2',
                    desc: '5 Pasteles + 20 Tequeños y bebida grande gratis.',
                    type: 'main',
                    pic: 'combo2.jpg',
                    price: 15,
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
                    title: 'Promo 3',
                    desc: '10 Pasteles + 10 Tequeños y bebida grande gratis.',
                    type: 'main',
                    pic: 'combo3.jpg',
                    price: 15,
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
                    title: 'Promo 4',
                    desc: '10 Pasteles + 20 Tequeños y bebida gratis.',
                    type: 'main',
                    pic: 'combo4.jpg',
                    price: 20,
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
                    title: '20 Tequeños',
                    desc: '20 Tequeños + bebida de lata.',
                    type: 'main',
                    pic: '20_teq_y_soda.jpg',
                    price: 10,
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
                    title: '40 Tequeños',
                    desc: '40 Tequeños + bebida de lata.',
                    type: 'main',
                    pic: '40_teq_y_soda.jpg',
                    price: 20,
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
        }
    },
    methods: {
        isWeekendItem(item) {
            let today = new Date().getDay()
            if (item.type == 'main') {
                return false
            } else if (item.days.includes(today)) {
                return false
            } else {
                return true
            }
        },
        selectItem(index) {
            this.selectedItemIndex = index
            this.selectedItem = Object.assign({}, this.menu[index])
            if (this.selectedItem.styles.length > 0) {
                this.stylesDialog = true
                return
            }
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
                    c.options.title === this.selectedItem.options.title &&
                    c.styles.title === this.selectedItem.styles.title
                ) {
                    isDuplicate = true
                }
            })

            return isDuplicate
        },
        addItemToCart(section, item) {
            if (section === 'style') {
                this.selectedItem.styles = item
                this.stylesDialog = false
                this.optionsDialog = true
            } else {
                this.selectedItem.options = item
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
                            c.options.title ===
                                this.selectedItem.options.title &&
                            c.styles.title === this.selectedItem.styles.title
                        ) {
                            c.amount++
                        }
                    })
                    this.optionsDialog = false
                    this.successDialog = true
                    this.calculateTotal()
                }
            }
        },
        removeItemFromCart(i) {
            this.cart.splice(i, 1)
        },
        calculateTotal() {
            let total = 0
            this.cart.forEach(c => {
                if (c.price) total += c.price * c.amount
                if (c.options.price) total += c.options.price * c.amount
                if (c.styles.price) total += c.styles.price * c.amount
            })
            this.total = total
        },
        generateMessage() {
            let message =
                'Buenas me gustaria realizar un pedido de:%0D%0A%0D%0A'
            for (let item of this.cart) {
                message += `- (${item.amount}) ${item.title} - ${item.options.title}%0D%0A`
            }
            message += `%0D%0ANo. de pedido: ${this.orderNo}%0D%0ANombre: ${this.name}`
            if (this.specialComments.length > 0)
                message += `%0D%0AComentarios especiales: ${this.specialComments}`
            if (this.selectedPickupMethod == 'Delivery') {
                message += `%0D%0AUbicacion: ${this.getLocationForMessage()}%0D%0ADireccion: ${
                    this.address
                }`
            }
            message += `%0D%0AMetodo de entrega: ${
                this.selectedPickupMethod
            }%0D%0AMetodo de pago: ${
                this.selectedPaymentMethod
            }%0D%0ATotal: $ ${this.total.toFixed(2)}`
            message = message.replace(/\+/g, '%2B')
            message = message.replace(/&/g, '%26')
            message = message.replace(/#/g, '%23')
            return message
        },
        async sendToGoogleDriveSheet() {
            let message = ''
            for (let item of this.cart) {
                message += `(${item.amount}) ${item.title} - ${item.options.title}\n`
            }
            let data = {
                id: this.orderNo,
                pedido: message,
                nombre: this.name,
                status: 'orden creada',
                total: this.total,
                metodo_de_pago: this.selectedPaymentMethod,
                metodo_de_entrega: this.selectedPickupMethod,
            }
            if (data.metodo_de_entrega === 'Delivery') {
                data.direcion_1 = this.getLocationForMessage()
                data.direcion_2 = this.address
            }
            var url =
                'https://script.google.com/macros/s/AKfycbybmCSxZchLRwk4V4B3ev_D0mIyXPiDtXTEA0lrBmgcGAetIJo/exec'
            var xhr = new XMLHttpRequest()
            xhr.open('POST', url)
            // xhr.withCredentials = true;
            xhr.setRequestHeader(
                'Content-Type',
                'application/x-www-form-urlencoded'
            )
            // url encode form data for sending as post data
            var encoded = Object.keys(data)
                .map(function (k) {
                    return (
                        encodeURIComponent(k) +
                        '=' +
                        encodeURIComponent(data[k])
                    )
                })
                .join('&')
            await xhr.send(encoded)
        },
        getLocationForMessage() {
            if (this.location.length === 0) {
                if (
                    parseFloat(this.center.lat) === parseFloat(9.068463) &&
                    parseFloat(this.center.lng) === parseFloat(-79.452694)
                ) {
                    return `>> Pedir Ubicacion !!`
                } else {
                    return `https://waze.com/ul?ll=${this.center.lat},${this.center.lng}&z=10`
                }
                // let lat = parseFloat(this.center.lat)
                // let lng = parseFloat(this.center.lng)
                // if (lat < 0) lat = `+${lat}`
                // if (lng < 0) lng = `+${lng}`
            } else {
                let lat = parseFloat(this.location.lat)
                let lng = parseFloat(this.location.lng)
                if (lat === NaN || lng === NaN) return `>> Pedir Ubicacion !!`
                // if (lat < 0) lat = `+${lat}`
                // if (lng < 0) lng = `+${lng}`
                return `https://waze.com/ul?ll=${lat},${lng}&z=10`
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
        async sendChat() {
            if (this.name == '') {
                alert('Debes ingresar tu nombre para enviar el pedido.')
                return
            }
            if (this.selectedPickupMethod == '') {
                alert('Debes seleccionar un metodo de entrega.')
                return
            }
            if (this.address == '' && this.selectedPickupMethod == 'Delivery') {
                alert(
                    'Debes ingresar tu direccion completa para la entrega de tu pedido.'
                )
                return
            }
            if (this.selectedPaymentMethod == null) {
                alert('Debes seleccionar un metodo de pago.')
                return
            } else {
                this.orderNo = Math.floor(100000 + Math.random() * 900000)
                this.$analytics.logEvent('wp-lavillafood', {
                    content_action: 'Orden Completada',
                })
                // await this.sendToGoogleDriveSheet()
                window.location.href = `https://wa.me/507${
                    this.whatsappNumber
                }?text=${this.generateMessage()}`
            }
        },
    },
    watch: {
        cart() {
            this.calculateTotal()
            if (this.cart.length > 0) {
                this.seamless = true
                this.$store.commit('SET_DISPLAYFOOTER', true)
            } else {
                this.seamless = false
                this.$store.commit('SET_DISPLAYFOOTER', false)
            }
        },
        // selectedPickupMethod() {
        //     if (this.selectedPickupMethod == 'Delivery')
        //         this.locationDialog = true
        // },
    },
    components: {
        GoogleMaps,
    },
    mounted() {
        if (this.$hj) {
            this.$hj('vpv', 'funnel-step-one')
        }
        this.$store.commit('SET_DISPLAYFOOTER', false)
        let path = this.$route.params.path
        this.$analytics.logEvent('wp-lavillafood', {
            path,
        })
        this.geolocate()
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
