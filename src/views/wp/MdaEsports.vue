<template>
    <q-page class="bg-grey-2">
        <!-- HEADER -->
        <q-img
            :src="require('@/assets/wp/mdaesports/logo.png')"
            class="shadow-7"
        />
        <!-- /HEADER -->

        <!-- IG -->
        <div class="text-subtitle2 q-pa-md poppins-bold">
            <i class="fab fa-instagram text-blue-7"></i>
            <a
                href="https://www.instagram.com/mdaesportsleague/"
                target="_blank"
                style="text-decoration: none; color: black"
                >&nbsp;MdaEsportsLeague</a
            >
        </div>
        <!-- /IG -->

        <!-- MENU -->
        <div class="q-pa-md">
            <div v-for="(item, i) in menu" :key="i">
                <q-card class="q-mb-lg">
                    <q-card-section class="q-pa-none">
                        <img :src="item.img" width="100%" />
                    </q-card-section>
                    <q-card-section>
                        <div class="text-h6 text-bold">
                            {{ item.name }}
                        </div>
                        <div class="text-body2 text-grey text-bold q-mb-sm">
                            {{ item.description }}
                        </div>
                        <div class="text-h6 poppins-bold">
                            $ {{ item.price.toFixed(2) }}
                        </div>
                    </q-card-section>
                    <q-separator />
                    <q-card-actions align="right">
                        <q-btn
                            label="Agregar"
                            flat
                            class="text-bold"
                            @click="addToCart(item)"
                        />
                    </q-card-actions>
                </q-card>
            </div>
        </div>
        <!-- /MENU -->

        <!-- SEAMLESS -->
        <q-dialog v-model="showSeamless" seamless position="bottom">
            <q-card
                style="width: 350px; border-radius: 0"
                class="bg-yellow-9 text-white"
            >
                <q-card-section class="row items-center no-wrap">
                    <div>
                        <div class="text-h6 poppins-bold">
                            <span class="text-subtitle2 poppins-bold"
                                >Sub Total:</span
                            >
                            $
                            {{ total.toFixed(2) }}
                        </div>
                    </div>

                    <q-space />

                    <q-btn
                        flat
                        icon="shopping_cart"
                        label="Ver carrito"
                        @click="cartDialog = true"
                    />
                </q-card-section>
            </q-card>
        </q-dialog>
        <!-- /SEAMLESS -->

        <!-- CART DIALOG -->
        <q-dialog
            v-model="cartDialog"
            maximized
            transition-show="slide-up"
            transition-hide="slide-down"
        >
            <q-card class="bg-grey-9 text-white">
                <q-card-actions class="bg-grey-10" align="right">
                    <q-btn
                        icon="close"
                        flat
                        round
                        @click="cartDialog = false"
                        color="white"
                    />
                </q-card-actions>
                <q-card-section>
                    <div class="text-h6 text-center poppins-bold q-mb-md">
                        Detalle de pedido
                    </div>
                    <div
                        class="row items-center"
                        v-for="(item, i) in cart"
                        :key="item.id"
                    >
                        <q-btn
                            icon="close"
                            round
                            color="red-7"
                            flat
                            @click="removeFromCart(i)"
                        />
                        <div class="text-subtitle2 poppins-bold q-ml-sm">
                            ({{ item.amount }}) - {{ item.name }}
                        </div>
                    </div>
                </q-card-section>
                <q-separator color="grey-6" />
                <q-card-section>
                    <div class="text-h6 text-center poppins-bold q-mb-lg">
                        Datos de orden
                    </div>
                    <div class="text-caption poppins-bold q-mb-xs">
                        Nombre completo: *
                    </div>
                    <q-input
                        label="Nombre y apellido"
                        filled
                        dark
                        class="q-mb-lg"
                        v-model="fullName"
                        color="yellow-9"
                        data-hj-allow
                    />
                    <div class="text-caption poppins-bold q-mb-xs">
                        Correo electronico: *
                    </div>
                    <q-input
                        label="correo@electronico.com"
                        filled
                        dark
                        class="q-mb-lg"
                        v-model="email"
                        color="yellow-9"
                        type="email"
                        data-hj-allow
                    />
                    <div class="text-caption poppins-bold q-mb-xs">
                        Número de contacto: *
                    </div>
                    <q-input
                        placeholder="6123-4567"
                        filled
                        dark
                        class="q-mb-lg"
                        v-model="contactNo"
                        color="yellow-9"
                        mask="####-####"
                        data-hj-allow
                    />
                    <div class="text-caption poppins-bold q-mb-xs">
                        Entrega: *
                    </div>
                    <q-btn-toggle
                        v-model="selectedPickupMethod"
                        spread
                        all-caps
                        class="poppins-bold full-width q-mb-lg"
                        toggle-color="yellow-9"
                        color="white"
                        text-color="black"
                        :options="pickupMethods"
                    />
                    <div
                        class="row"
                        v-if="this.selectedPickupMethod == 'Delivery'"
                    >
                        <div
                            class="
                                text-subtitle2
                                poppins-bold
                                q-mb-sm
                                full-width
                            "
                        >
                            Ubicacion de entrega: *
                        </div>
                    </div>
                    <GoogleMaps
                        class="q-mb-md"
                        v-if="
                            Object.keys(center).length > 0 &&
                                this.selectedPickupMethod == 'Delivery'
                        "
                        @markerPosition="setMarkerPosition"
                        @newMarkerPosition="setNewMarkerPosition"
                        :editable="true"
                        :markers="markers"
                        :mapCenter="center"
                    ></GoogleMaps>
                    <div
                        class="row q-mb-md"
                        v-if="selectedPickupMethod == 'Delivery'"
                    >
                        <div class="text-subtitle2 poppins-bold q-mb-sm">
                            Dirección de entrega (completa): *
                        </div>
                        <q-input
                            v-model="address"
                            filled
                            dark
                            type="textarea"
                            class="full-width poppins-regular"
                            placeholder="Barriada, No. Calle, No. Casa"
                            color="yellow-9"
                            rows="4"
                            data-hj-allow
                        />
                    </div>
                    <div class="text-caption poppins-bold q-mb-xs">
                        Metodo de pago: *
                    </div>
                    <q-btn-toggle
                        v-model="selectedPaymentMethod"
                        spread
                        all-caps
                        class="poppins-bold full-width"
                        toggle-color="yellow-9"
                        color="white"
                        text-color="black"
                        :options="paymentMethods"
                    />
                </q-card-section>
                <q-card-section
                    class="text-center"
                    v-if="selectedPaymentMethod"
                >
                    <div class="text-subtitle2 poppins-bold">
                        Pago por {{ selectedPaymentMethod }}
                    </div>
                    <div
                        class="text-subtitle2"
                        v-if="selectedPaymentMethod == 'Yappy'"
                    >
                        Envia tu pago por Yappy al numero<br />
                        <span class="text-h6 poppins-bold"
                            >6204-6903
                            <q-btn
                                icon="content_copy"
                                class="q-ml-sm"
                                round
                                flat
                                dense
                                size="sm"
                                color="yellow-9"
                                @click="copyToClipboard('62046903')"
                        /></span>
                    </div>
                    <div
                        class="text-subtitle2"
                        v-if="selectedPaymentMethod == 'ACH'"
                    >
                        Envia tu pago por ACH a la cuenta<br />
                        <span class="text-h6 poppins-bold"
                            >04-11-22-333333-4
                            <q-btn
                                icon="content_copy"
                                class="q-ml-sm"
                                round
                                flat
                                dense
                                size="sm"
                                color="yellow-9"
                                @click="
                                    copyToClipboard('0411223333334')
                                "/></span
                        ><br />
                        Banco General | Cuenta de ahorros
                    </div>
                </q-card-section>
                <q-card-section>
                    <div class="text-subtitl2 poppins-bold text-center">
                        Sub Total: $ {{ total.toFixed(2) }}
                    </div>
                    <div class="text-subtitl2 poppins-bold text-center q-mb-md">
                        ITBMS: $ {{ (total * 0.07).toFixed(2) }}
                    </div>
                    <div class="text-h5 poppins-bold text-center">
                        Total: $ {{ (total * 1.07).toFixed(2) }}
                    </div>
                </q-card-section>
                <q-card-actions>
                    <q-btn
                        label="Enviar"
                        color="green-7"
                        class="poppins-bold full-width q-mb-xl"
                        push
                        @click="sendOrder()"
                    />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <!-- /CART DIALOG -->

        <!-- LOADING -->
        <q-dialog
            v-model="isLoading"
            maximized
            transition-show="none"
            transition-hide="fade
        "
        >
            <q-card class="bg-grey-10">
                <q-card-section class="absolute-center">
                    <div class="row justify-center">
                        <img
                            src="@/assets/landing/logo_grey.png"
                            width="100%"
                        />
                    </div>
                    <div class="row justify-center">
                        <q-spinner-dots size="4em" color="grey-2" />
                    </div>
                </q-card-section>
            </q-card>
        </q-dialog>
        <!-- /LOADING -->
    </q-page>
</template>

<script>
import GoogleMaps from '../../components/general/GoogleMaps'
import {copyToClipboard} from 'quasar'
import InventoryHandler from '@/mixins/InventoryHandler.js'
export default {
    components: {
        GoogleMaps,
    },
    data() {
        return {
            isLoading: true,
            whatsappNo: '62046903',
            cart: [],
            total: 0,
            seamless: true,
            cartDialog: false,
            fullName: '',
            email: '',
            contactNo: '',
            comments: '',
            selectedPickupMethod: '',
            selectedPaymentMethod: '',
            pickupMethods: [
                {label: 'Producto digital', value: 'Producto digital'},
                {label: 'Recoger en local', value: 'Recoger en local'},
                {label: 'Entrega domicilio', value: 'Delivery'},
            ],
            paymentMethods: [
                {
                    label: 'Yappy',
                    value: 'Yappy',
                },
                {label: 'ACH', value: 'ACH'},
                {label: 'Efectivo', value: 'Efectivo'},
                {label: 'Nequi', value: 'Nequi'},
                {label: 'Paypal', value: 'Paypal'},
            ],
            menu: [],
            location: [],
            markers: [],
            center: {},
            address: '',
        }
    },
    methods: {
        addToCart(item) {
            if (this.cart.find(el => el.id == item.id)) {
                this.cart.find(el => {
                    if (el.id == item.id) item.amount++
                })
            } else {
                item.amount = 1
                this.cart.push(item)
            }
            this.calculateTotal()
        },
        removeFromCart(index) {
            this.cart.splice(index, 1)
            this.calculateTotal()
            if (!this.cart.length) this.cartDialog = false
        },
        calculateTotal() {
            this.total = 0
            this.cart.forEach(item => {
                this.total += item.amount * item.price
            })
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
        generateWhatsappMessage() {
            let message =
                'Buenas, me gustaría realizar un pedido de:%0D%0A%0D%0A'
            this.cart.forEach(item => {
                message += `(${item.amount}) - ${item.name}%0D%0A`
            })
            message += `%0D%0ANombre: ${this.fullName}`
            message += `%0D%0AEntrega: ${this.selectedPickupMethod}`
            if (this.selectedPickupMethod == 'Delivery') {
                message += `%0D%0ADirección: ${this.address}`
                message += `%0D%0AUbicación: ${this.getLocationForMessage()}`
            }
            message += `%0D%0AMetodo de pago: ${this.selectedPaymentMethod}`
            message += `%0D%0ASub Total: $${this.total.toFixed(2)}`
            message += `%0D%0AITBMS: $${(this.total * 0.07).toFixed(2)}`
            message += `%0D%0ATotal: $${(this.total * 1.07).toFixed(2)}`
            message = message.replace(/\+/g, '%2B')
            message = message.replace(/&/g, '%26')
            message = message.replace(/#/g, '%23')
            return message
        },
        sendOrder() {
            if (
                !this.fullName ||
                !this.selectedPickupMethod ||
                !this.selectedPaymentMethod ||
                !this.email ||
                !this.contactNo ||
                (this.selectedPickupMethod == 'Delivery' && !this.address)
            ) {
                let errors = []
                let errMsg = 'Debes llenar los siguientes campos: '
                if (!this.fullName) errors.push('Nombre')
                if (!this.selectedPickupMethod) errors.push('Entrega')
                if (!this.selectedPaymentMethod) errors.push('Metodo de pago')
                if (!this.email) errors.push('Correo electrónico')
                if (!this.contactNo) errors.push('Número de contacto')
                if (this.selectedPickupMethod == 'Delivery' && !this.address)
                    errors.push('Dirección de entrega')
                for (let i = 0; i < errors.length; i++) {
                    errMsg += errors[i]
                    if (i < errors.length - 1) errMsg += ', '
                }
                this.$q.notify({
                    message: errMsg,
                    color: 'red-7',
                    icon: 'error',
                    position: 'top',
                    progress: true,
                    classes: 'text-bold',
                    timeout: 3000,
                })
                return
            }
            window.location.href = `https://wa.me/507${
                this.whatsappNo
            }?text=${this.generateWhatsappMessage()}`
        },
        copyToClipboard(text) {
            copyToClipboard(text)
                .then(() => {
                    this.$q.notify({
                        message: `${this.selectedPaymentMethod} copiado con exito`,
                        color: 'yellow-9',
                        icon: 'check',
                        badgeColor: 'blue-7',
                        progress: true,
                        classes: 'poppins-bold',
                        timeout: 1000,
                        position: 'top',
                    })
                })
                .catch(() => {
                    // fail
                })
        },
        setMarkerPosition(event) {
            this.location = event
        },
        setNewMarkerPosition(event) {
            this.markers = [{position: event}]
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
    computed: {
        showSeamless() {
            if (this.cart.length) return true
        },
    },
    mixins: [InventoryHandler],

    async mounted() {
        // this.menu = await this.getInventoryItems()
        this.geolocate()
        let m = [
            {
                name: 'Giftcard PlayStation $10',
                price: 11.99,
                img:
                    'https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/184248a223fa4d29b15fd7db46df2400_Medium.jpg',
                description:
                    'Giftcard de PSN con valor de $25. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard PlayStation $20',
                price: 22.99,
                img:
                    'https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/7ce14fd962a64399b5e2519abf14f11a_Medium.jpg',
                description:
                    'Giftcard de PSN con valor de $20. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard PlayStation $25',
                price: 26.99,
                img:
                    'https://multimedia.bbycastatic.ca/multimedia/products/500x500/126/12677/12677654.jpg',
                description:
                    'Giftcard de PSN con valor de $25. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard PlayStation $50',
                price: 52.99,
                img:
                    'https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/7c7db5a9daaa4bdfa3d8cb46f59ad040_Medium.jpg',
                description:
                    'Giftcard de PSN con valor de $50. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard PlayStation $60',
                price: 62.99,
                img:
                    'https://http2.mlstatic.com/D_NQ_NP_733875-MLA47429803387_092021-O.jpg',
                description:
                    'Giftcard de PSN con valor de $60. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard PlayStation $75',
                price: 77.99,
                img:
                    'https://www.ubuy.com.pa/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNjF2NUVOZEM4UkwuX1NMMTUwMF8uanBn.jpg',
                description:
                    'Giftcard de PSN con valor de $75. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard PlayStation $100',
                price: 104.99,
                img:
                    'https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/13d393cec46543d4bb8a0443b7fcf350_Medium.jpg',
                description:
                    'Giftcard de PSN con valor de $100. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard Nintendo $5',
                price: 5.99,
                img:
                    'https://m.media-amazon.com/images/I/71kcx+3mcmL._SL1500_.jpg',
                description:
                    'Giftcard de Nintendo con valor de $5. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard Nintendo $10',
                price: 11.99,
                img:
                    'https://m.media-amazon.com/images/I/71g8qy0R8zL._SY445_.jpg',
                description:
                    'Giftcard de Nintendo con valor de $10. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard Nintendo $20',
                price: 21.99,
                img:
                    'https://m.media-amazon.com/images/I/71YSvFcuK7L._SL1500_.jpg',
                description:
                    'Giftcard de Nintendo con valor de $20. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard Nintendo $35',
                price: 36.99,
                img:
                    'https://m.media-amazon.com/images/I/71kYjm-EI8L._SL1500_.jpg',
                description:
                    'Giftcard de Nintendo con valor de $35. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard Nintendo $45',
                price: 46.99,
                img: 'https://m.media-amazon.com/images/I/51XPfhiwKlL.jpg',
                description:
                    'Giftcard de Nintendo con valor de $45. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard Nintendo $50',
                price: 52.99,
                img:
                    'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5784/5784110_sd.jpg',
                description:
                    'Giftcard de Nintendo con valor de $50. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard Nintendo $70',
                price: 71.99,
                img:
                    'https://m.media-amazon.com/images/I/714oSJ60A9L._SY679_.jpg',
                description:
                    'Giftcard de Nintendo con valor de $70. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard Nintendo $99',
                price: 104.99,
                img:
                    'https://m.media-amazon.com/images/I/51x+YpqXTIL._AC_SY780_.jpg',
                description:
                    'Giftcard de Nintendo con valor de $99. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard Xbox $5',
                price: 5.99,
                img:
                    'https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/3ca45092c6274acb91b6d108db61ce2e_Medium.jpg',
                description:
                    'Giftcard de Xbox con valor de $5. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard Xbox $10',
                price: 11.99,
                img:
                    'https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/5f72dd18f2254cf2a54924656290d6eb_Medium.jpg',
                description:
                    'Giftcard de Xbox con valor de $10. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard Xbox $15',
                price: 16.99,
                img:
                    'https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/43fc9a2a8e2a4bf8a71d94d724da72a5_Medium.jpg',
                description:
                    'Giftcard de Xbox con valor de $15. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard Xbox $20',
                price: 21.99,
                img:
                    'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/1891/1891044_sa.jpg',
                description:
                    'Giftcard de Xbox con valor de $20. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard Xbox $30',
                price: 31.99,
                img:
                    'https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/7fbd1d9e15bd40b8b474412870e0a5b3_Medium.jpg',
                description:
                    'Giftcard de Xbox con valor de $30. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard Xbox $40',
                price: 42.99,
                img:
                    'https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/a2fd5c3369c2458886537d60df2b45de_Medium.jpg',
                description:
                    'Giftcard de Xbox con valor de $40. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard Xbox $50',
                price: 52.99,
                img:
                    'https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/5893379e583644c699eabb160f4efd46_Medium.jpg',
                description:
                    'Giftcard de Xbox con valor de $50. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard Xbox $60',
                price: 62.99,
                img:
                    'https://cdn-products.eneba.com/resized-products/kV91qZzS2cn4wZ1KPKwiYQBjtPzI0nnA6Syn7AHWSv8_350x200_2x-0.jpeg',
                description:
                    'Giftcard de Xbox con valor de $60. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard Xbox $70',
                price: 72.99,
                img:
                    'https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/628a5f48c3c345fb88c284a3d12f8905_Medium.jpg',
                description:
                    'Giftcard de Xbox con valor de $70. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard Xbox $100',
                price: 104.99,
                img:
                    'https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/1564636ad707434c835493fabc918e01_Medium.jpg',
                description:
                    'Giftcard de Xbox con valor de $100. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard Google Play $5',
                price: 8,
                img:
                    'https://www.thecardcloset.com/static/img/gift-cards/5-google-play-digital-gift-card-email-delivery-2x.png',
                description:
                    'Giftcard de Google Play con valor de $5. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard Google Play $10',
                price: 12,
                img:
                    'https://www.thecardcloset.com/static/img/gift-cards/10-google-play-digital-gift-card-email-delivery-2x.png',
                description:
                    'Giftcard de Google Play con valor de $10. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard Google Play $15',
                price: 17,
                img:
                    'https://www.thecardcloset.com/static/img/gift-cards/15-google-play-digital-gift-card-email-delivery-2x.png',
                description:
                    'Giftcard de Google Play con valor de $15. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard Google Play $25',
                price: 27,
                img:
                    'https://www.thecardcloset.com/static/img/gift-cards/25-google-play-digital-gift-card-email-delivery-2x.png',
                description:
                    'Giftcard de Google Play con valor de $25. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard Google Play $50',
                price: 53,
                img:
                    'https://www.thecardcloset.com/static/img/gift-cards/50-google-play-digital-gift-card-email-delivery-2x.png',
                description:
                    'Giftcard de Google Play con valor de $50. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard Google Play $100',
                price: 105,
                img:
                    'https://www.thecardcloset.com/static/img/gift-cards/100-google-play-digital-gift-card-email-delivery-2x.png',
                description:
                    'Giftcard de Google Play con valor de $100. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard iTunes $5',
                price: 8,
                img:
                    'https://www.thecardcloset.com/static/img/gift-cards/5-itunes-digital-gift-card-email-delivery-2x.png',
                description:
                    'Giftcard de Google Play con valor de $5. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard iTunes $10',
                price: 12,
                img:
                    'https://www.thecardcloset.com/static/img/gift-cards/10-itunes-digital-gift-card-email-delivery-2x.png',
                description:
                    'Giftcard de Google Play con valor de $10. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard iTunes $15',
                price: 17,
                img:
                    'https://www.thecardcloset.com/static/img/gift-cards/5-itunes-digital-gift-card-email-delivery-2x.png',
                description:
                    'Giftcard de Google Play con valor de $15. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard iTunes $25',
                price: 27,
                img:
                    'https://www.thecardcloset.com/static/img/gift-cards/25-itunes-digital-gift-card-email-delivery-2x.png',
                description:
                    'Giftcard de Google Play con valor de $25. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard iTunes $50',
                price: 53,
                img:
                    'https://www.thecardcloset.com/static/img/gift-cards/50-itunes-digital-gift-card-email-delivery-2x.png',
                description:
                    'Giftcard de Google Play con valor de $50. Válido solo para cuentas en America.',
            },
            {
                name: 'Giftcard iTunes $100',
                price: 105,
                img:
                    'https://www.thecardcloset.com/static/img/gift-cards/100-itunes-digital-gift-card-email-delivery-2x.png',
                description:
                    'Giftcard de Google Play con valor de $100. Válido solo para cuentas en America.',
            },
        ]
        this.menu = m
        let id = 0
        this.menu.forEach(item => {
            item.id = id
            id++
        })
        this.isLoading = false
    },
}
</script>

<style>
.text-blue-7 {
    color: #004c97 !important;
}
.bg-blue-7 {
    background: #004c97 !important;
}
.text-yellow-9 {
    color: #eec800 !important;
}
.bg-yellow-9 {
    background: #eec800 !important;
}
</style>
