<template>
    <q-page class="bg-grey-2">
        <q-img
            :src="require('@/assets/wp/depredadores/logo.webp')"
            class="shadow-7"
        />
        <div class="q-pa-md">
            <div class="text-subtitle2 poppins-bold q-mt-sm">
                <i class="fab fa-instagram text-orange-8"></i>
                <a
                    href="https://www.instagram.com/parquedepredadorespma/"
                    style="text-decoration: none; color: black;"
                    >&nbsp;ParqueDepredadoresPma
                </a>
            </div>
            <div class="text-subtitle2 poppins-bold q-mb-lg">
                <i class="fab fa-whatsapp text-orange-8"></i> Comprobantes al
                6389-3438
            </div>
            <div class="text-h5 text-center q-mt-sm q-mb-lg poppins-bold">
                BIENVENIDOS
            </div>

            <!-- VIDEO -->
            <q-card class="full-width q-mb-lg">
                <q-card-section class="q-pa-none">
                    <q-video
                        :ratio="16 / 9"
                        src="https://www.youtube.com/embed/MPvGJg2Mf08"
                    />
                    <div
                        class="text-body2 q-pa-sm text-bold text-center text-orange-8"
                    >
                        Video informativo de la dinámica
                    </div>
                </q-card-section>
            </q-card>
            <!-- END VIDEO -->

            <!-- MENU ITEMS -->
            <q-card
                class="full-width q-mb-lg"
                v-for="(item, i) in menu"
                :key="i"
            >
                <q-img
                    v-if="item.pic"
                    :src="require(`@/assets/wp/depredadores/${item.pic}`)"
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
                        color="orange-8"
                        @click="selectItem(i)"
                        :disable="isWeekendItem(item)"
                        >Agregar</q-btn
                    >
                </q-card-actions>
            </q-card>
            <!-- END MENU ITEMS -->

            <!-- STYLES DIALOG -->
            <q-dialog v-model="stylesDialog">
                <q-card
                    style="width: 700px; max-width: 80vw;"
                    class="bg-grey-2"
                >
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
                <q-card
                    style="width: 700px; max-width: 80vw;"
                    class="bg-grey-2"
                >
                    <q-card-section class="q-py-sm">
                        <div class="text-h6 text-center poppins-bold">
                            ELEGIR FUNCIÓN
                        </div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                        <q-btn
                            text-color="black"
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
                            color="red-7"
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
                <q-card
                    style="width: 700px; max-width: 80vw;"
                    class="bg-grey-2"
                >
                    <q-card-section>
                        <div class="text-h6 text-center poppins-bold">
                            Agregado con exito
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <q-btn
                            color="black"
                            outline
                            class="poppins-bold full-width q-mb-md"
                            @click="successDialog = false"
                            >Aceptar</q-btn
                        >
                    </q-card-section>
                </q-card>
            </q-dialog>
            <!-- END SUCCESS DIALOG -->

            <!-- DELIVERY COST DIALOG -->
            <q-dialog v-model="deliveryCostDialog">
                <q-card
                    style="width: 700px; max-width: 80vw;"
                    class="bg-grey-2"
                >
                    <q-card-section>
                        <div
                            class="text-subtitle2 text-center poppins-bold text-red-7"
                        >
                            El costo del delivery sera calculado y enviado
                            aparte.
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <q-btn
                            color="black"
                            outline
                            class="poppins-bold full-width q-mb-md"
                            @click="confirmChat()"
                            >Confirmar</q-btn
                        >
                    </q-card-section>
                </q-card>
            </q-dialog>
            <!-- END DELIVERY DIALOG -->

            <!-- CART DIALOG -->
            <q-dialog
                v-model="cartDialog"
                maximized
                transition-show="slide-up"
                transition-hide="slide-down"
            >
                <q-card class="bg-grey-9 text-white">
                    <q-bar style="height: 45px;">
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
                                    style="font-size: 75px;"
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
                                color="orange-8"
                                data-hj-allow
                            />
                        </div>
                        <div class="row q-mb-md">
                            <div class="text-subtitle2 poppins-bold q-mb-sm">
                                Nombre de los participantes: *
                            </div>
                            <q-input
                                v-model="specialComments"
                                filled
                                dark
                                type="textarea"
                                class="full-width poppins-regular"
                                placeholder="Jose Perez, Maria Perez"
                                color="orange-8"
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
                                toggle-color="orange-8"
                                color="white"
                                text-color="black"
                                :options="paymentMethods"
                            />
                            <div
                                class="text-subtitle2 text-center q-mt-lg poppins-bold"
                            >
                                Recuerda enviar el comprobante de pago por
                                WhatsApp al numero 6389-3438
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-section v-if="cart.length > 0">
                        <div class="row">
                            <div class="col text-center">
                                <div class="text-h5 poppins-bold">
                                    Total: $ {{ total.toFixed(2) }}
                                </div>
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <q-btn
                            color="green-7"
                            class="full-width q-mb-md poppins-bold"
                            @click="sendChat()"
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
                    style="width: 350px; border-radius: 0;"
                    class="bg-orange-8 text-white"
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
            whatsappNumber: '63893438',
            selectedItem: {},
            paymentMethods: [
                {label: 'Banco General', value: 'Banco General'},
                {label: 'Yappy', value: 'Yappy'},
                {label: 'Banistmo', value: 'Banistmo'},
                {label: 'Scotiabank', value: 'Scotiabank'},
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
            deliveryCostDialog: false,
            cart: [],
            menu: [
                {
                    title: 'Entrada Individual',
                    desc:
                        ' Acceso únicamente para un niño o niña. Si es menor de 7 años, necesita monitoreo de algún tutor.',
                    type: 'main',
                    pic: 'individual.webp',
                    price: 6,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Martes - 4 P.M.',
                            price: 0,
                        },
                        {
                            title: 'Viernes - 4 P.M.',
                            price: 0,
                        },
                        {
                            title: 'Sabado - 4 P.M.',
                            price: 0,
                        },
                        {
                            title: 'Domingo - 4 P.M.',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Burbuja Familiar',
                    desc: 'Acceso para toda la familia o varios hermanos.',
                    type: 'main',
                    pic: 'burbuja.webp',
                    price: 10,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Martes - 4 P.M.',
                            price: 0,
                        },
                        {
                            title: 'Viernes - 4 P.M.',
                            price: 0,
                        },
                        {
                            title: 'Sabado - 4 P.M.',
                            price: 0,
                        },
                        {
                            title: 'Domingo - 4 P.M.',
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
                'Buenas me gustaria realizar una reservación:%0D%0A%0D%0A'
            for (let item of this.cart) {
                message += `- (${item.amount}) ${item.title} ${
                    item.styles.title ? '- ' + item.styles.title + ' ' : ''
                }- ${item.options.title}%0D%0A`
            }
            message += `%0D%0ANo. de reserva: ${this.orderNo}%0D%0ANombre: ${this.name}`
            if (this.specialComments.length > 0)
                message += `%0D%0AParticipantes: ${this.specialComments}`
            message += `%0D%0AMetodo de pago: ${
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
                if (item.type == 'main')
                    message += `(${item.amount}) ${item.title} - ${item.options.title}\n`
                if (item.type == 'extras')
                    message += `(${item.amount}) ${item.title} - ${item.options.title}\n`
                if (item.type == 'drinks')
                    message += `(${item.amount}) Bebida - ${item.options.title}\n`
            }
            let data = {
                id: this.orderNo,
                pedido: message,
                nombre: this.name,
                status: 'orden creada',
                total: this.total,
                metodo_de_pago: this.selectedPaymentMethod,
                participantes: this.specialComments,
            }
            if (data.metodo_de_entrega === 'Delivery') {
                data.direcion_1 = this.getLocationForMessage()
                data.direcion_2 = this.address
            }
            var url =
                'https://script.google.com/macros/s/AKfycbyrnIPKKgUKjsX4TgxoSclSLPUw2gk-U9YxxC7l/exec'
            var xhr = new XMLHttpRequest()
            xhr.open('POST', url)
            // xhr.withCredentials = true;
            xhr.setRequestHeader(
                'Content-Type',
                'application/x-www-form-urlencoded'
            )
            // url encode form data for sending as post data
            var encoded = Object.keys(data)
                .map(function(k) {
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
                alert('Debes ingresar el nombre de la reserva.')
                return
            }
            if (this.specialComments == '') {
                alert('Debes ingresar los nombres de los participantes.')
                return
            }
            if (this.selectedPaymentMethod == null) {
                alert('Debes seleccionar un metodo de pago.')
                return
            } else {
                this.confirmChat()
            }
        },
        async confirmChat() {
            this.orderNo = Math.floor(100000 + Math.random() * 900000)
            this.$analytics.logEvent('wp-depredadores', {
                content_action: 'Orden Completada',
            })
            await this.sendToGoogleDriveSheet()
            window.location.href = `https://wa.me/507${
                this.whatsappNumber
            }?text=${this.generateMessage()}`
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
        this.$analytics.logEvent('wp-panamahotdog', {
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
