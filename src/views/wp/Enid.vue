<template>
    <q-page class>
        <q-img :src="require('@/assets/wp/enid/logo.jpg')" class="shadow-5" />
        <div class="q-pa-md">
            <div class="text-h5 text-center q-mt-sm q-mb-lg poppins-bold">REALIZA TU PEDIDO</div>
            <q-tabs
                v-model="tab"
                class="text-grey"
                active-color="black"
                indicator-color="black"
                align="justify"
                narrow-indicator
            >
                <q-tab name="tradicional" label="Tradicional" />
                <q-tab name="gourmet" label="Gourmet" />
            </q-tabs>
            <!-- MENU ITEMS -->
            <q-card
                class="full-width q-mb-lg text-center"
                v-for="(item, i) in returnFilteredMenu(menu)"
                :key="i"
            >
                <q-img v-if="item.pic" :src="require(`@/assets/wp/demo/${item.pic}`)" />
                <q-card-section class="q-pb-none">
                    <div class="row">
                        <div class="col text-h6">{{ item.title }}</div>
                    </div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div
                        v-if="item.price"
                        class="text-h6 poppins-bold"
                    >$ {{ item.price.toFixed(2) }}</div>
                    <div
                        class="text-caption text-grey"
                        v-for="(option,i) in item.options"
                        :key="i"
                    >{{ option.title }} -${{option.price.toFixed(2)}}</div>
                </q-card-section>

                <q-separator />

                <q-card-actions>
                    <q-space />
                    <q-btn color="amber" @click="selectItem(i)">Agregar</q-btn>
                </q-card-actions>
            </q-card>
            <!-- END MENU ITEMS -->

            <!-- OPTIONS DIALOG -->
            <q-dialog v-model="optionsDialog">
                <q-card style="width: 700px; max-width: 80vw;" class="bg-grey-2">
                    <q-card-section class="q-py-sm">
                        <div class="text-h6 text-center poppins-bold">ELIJA</div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                        <q-btn
                            color="green-7"
                            class="poppins-bold full-width q-mb-md"
                            v-for="(option, i) in menu[selectedItemIndex].options"
                            :key="i"
                            @click="addItemToCart(option)"
                        >
                            {{ option.title }}
                            <br />
                            {{ option.price > 0 ? '$'+option.price.toFixed(2):'' }}
                        </q-btn>
                        <q-btn
                            color="red-7"
                            class="poppins-bold full-width q-mb-md"
                            @click="optionsDialog = false"
                        >Cancelar</q-btn>
                    </q-card-section>
                </q-card>
            </q-dialog>
            <!-- END OPTIONS DIALOG -->

            <!-- SUCCESS DIALOG -->
            <q-dialog v-model="successDialog">
                <q-card style="width: 700px; max-width: 80vw;" class="bg-grey-2">
                    <q-card-section>
                        <div class="text-h6 text-center poppins-bold">Agregado con exito</div>
                    </q-card-section>
                    <q-card-section>
                        <q-btn
                            color="green-7"
                            class="poppins-bold full-width q-mb-md"
                            @click="successDialog = false"
                        >Aceptar</q-btn>
                    </q-card-section>
                </q-card>
            </q-dialog>
            <!-- END SUCCESS DIALOG -->

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
                                    <strong v-if="item.type == 'main'">
                                        ({{ item.amount }}) {{ item.title }} con
                                        {{item.options.title}}
                                    </strong>
                                    <strong
                                        v-if="item.type == 'extras'"
                                    >({{ item.amount }}) Extra - {{item.options.title}}</strong>
                                    <strong
                                        v-if="item.type == 'drinks'"
                                    >({{ item.amount }}) Bebida - {{item.options.title}}</strong>
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
                        <div class="row q-mb-md">
                            <div
                                class="text-subtitle2 poppins-bold q-mb-sm"
                            >Direccion de entrega (completa):</div>
                            <q-input
                                v-model="address"
                                filled
                                dark
                                type="textarea"
                                class="full-width poppins-regular"
                                placeholder="Barriada, No. Calle, No. Casa"
                                color="orange-9"
                                rows="4"
                            />
                        </div>
                        <div class="row">
                            <div class="text-subtitle2 poppins-bold q-mb-sm">Metodo de pago:</div>
                            <q-btn-toggle
                                v-model="selectedPaymentMethod"
                                spread
                                all-caps
                                class="poppins-bold full-width"
                                toggle-color="orange-9"
                                color="white"
                                text-color="black"
                                :options="paymentMethods"
                            />
                        </div>
                    </q-card-section>
                    <q-card-section v-if="cart.length > 0">
                        <div class="row">
                            <div class="col text-center">
                                <div class="text-h5 poppins-bold">Total: $ {{ total.toFixed(2) }}</div>
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
                <q-card style="width: 350px; border-radius: 0;" class="bg-orange-9 text-white">
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
            selectedItemIndex: 0,
            seamless: false,
            whatsappNumber: '68376602',
            selectedItem: {},
            paymentMethods: [
                {label: 'Yappy', value: 'Yappy'},
                {label: 'Efectivo', value: 'Efectivo'},
            ],
            selectedPaymentMethod: null,
            address: '',
            total: 0,
            tab: 'tradicional',
            optionsDialog: false,
            successDialog: false,
            cartDialog: false,
            cart: [],
            menu: [
                {
                    title: 'Ceviche de Pescado',
                    options: [
                        {
                            title: '8 oz',
                            price: 4,
                        },
                        {
                            title: 'Pinta',
                            price: 7,
                        },
                        {
                            title: '1/4 G.',
                            price: 13.5,
                        },
                        {
                            title: '1/2 G.',
                            price: 20,
                        },
                    ],
                    type: 'main',
                    desc:
                        'Ceviches de pescado tradicional en diversas presentaciones.',
                    filter: 'tradicional',
                },
                {
                    title: 'Ceviche de Pulpo',
                    options: [
                        {
                            title: '8 oz',
                            price: 4.75,
                        },
                        {
                            title: 'Pinta',
                            price: 10,
                        },
                        {
                            title: '1/4 G.',
                            price: 18,
                        },
                        {
                            title: '1/2 G.',
                            price: 30,
                        },
                    ],
                    type: 'main',
                    desc:
                        'Ceviches de Pulpo tradicional en diversas presentaciones.',
                    filter: 'tradicional',
                },
                {
                    title: 'Ceviche Mixto',
                    options: [
                        {
                            title: '8 oz',
                            price: 5.5,
                        },
                        {
                            title: 'Pinta',
                            price: 10,
                        },
                        {
                            title: '1/4 G.',
                            price: 18,
                        },
                        {
                            title: '1/2 G.',
                            price: 30,
                        },
                    ],
                    type: 'main',
                    desc:
                        'Ceviches Mixto tradicional en diversas presentaciones.',
                    filter: 'tradicional',
                },
                {
                    title: 'Ceviche de Camaron',
                    options: [
                        {
                            title: '8 oz',
                            price: 4.75,
                        },
                        {
                            title: 'Pinta',
                            price: 12,
                        },
                        {
                            title: '1/4 G.',
                            price: 20,
                        },
                        {
                            title: '1/2 G.',
                            price: 38,
                        },
                    ],
                    type: 'main',
                    desc:
                        'Ceviches de camaron tradicional en diversas presentaciones.',
                    filter: 'tradicional',
                },

                {
                    title: 'Ceviche de Pescado',
                    options: [
                        {
                            title: '8 oz',
                            price: 6.5,
                        },
                        {
                            title: 'Pinta',
                            price: 12,
                        },
                        {
                            title: '1/4 G.',
                            price: 20,
                        },
                    ],
                    type: 'main',
                    desc:
                        'Ceviches de pescado gourmet en diversas presentaciones.',
                    filter: 'gourmet',
                },
                {
                    title: 'Ceviche de Camaron',
                    options: [
                        {
                            title: '8 oz',
                            price: 7.25,
                        },
                        {
                            title: 'Pinta',
                            price: 13.5,
                        },
                        {
                            title: '1/4 G.',
                            price: 22,
                        },
                    ],
                    type: 'main',
                    desc:
                        'Ceviches de camaron gourmet en diversas presentaciones.',
                    filter: 'gourmet',
                },
                {
                    title: 'Ceviche Mixto',
                    options: [
                        {
                            title: '8 oz',
                            price: 8,
                        },
                        {
                            title: 'Pinta',
                            price: 15,
                        },
                        {
                            title: '1/4 G.',
                            price: 22,
                        },
                    ],
                    type: 'main',
                    desc: 'Ceviches mixto gourmet en diversas presentaciones.',
                    filter: 'gourmet',
                },
            ],
        }
    },
    methods: {
        returnFilteredMenu(menu) {
            return menu.filter(m => {
                if (m.filter === this.tab) {
                    return m
                }
            })
        },
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
                if (item.type == 'main')
                    message += `- (${item.amount}) ${item.title} con ${item.options.title}%0D%0A`
                if (item.type == 'extras')
                    message += `- (${item.amount}) Extra - ${item.options.title}%0D%0A`
                if (item.type == 'drinks')
                    message += `- (${item.amount}) Bebida - ${item.options.title}%0D%0A`
            }
            message += `%0D%0ADireccion: ${this.address}%0D%0AMetodo de pago: ${
                this.selectedPaymentMethod
            }%0D%0ATotal: $ ${this.total.toFixed(2)}`
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
                this.$analytics.logEvent('wp-enid', {
                    content_action: 'Orden Completada',
                })
                window.location.href = `https://wa.me/507${
                    this.whatsappNumber
                }?text=${this.generateMessage()}`
            }
        },
    },

    watch: {
        selectedArea() {
            this.cart = []
            this.calculateTotal()
        },
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
    },
    mounted() {
        this.$store.commit('SET_DISPLAYFOOTER', false)
        let path = this.$route.params.path
        this.$analytics.logEvent('wp-enid', {
            path,
        })
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
