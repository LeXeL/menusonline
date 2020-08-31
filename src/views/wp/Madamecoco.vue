<template>
    <q-page class="bg-grey-2 text-brown-9">
        <q-img :src="require('@/assets/wp/madamecoco/logo.jpg')" class="shadow-5" />
        <div class="q-pa-md">
            <div class="text-h5 text-center q-mt-sm q-mb-lg poppins-bold">REALIZA TU PEDIDO</div>

            <!-- MENU ITEMS -->
            <div class="row q-mb-xl" v-for="(item, i) in menu" :key="i">
                <!-- <div class="col">
                    <q-img class="rounded-borders" :src="require(`@/assets/wp/demo/${item.pic}`)" />
                </div>-->
                <div class="col q-px-md">
                    <div class="text-h5 q-mb-sm poppins-bold">{{ item.title }}</div>
                    <div class="text-body2 q-mb-sm poppins-regular">{{ item.desc }}</div>
                    <div
                        class="text-h6 q-mb-md poppins-bold"
                        v-if="item.price != null"
                    >$ {{ item.price.toFixed(2) }}</div>
                    <q-btn
                        color="orange-8"
                        text-color="white"
                        class="poppins-bold full-width"
                        @click="selectItem(i)"
                    >Agregar</q-btn>
                </div>
            </div>
            <!-- END MENU ITEMS -->

            <!-- ADDRESS INPUT -->
            <div class="row q-my-lg q-pt-lg">
                <div class="text-h6 q-mb-md poppins-bold">Direccion de entrega (completa)</div>
                <q-input
                    v-model="address"
                    filled
                    type="textarea"
                    class="full-width poppins-regular"
                    placeholder="Barriada, No. Calle, No. Casa"
                    color="orange-9"
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
                    color="orange-9"
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
                <q-card style="width: 700px; max-width: 80vw;" class="bg-grey-9">
                    <q-card-section>
                        <div class="text-h6 text-center poppins-bold text-white">ELIJA</div>
                    </q-card-section>
                    <q-card-section>
                        <q-btn
                            color="green-7"
                            class="poppins-bold full-width q-mb-md"
                            v-for="(option, i) in selectedItem.options"
                            :key="i"
                            @click="addItemToCart(option)"
                        >
                            {{ option.title }}
                            <br />
                            $ {{ option.price.toFixed(2) }}
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
                <q-card style="width: 700px; max-width: 80vw;" class="bg-grey-9">
                    <q-card-section>
                        <div class="text-h6 text-center poppins-bold text-white">Agregado con exito</div>
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
                <q-card
                    style="width: 700px; max-width: 80vw;"
                    class="bg-grey-9 text-white"
                    v-if="cart.length > 0"
                >
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
                                <div class="text-body2 q-pl-sm poppins-regular">
                                    <strong
                                        v-if="item.type == 'main'"
                                    >({{ item.amount }}) {{ item.title }}</strong>
                                    <strong
                                        v-if="item.type == 'extras'"
                                    >({{ item.amount }}) Extra - {{ item.title }}</strong>
                                    <strong
                                        v-if="item.type == 'drinks'"
                                    >({{ item.amount }}) Bebida - {{ item.title }}</strong>
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
                <q-card style="width: 700px; max-width: 80vw;" class="bg-grey-9" v-else>
                    <q-card-section>
                        <div
                            class="text-h6 text-center poppins-bold text-white"
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
            whatsappNumber: '62042578',
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
                    title: 'Corvina frita con escabeche',
                    desc: 'Acompañado con arroz blanco y plátano en tentación.',
                    type: 'main',
                    price: 11,
                },
                {
                    title: 'Dedos de pescado',
                    desc: 'Acompañado de arroz blanco y plátano en tentación.',
                    type: 'main',
                    price: 9,
                },
                {
                    title: 'Filete de pescado empanizado',
                    desc: 'Para 4 personas - no  incluye acompañamientos.',
                    type: 'main',
                    price: 15,
                },
                {
                    title: 'Menu Kids',
                    desc:
                        'Deditos de pescados empanizados acompañados de papas fritas.',
                    type: 'main',
                    price: 5,
                },
                {
                    title: 'Extras',
                    desc:
                        'Orden extra de arroz con coco, papas fritas o arroz blanco.',
                    type: 'extras',
                    options: [
                        {
                            title: 'Orden de arroz con coco',
                            price: 2.5,
                        },
                        {
                            title: 'Orden de papas fritas',
                            price: 2,
                        },
                        {
                            title: 'Orden grande de arroz con coco',
                            price: 5,
                        },
                        {
                            title: 'Orden grande de arroz blanco',
                            price: 4,
                        },
                        {
                            title: 'Orden grande de papas fritas',
                            price: 4,
                        },
                    ],
                },
                {
                    title: 'Bebidas',
                    desc: 'Limonada con raspadura, Coca Cola.',
                    type: 'drinks',
                    options: [
                        {
                            title: 'Limonada con raspadura',
                            price: 2,
                        },
                        {
                            title: 'Coca Cola',
                            price: 1.5,
                        },
                    ],
                    price: 5,
                },
                {
                    title: 'Botella de picante',
                    type: 'main',
                    desc: '',
                    price: 5,
                },
            ],
        }
    },
    methods: {
        selectItem(index) {
            this.selectedItem = {}
            if (this.menu[index].type == 'main') {
                this.selectedItem = Object.assign({}, this.menu[index])
                this.addItemToCart(this.selectedItem)
            } else {
                this.selectedItem = Object.assign({}, this.menu[index])
                this.optionsDialog = true
            }
        },
        checkIfDuplicate() {
            let isDuplicate = false
            if (this.cart.length <= 0) {
                isDuplicate = false
            }

            this.cart.forEach(c => {
                if (
                    c.type === this.selectedItem.type &&
                    c.title === this.selectedItem.title
                ) {
                    isDuplicate = true
                }
            })

            return isDuplicate
        },
        addItemToCart(option) {
            option.type = this.selectedItem.type
            if (this.selectedItem.type === 'extras') {
                this.selectedItem.title = option.title
            }
            if (!this.checkIfDuplicate()) {
                option.amount = 1
                this.cart.push(option)
                this.optionsDialog = false
                this.successDialog = true
                this.calculateTotal()
            } else {
                console.log('entro aqui')
                this.cart.forEach(c => {
                    if (
                        c.type === this.selectedItem.type &&
                        c.title === this.selectedItem.title
                    ) {
                        c.amount++
                    }
                })
                this.optionsDialog = false
                this.successDialog = true
                this.calculateTotal()
            }
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
            let message =
                'Buenas, me gustaria realizar un pedido de:%0D%0A%0D%0A'
            for (let item of this.cart) {
                if (item.title != 'Bebidas')
                    message += `- (${item.amount}) ${item.title} con ${item.selectedOption}%0D%0A`
                else
                    message += `- (${item.amount}) Bebida - ${item.selectedOption}%0D%0A`
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
                window.location.href = `https://wa.me/507${
                    this.whatsappNumber
                }?text=${this.generateMessage()}`
            }
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
