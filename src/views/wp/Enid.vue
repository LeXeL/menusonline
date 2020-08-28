<template>
    <q-page class>
        <q-img :src="require('@/assets/wp/enid/logo.jpg')" class="shadow-5" />
        <div class="q-pa-md">
            <div class="text-h5 text-center q-mt-sm q-mb-lg poppins-bold">REALIZA TU PEDIDO</div>

            <!-- TABS -->
            <q-card>
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

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="tradicional">
                        <!-- MENU ITEMS -->
                        <div class="row q-mb-xl" v-for="(item, i) in filterTraditional" :key="i">
                            <div class="col q-px-md text-center">
                                <div class="text-h5 q-mb-sm poppins-bold">{{ item.title }}</div>
                                <div
                                    class="text-body2 q-mb-sm poppins-regular"
                                    v-for="(option, i) in item.options"
                                    :key="i"
                                >{{ option.option }} - $ {{ option.price.toFixed(2) }}</div>
                                <q-btn
                                    color="yellow"
                                    text-color="black"
                                    class="poppins-bold full-width"
                                    @click="selectItem(i)"
                                >Agregar</q-btn>
                            </div>
                        </div>
                        <!-- END MENU ITEMS -->
                    </q-tab-panel>

                    <q-tab-panel name="gourmet">
                        <!-- MENU ITEMS -->
                        <div class="row q-mb-xl" v-for="(item, i) in filterGourmet" :key="i">
                            <div class="col q-px-md text-center">
                                <div class="text-h5 q-mb-sm poppins-bold">{{ item.title }}</div>
                                <div
                                    class="text-body2 q-mb-sm poppins-regular"
                                    v-for="(option, i) in item.options"
                                    :key="i"
                                >{{ option.option }} - $ {{ option.price.toFixed(2) }}</div>
                                <q-btn
                                    color="yellow"
                                    text-color="black"
                                    class="poppins-bold full-width"
                                    @click="selectItem(i)"
                                >Agregar</q-btn>
                            </div>
                        </div>
                        <!-- END MENU ITEMS -->
                    </q-tab-panel>
                </q-tab-panels>
            </q-card>

            <!-- END TABS -->

            <!-- ADDRESS INPUT -->
            <div class="row q-my-lg q-pt-lg">
                <div class="text-h6 q-mb-md poppins-bold">Direccion de entrega (completa)</div>
                <q-input
                    v-model="address"
                    filled
                    type="textarea"
                    class="full-width poppins-regular"
                    placeholder="Barriada, No. Calle, No. Casa"
                    color="black"
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
                    color="black"
                    size="md"
                />
            </div>
            <!-- END PAYMENT METHOD RADIOS -->

            <hr dark />

            <!-- TOTAL TO PAY -->
            <div class="row q-my-lg">
                <div class="col">
                    <div class="text-h5 text-right poppins-bold">Total: $ {{ total.toFixed(2) }}</div>
                </div>
            </div>
            <!-- END TOTAL TO PAY -->

            <!-- VIEW CART BUTTON -->
            <div class="row q-mb-md">
                <q-btn
                    color="green-7"
                    class="full-width poppins-bold"
                    @click="cartDialog = true"
                >Ver carrito</q-btn>
            </div>
            <!-- END VIEW CART BUTTON -->

            <!-- OPTIONS DIALOG -->
            <q-dialog v-model="optionsDialog">
                <q-card style="width: 700px; max-width: 80vw;">
                    <q-card-section>
                        <div class="text-h6 text-center poppins-bold">ELIJA</div>
                    </q-card-section>
                    <q-card-section>
                        <q-btn
                            color="green-7"
                            class="poppins-bold full-width q-mb-md"
                            v-for="(option, i) in selectedItem.options"
                            :key="i"
                            @click="addItemToCart(option)"
                        >{{ option.option }} - $ {{ option.price.toFixed(2) }}</q-btn>
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
                <q-card style="width: 700px; max-width: 80vw;">
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
            <q-dialog v-model="cartDialog">
                <q-card style="width: 700px; max-width: 80vw;" v-if="cart.length > 0">
                    <q-card-section>
                        <div class="text-h6 text-center poppins-bold">Detalle de pedido</div>
                    </q-card-section>
                    <q-card-section>
                        <div class="row q-mb-md" v-for="(item, i) in cart" :key="i">
                            <div class="col-2">
                                <q-btn color="red-7" size="sm" @click="removeItemFromCart(i)">
                                    <i class="fas fa-times"></i>
                                </q-btn>
                            </div>

                            <div class="col">
                                <div
                                    class="text-body2 q-pl-sm poppins-regular"
                                    v-if="item.title != 'Bebidas'"
                                >
                                    <strong>
                                        ({{ item.amount }})
                                        Ceviche de {{ item.title }} {{ item.type }} - Tamaño: {{ item.selectedOption }}
                                    </strong>
                                </div>
                                <div class="text-body2 q-pl-sm poppins-regular" v-else>
                                    <strong>
                                        ({{ item.amount }}) Bebida -
                                        {{ item.selectedOption }}
                                    </strong>
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
                        >Enviar</q-btn>
                        <q-btn
                            color="red-7"
                            class="full-width q-mb-md poppins-bold"
                            @click="cartDialog = false"
                        >Cancelar</q-btn>
                    </q-card-section>
                </q-card>
                <q-card style="width: 700px; max-width: 80vw;" class="grey-4" v-else>
                    <q-card-section>
                        <div
                            class="text-h6 text-center poppins-bold"
                        >Primero debes agregar algo a tu pedido.</div>
                    </q-card-section>
                    <q-card-section>
                        <q-btn
                            color="green-7"
                            class="poppins-bold full-width q-mb-md"
                            @click="cartDialog = false"
                        >Aceptar</q-btn>
                    </q-card-section>
                </q-card>
            </q-dialog>
            <!-- END CART DIALOG -->
        </div>
    </q-page>
</template>

<script>
export default {
    data() {
        return {
            whatsappNumber: '68376602',
            tab: 'tradicional',
            selectedArea: null,
            areas: ['Panama Pacifico & Panama Centro', 'Panama Oeste'],
            selectedItem: {},
            paymentMethods: [
                {label: 'Yappy', value: 'Yappy'},
                {label: 'Efectivo', value: 'Efectivo'},
            ],
            selectedPaymentMethod: null,
            address: '',
            total: 0,
            optionsDialog: false,
            successDialog: false,
            cartDialog: false,
            cart: [],
            menu: [
                {
                    title: 'Pescado',
                    options: [
                        {
                            option: '8 oz',
                            price: 4,
                        },
                        {
                            option: 'Pinta',
                            price: 7,
                        },
                        {
                            option: '1/4 G.',
                            price: 13.5,
                        },
                        {
                            option: '1/2 G.',
                            price: 20,
                        },
                    ],
                    type: 'traditional',
                },
                {
                    title: 'Pulpo',
                    options: [
                        {
                            option: '8 oz',
                            price: 4.75,
                        },
                        {
                            option: 'Pinta',
                            price: 10,
                        },
                        {
                            option: '1/4 G.',
                            price: 18,
                        },
                        {
                            option: '1/2 G.',
                            price: 30,
                        },
                    ],
                    type: 'traditional',
                },
                {
                    title: 'Mixto',
                    options: [
                        {
                            option: '8 oz',
                            price: 5.5,
                        },
                        {
                            option: 'Pinta',
                            price: 10,
                        },
                        {
                            option: '1/4 G.',
                            price: 18,
                        },
                        {
                            option: '1/2 G.',
                            price: 30,
                        },
                    ],
                    type: 'traditional',
                },
                {
                    title: 'Camaron',
                    options: [
                        {
                            option: '8 oz',
                            price: 4.75,
                        },
                        {
                            option: 'Pinta',
                            price: 12,
                        },
                        {
                            option: '1/4 G.',
                            price: 20,
                        },
                        {
                            option: '1/2 G.',
                            price: 38,
                        },
                    ],
                    type: 'traditional',
                },

                {
                    title: 'Pescado',
                    options: [
                        {
                            option: '8 oz',
                            price: 6.5,
                        },
                        {
                            option: 'Pinta',
                            price: 12,
                        },
                        {
                            option: '1/4 G.',
                            price: 20,
                        },
                    ],
                    type: 'gourmet',
                },
                {
                    title: 'Camaron',
                    options: [
                        {
                            option: '8 oz',
                            price: 7.25,
                        },
                        {
                            option: 'Pinta',
                            price: 13.5,
                        },
                        {
                            option: '1/4 G.',
                            price: 22,
                        },
                    ],
                    type: 'gourmet',
                },
                {
                    title: 'Mixto',
                    options: [
                        {
                            option: '8 oz',
                            price: 8,
                        },
                        {
                            option: 'Pinta',
                            price: 15,
                        },
                        {
                            option: '1/4 G.',
                            price: 22,
                        },
                    ],
                    type: 'gourmet',
                },
            ],
        }
    },
    methods: {
        selectItem(index) {
            this.selectedItem = {}
            if (this.tab == 'tradicional') {
                this.selectedItem = {
                    title: this.filterTraditional[index].title,
                    options: this.filterTraditional[index].options,
                    type: this.filterTraditional[index].type,
                    amount: 1,
                }
            } else {
                this.selectedItem = {
                    title: this.filterGourmet[index].title,
                    options: this.filterGourmet[index].options,
                    type: this.filterGourmet[index].type,
                    amount: 1,
                }
            }
            this.optionsDialog = true
        },
        addItemToCart(option) {
            this.selectedItem.selectedOption = option.option
            this.selectedItem.price = option.price
            if (this.cart.length == 0) {
                this.cart.push(this.selectedItem)
                this.optionsDialog = false
                this.successDialog = true
                this.calculateTotal()
                return
            }
            for (let i = 0; i < this.cart.length; i++) {
                if (
                    this.cart[i].title == this.selectedItem.title &&
                    this.cart[i].selectedOption ==
                        this.selectedItem.selectedOption
                ) {
                    this.cart[i].amount++
                    this.optionsDialog = false
                    this.successDialog = true
                    this.calculateTotal()
                    return
                }
            }
            this.cart.push(this.selectedItem)
            this.optionsDialog = false
            this.successDialog = true
            this.calculateTotal()
        },
        removeItemFromCart: function (i) {
            this.cart.splice(i, 1)
        },
        calculateTotal: function () {
            let total = 0
            for (let item of this.cart) {
                total += item.amount * item.price
            }
            this.total = total
        },
        generateMessage() {
            let message = 'Buenas, me gustaria realizar un pedido de: '
            for (let item of this.cart) {
                message += `(${item.amount}) Ceviche de ${item.title} ${item.type} tamaño ${item.selectedOption}, `
            }
            message = message.slice(0, -2)
            message += ` - Direccion: ${this.address} - Metodo de pago: ${
                this.selectedPaymentMethod
            } - Total: $ ${this.total.toFixed(2)}`
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
    },
    computed: {
        filterTraditional() {
            let trad = []
            for (let item of this.menu) {
                if (item.type == 'traditional') trad.push(item)
            }
            return trad
        },
        filterGourmet() {
            let gourmet = []
            for (let item of this.menu) {
                if (item.type == 'gourmet') gourmet.push(item)
            }
            return gourmet
        },
    },
    watch: {
        selectedArea: function () {
            this.cart = []
            this.calculateTotal()
        },
        cart: function () {
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
