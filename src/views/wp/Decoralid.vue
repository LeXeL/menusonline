<template>
    <q-page class="bg-grey-2">
        <q-img :src="require('@/assets/wp/decoralid/logo.jpg')" class="shadow-7" />
        <div class="q-pa-md">
            <div class="text-h5 text-center q-mt-sm q-mb-lg poppins-bold">REALIZA TU PEDIDO</div>
            <!-- MENU ITEMS -->
            <q-card class="full-width q-mb-lg" v-for="(item, i) in menu" :key="i">
                <q-img v-if="item.pic" :src="require(`@/assets/wp/decoralid/${item.pic}`)" />
                <q-card-section class="q-pb-none">
                    <div class="row">
                        <div
                            class="text-subtitle2 poppins-bold text-red-8 full-width"
                            v-if="item.subtitle != null"
                        >{{ item.subtitle }}</div>
                        <div class="text-h6">{{ item.title }}</div>
                    </div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div
                        v-if="item.price"
                        class="text-h6 poppins-bold"
                    >$ {{ item.price.toFixed(2) }}</div>
                    <div class="text-caption text-grey">{{ item.desc }}</div>
                </q-card-section>

                <q-separator />

                <q-card-actions>
                    <q-space />
                    <q-btn flat color="amber-14" @click="selectItem(i)">Agregar</q-btn>
                </q-card-actions>
            </q-card>
            <!-- END MENU ITEMS -->

            <!-- STYLES DIALOG -->
            <q-dialog v-model="stylesDialog">
                <q-card style="width: 700px; max-width: 80vw;" class="bg-grey-2">
                    <q-card-section class="q-py-sm">
                        <div class="text-h6 text-center poppins-bold">TOPPING</div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                        <q-btn
                            text-color="amber-14"
                            outline
                            class="poppins-bold full-width q-mb-md"
                            v-for="(style, i) in menu[selectedItemIndex].styles"
                            :key="i"
                            @click="handleDialogs('style', style)"
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
                        >Cancelar</q-btn>
                    </q-card-section>
                </q-card>
            </q-dialog>
            <!-- END STYLES DIALOG -->

            <!-- OPTIONS DIALOG -->
            <q-dialog v-model="optionsDialog">
                <q-card style="width: 700px; max-width: 80vw;" class="bg-grey-2">
                    <q-card-section class="q-py-sm">
                        <div class="text-h6 text-center poppins-bold">SABOR</div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                        <q-btn
                            text-color="amber-14"
                            outline
                            class="poppins-bold full-width q-mb-md"
                            v-for="(option, i) in menu[selectedItemIndex]
                                .options"
                            :key="i"
                            @click="handleDialogs('option', option)"
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
                        >Cancelar</q-btn>
                    </q-card-section>
                </q-card>
            </q-dialog>
            <!-- END OPTIONS DIALOG -->

            <!-- SIDE DIALOG -->
            <q-dialog v-model="sideDialog">
                <q-card style="width: 700px; max-width: 80vw;" class="bg-grey-2">
                    <q-card-section class="q-py-sm">
                        <div class="text-h6 text-center poppins-bold">RELLENO</div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                        <q-btn
                            text-color="amber-14"
                            outline
                            class="poppins-bold full-width q-mb-md"
                            v-for="(side, i) in menu[selectedItemIndex]
                                .sides"
                            :key="i"
                            @click="handleDialogs('side', side)"
                        >
                            {{ side.title }}
                            <br />
                            {{
                            side.price > 0
                            ? '$' + side.price.toFixed(2)
                            : ''
                            }}
                        </q-btn>
                        <q-btn
                            color="red-7"
                            flat
                            class="poppins-bold full-width q-mb-md"
                            @click="sideDialog = false"
                        >Cancelar</q-btn>
                    </q-card-section>
                </q-card>
            </q-dialog>
            <!-- END SIDE DIALOG -->

            <!-- SUCCESS DIALOG -->
            <q-dialog v-model="successDialog">
                <q-card style="width: 700px; max-width: 80vw;" class="bg-grey-2">
                    <q-card-section>
                        <div class="text-h6 text-center poppins-bold">Agregado con exito</div>
                    </q-card-section>
                    <q-card-section>
                        <q-btn
                            color="amber-14"
                            outline
                            class="poppins-bold full-width q-mb-md"
                            @click="successDialog = false"
                        >Aceptar</q-btn>
                    </q-card-section>
                </q-card>
            </q-dialog>
            <!-- END SUCCESS DIALOG -->

            <!-- LOCATION DIALOG -->
            <q-dialog v-model="locationDialog" persistent>
                <q-card style="width: 700px; max-width: 80vw;" class="bg-grey-2">
                    <q-card-section>
                        <div
                            class="text-subtitle2 text-center poppins-bold text-red-7"
                        >Arrastra el marcador del mapa a la ubicacion donde deseas recibir tu pedido.</div>
                    </q-card-section>
                    <q-card-section>
                        <q-btn
                            color="black"
                            outline
                            class="poppins-bold full-width q-mb-md"
                            @click="locationDialog = false"
                        >Aceptar</q-btn>
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
                    <q-bar style="height: 45px;">
                        <q-space />
                        <q-btn dense flat icon="close" size="lg" v-close-popup></q-btn>
                    </q-bar>
                    <q-card-section>
                        <div class="text-h6 text-center poppins-bold">Detalle de pedido</div>
                    </q-card-section>

                    <q-card-section v-if="cart.length > 0">
                        <div class="row q-mb-md" v-for="(item, i) in cart" :key="i">
                            <div class="col-2">
                                <q-btn color="red-7" size="sm" @click="removeItemFromCart(i)">
                                    <i class="fas fa-times"></i>
                                </q-btn>
                            </div>

                            <div class="col">
                                <div class="text-body2 poppins-regular">
                                    <template v-if="item.type =='main'">
                                        <strong>({{ item.amount }}) {{ item.title }} - {{ item.options.title }}</strong>
                                    </template>
                                    <template v-if="item.type == 'double'">
                                        <strong>({{ item.amount }}) {{ item.title }}</strong>
                                        <br />
                                        <span v-for="(el, i) in 2" :key="i">
                                            Sabor: {{item.options[i].title}} - Topping: {{item.styles[i].title}}
                                            <span
                                                v-if="item.sides.length > 0"
                                            >- Relleno: {{item.sides[i].title}}</span>
                                            <br />
                                        </span>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-section v-else>
                        <div class="row">
                            <div class="col text-grey-6 text-center">
                                <i class="fas fa-utensils q-mt-lg q-mb-md" style="font-size: 75px;"></i>
                                <div class="text-h5 poppins-bold q-mb-lg">Tu carrito esta vacio</div>
                            </div>
                        </div>
                    </q-card-section>

                    <q-separator dark />
                    <q-card-section>
                        <div class="row text-center">
                            <div class="col">
                                <div class="text-h6 poppins-bold q-mb-md">Datos de orden</div>
                            </div>
                        </div>
                        <div class="row q-mb-md">
                            <div class="text-subtitle2 poppins-bold q-mb-sm">Nombre: *</div>
                            <q-input
                                v-model="name"
                                filled
                                dark
                                type="text"
                                class="full-width poppins-regular"
                                placeholder="Nombre Apellido"
                                color="red-7"
                                data-hj-allow
                            />
                        </div>
                        <!-- <div class="row q-mb-md">
                            <div
                                class="text-subtitle2 poppins-bold q-mb-sm"
                            >Comentarios especiales de tu pedido:</div>
                            <q-input
                                v-model="specialComments"
                                filled
                                dark
                                type="textarea"
                                class="full-width poppins-regular"
                                placeholder="Las hamburguesas sin ketchup porfavor."
                                color="red-7"
                                rows="4"
                                data-hj-allow
                            />
                        </div>-->
                        <div class="row q-mb-md">
                            <div class="text-subtitle2 poppins-bold q-mb-sm">Metodo de entrega: *</div>
                            <q-btn-toggle
                                v-model="selectedPickupMethod"
                                spread
                                all-caps
                                class="poppins-bold full-width"
                                toggle-color="amber-14"
                                color="white"
                                text-color="black"
                                :options="pickupMethods"
                            />
                        </div>
                        <div class="row" v-if="this.selectedPickupMethod == 'Delivery'">
                            <div
                                class="text-subtitle2 poppins-bold q-mb-sm full-width"
                            >Ubicacion de entrega: *</div>
                            <div
                                class="text-subtitle2 poppins-bold q-mb-md text-red-7"
                            >Para mover el marcador debes arrastrarlo a la ubicacion que deseas recibir tu pedido.</div>
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
                        <div class="row q-mb-md" v-if="selectedPickupMethod == 'Delivery'">
                            <div
                                class="text-subtitle2 poppins-bold q-mb-sm"
                            >Direccion de entrega (completa): *</div>
                            <q-input
                                v-model="address"
                                filled
                                dark
                                type="textarea"
                                class="full-width poppins-regular"
                                placeholder="Barriada, No. Calle, No. Casa"
                                color="amber-14"
                                rows="4"
                                data-hj-allow
                            />
                        </div>
                        <div class="row">
                            <div class="text-subtitle2 poppins-bold q-mb-sm">Metodo de pago: *</div>
                            <q-btn-toggle
                                v-model="selectedPaymentMethod"
                                spread
                                all-caps
                                class="poppins-bold full-width"
                                toggle-color="amber-14"
                                color="white"
                                text-color="black"
                                :options="paymentMethods"
                            />
                            <div
                                class="text-subtitle2 text-center q-mt-lg poppins-bold"
                                v-if="selectedPaymentMethod == 'Yappy'"
                            >
                                Recuerda enviar el comprobante de pago por
                                WhatsApp.
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-section v-if="cart.length > 0">
                        <div class="row">
                            <div class="col text-center">
                                <div class="text-h5 poppins-bold">Total: $ {{ total.toFixed(2) }}</div>
                                <div
                                    class="text-subtitle2 poppins-bold text-red-8"
                                    v-if="selectedPickupMethod == 'Delivery'"
                                >Sin costos por delivery.</div>
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <q-btn
                            color="green-7"
                            class="full-width q-mb-md poppins-bold"
                            @click="sendChat"
                            :disable="cart.length <= 0"
                        >Enviar</q-btn>
                    </q-card-section>
                </q-card>
            </q-dialog>
            <!-- END CART DIALOG -->

            <!-- NEW DIALOG -->
            <q-dialog v-model="seamless" seamless position="bottom">
                <q-card style="width: 350px; border-radius: 0;" class="bg-amber-14 text-white">
                    <q-card-section class="row items-center no-wrap">
                        <div>
                            <div class="text-h6 poppins-bold">
                                <span class="text-subtitle2 poppins-bold">Total:</span>
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
            whatsappNumber: '66051517',
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
            sideDialog: false,
            successDialog: false,
            cartDialog: false,
            locationDialog: false,
            cart: [],
            menu: [
                {
                    title: 'Marquesas',
                    desc:
                        'Elija entre 3 deliciosos sabores de marquesas. Chocolate con topping de Oreo y Cocosete, Maracuyá o Limón.',
                    type: 'main',
                    pic: 'marquesas.jpg',
                    price: 3,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Maracuyá',
                            price: 0,
                        },
                        {
                            title: 'Limón',
                            price: 0,
                        },
                        {
                            title: 'Chocolate',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Batidos de helados',
                    desc:
                        'Elija entre 6 deliciosos sabores de batidos de helado. Fresa y Oreo, Oreo, Chocolate, Fresa, Cocosete o Vainilla.',
                    type: 'main',
                    pic: '',
                    price: 0,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Fresa y Oreo',
                            price: 3.5,
                        },
                        {
                            title: 'Oreo',
                            price: 3.5,
                        },
                        {
                            title: 'Chocolate',
                            price: 3,
                        },
                        {
                            title: 'Fresa',
                            price: 3,
                        },
                        {
                            title: 'Cocosete',
                            price: 3.5,
                        },
                        {
                            title: 'Vainilla',
                            price: 2.5,
                        },
                    ],
                },
                {
                    title: '2 Cupcakes sencillos',
                    desc:
                        'Dos cupcakes sencillos con los sabores que mas gustes.',
                    type: 'double',
                    pic: 'cupcakes_sencillos.jpeg',
                    price: 2.5,
                    count: 1,
                    styles: [
                        {
                            title: 'Oreo',
                            price: 0,
                        },
                        {
                            title: 'Pirucream',
                            price: 0,
                        },
                        {
                            title: 'Skittles',
                            price: 0,
                        },
                        {
                            title: 'Hersheys',
                            price: 0,
                        },
                    ],
                    sides: [],
                    options: [
                        {
                            title: 'Chocolate',
                            price: 0,
                        },
                        {
                            title: 'Marmolado',
                            price: 0,
                        },
                        {
                            title: 'Vainilla',
                            price: 0,
                        },
                    ],
                },
                {
                    title: '2 Cupcakes rellenos',
                    desc:
                        'Dos cupcakes rellenos con los sabores que mas gustes.',
                    type: 'double',
                    pic: 'cupcakes.jpeg',
                    price: 3,
                    count: 1,
                    styles: [
                        {
                            title: 'Oreo',
                            price: 0,
                        },
                        {
                            title: 'Pirucream',
                            price: 0,
                        },
                        {
                            title: 'Skittles',
                            price: 0,
                        },
                        {
                            title: 'Hersheys',
                            price: 0,
                        },
                    ],
                    sides: [
                        {
                            title: 'Chocolate',
                            price: 0,
                        },
                        {
                            title: 'Dulce de leche',
                            price: 0,
                        },
                        {
                            title: 'Fresa',
                            price: 0,
                        },
                        {
                            title: 'Chocomani',
                            price: 0,
                        },
                    ],
                    options: [
                        {
                            title: 'Chocolate',
                            price: 0,
                        },
                        {
                            title: 'Marmolado',
                            price: 0,
                        },
                        {
                            title: 'Vainilla',
                            price: 0,
                        },
                    ],
                },
            ],
        }
    },
    methods: {
        selectItem(index) {
            this.selectedItemIndex = index
            this.selectedItem = JSON.parse(JSON.stringify(this.menu[index]))
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
        addItemToCart() {
            if (this.menu[this.selectedItemIndex].count === 0) {
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
                            c.styles.title === this.selectedItem.styles.title &&
                            c.sides.title === this.selectedItem.sides.title
                        ) {
                            c.amount++
                        }
                    })
                    this.optionsDialog = false
                    this.successDialog = true
                    this.calculateTotal()
                }
            } else {
                this.selectedItem.amount = 1
                this.cart.push(this.selectedItem)
                this.optionsDialog = false
                this.successDialog = true
                this.calculateTotal()
            }
        },

        handleDialogs(section, item) {
            //option, style, side
            if (section === 'option') {
                if (this.selectedItem.count > 0) {
                    this.selectedItem.options = []
                    this.selectedItem.options.push(item)
                } else {
                    if (this.menu[this.selectedItemIndex].count === 0) {
                        this.selectedItem.options = item
                    } else {
                        this.selectedItem.options.push(item)
                    }
                }
                this.optionsDialog = false
                if (this.menu[this.selectedItemIndex].styles.length > 0) {
                    this.stylesDialog = true
                } else {
                    this.addItemToCart()
                }
            }
            if (section === 'style') {
                if (this.selectedItem.count > 0) {
                    this.selectedItem.styles = []
                    this.selectedItem.styles.push(item)
                } else {
                    if (this.menu[this.selectedItemIndex].count === 0) {
                        this.selectedItem.styles = item
                    } else {
                        this.selectedItem.styles.push(item)
                    }
                }
                this.stylesDialog = false
                if (this.menu[this.selectedItemIndex].sides.length > 0) {
                    this.sideDialog = true
                } else {
                    if (this.menu[this.selectedItemIndex].count === 0) {
                        this.addItemToCart()
                    } else {
                        if (this.selectedItem.count === 0) {
                            this.addItemToCart()
                        } else {
                            this.selectedItem.count--
                            this.optionsDialog = true
                        }
                    }
                }
            }
            if (section === 'side') {
                if (this.selectedItem.count > 0) {
                    this.selectedItem.sides = []
                    this.selectedItem.sides.push(item)
                    this.selectedItem.count--
                    this.sideDialog = false
                    this.optionsDialog = true
                } else {
                    this.sideDialog = false
                    if (this.menu[this.selectedItemIndex].count === 0) {
                        this.selectedItem.sides = item
                    } else {
                        this.selectedItem.sides.push(item)
                    }
                    this.optionsDialog = false
                    this.addItemToCart()
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
                if (c.sides.price) total += c.sides.price * c.amount
            })
            this.total = total
        },
        generateMessage() {
            let message =
                'Buenas me gustaria realizar un pedido de:%0D%0A%0D%0A'
            for (let item of this.cart) {
                if (item.type == 'main') {
                    message += `- (${item.amount}) ${item.title} - ${item.options.title}%0D%0A`
                }
                if (item.type == 'double') {
                    let s = ''
                    for (let i = 0; i < 2; i++) {
                        s += `*Sabor:* ${item.options[i].title} `
                        s += `*Topping:* ${item.styles[i].title} `
                        if (item.sides.length > 0) {
                            s += `*Relleno:* ${item.sides[i].title}`
                        }
                        if (i < 1) s += `%0D%0A`
                    }
                    message += `- (${item.amount}) ${item.title}%0D%0A${s}%0D%0A`
                }
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
                if (item.type == 'main') {
                    message += `(${item.amount}) ${item.title} ${item.options.title}\n`
                }
                if (item.type == 'double') {
                    let s = ''
                    for (let i = 0; i < 2; i++) {
                        s += `Sabor: ${item.options[i].title} `
                        s += `Topping: ${item.styles[i].title} `
                        if (item.sides.length > 0) {
                            s += `Relleno: ${item.sides[i].title}`
                        }
                        if (i < 1) s += `\n`
                    }
                    message += `- (${item.amount}) ${item.title}\n${s}\n`
                }
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
                'https://script.google.com/macros/s/AKfycbzlwJKrbpmb1YrfSv7106EQsOAQ-YHx4Kb_cLS8Dn2p-85IOQvs/exec'
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
                this.$analytics.logEvent('wp-panamahotdog', {
                    content_action: 'Orden Completada',
                })
                await this.sendToGoogleDriveSheet()
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
