<template>
    <q-page class="bg-black text-white">
        <q-img :src="require('@/assets/wp/biggfive/logo.jpeg')" />
        <div class="q-pa-md">
            <div class="text-h5 text-center q-mt-sm q-mb-lg afrika">Realiza tu pedido</div>
            <!-- SELECT AREA -->
            <div class="row q-mb-xl">
                <q-select
                    dark
                    filled
                    color="red-7"
                    v-model="selectedArea"
                    :options="areas"
                    label="Selecciona un area"
                    class="full-width q-mb-md"
                />
                <div
                    class="text-body2 text-center"
                    v-if="selectedArea == 'Panama Pacifico & Panama Centro'"
                >
                    <strong>
                        Los pedidos para Panama Pacifico & Panama Centro seran
                        entregados el viernes 28 de agosto.
                    </strong>
                </div>
                <div class="text-body2 text-center" v-if="selectedArea == 'Panama Oeste'">
                    <strong>
                        Los pedidos para Panama Oeste seran entregados el
                        saabdo 29 de agosto.
                    </strong>
                </div>
            </div>
            <!-- END SELECT AREA -->

            <!-- MENU ITEMS -->
            <div class="row q-mb-lg" v-for="(item, i) in menu" :key="i">
                <div class="col">
                    <q-img
                        class="rounded-borders"
                        :src="require(`@/assets/wp/biggfive/${item.pic}`)"
                    />
                </div>
                <div class="col q-px-md">
                    <div class="text-h6 q-mb-sm afrika">{{ item.title }}</div>
                    <div class="text-body2 q-mb-sm">{{ item.desc }}</div>
                    <div
                        class="text-h6 q-mb-md afrika"
                        v-if="selectedArea == 'Panama Pacifico & Panama Centro'"
                    >$ {{ item.pricePma.toFixed(2) }}</div>
                    <div
                        class="text-h6 q-mb-md afrika"
                        v-if="selectedArea == 'Panama Oeste'"
                    >$ {{ item.priceWest.toFixed(2) }}</div>
                    <q-btn color="amber" text-color="black" @click="selectItem(i)">Agregar</q-btn>
                </div>
            </div>
            <!-- END MENU ITEMS -->

            <!-- ADDRESS INPUT -->
            <div class="row q-my-lg q-pt-lg">
                <div class="text-h6 q-mb-md afrika">Direccion de entrega (completa)</div>
                <q-input
                    v-model="address"
                    filled
                    type="textarea"
                    class="full-width"
                    placeholder="Barriada, No. Calle, No. Casa"
                    dark
                    color="red-7"
                    rows="4"
                />
            </div>
            <!-- END ADDRESS INPUT -->

            <!-- PAYMENT METHOD RADIOS -->
            <div class="row q-mb-lg">
                <div class="text-h6 q-mb-sm afrika">Metodo de pago:</div>
                <q-option-group
                    :options="paymentMethods"
                    type="radio"
                    v-model="selectedPaymentMethod"
                    dark
                    class="full-width"
                    color="red-7"
                    size="md"
                />
            </div>
            <!-- END PAYMENT METHOD RADIOS -->

            <hr dark />

            <!-- TOTAL TO PAY -->
            <div class="row q-my-lg">
                <div class="col">
                    <div class="text-h5 text-right afrika">Total: $ {{ total.toFixed(2) }}</div>
                </div>
            </div>
            <!-- END TOTAL TO PAY -->

            <!-- VIEW CART BUTTON -->
            <div class="row q-mb-md">
                <q-btn
                    color="green-7"
                    class="full-width afrika"
                    @click="cartDialog = true"
                >Ver carrito</q-btn>
            </div>
            <!-- END VIEW CART BUTTON -->

            <!-- OPTIONS DIALOG -->
            <q-dialog v-model="optionsDialog">
                <q-card style="width: 700px; max-width: 80vw;" dark v-if="selectedArea != null">
                    <q-card-section>
                        <div class="text-h6 text-center afrika">ELIJA</div>
                    </q-card-section>
                    <q-card-section>
                        <q-btn
                            color="green-7"
                            class="afrika full-width q-mb-md"
                            v-for="option in selectedItem.options"
                            :key="option"
                            @click="addItemToCart(option)"
                        >{{ option }}</q-btn>
                        <q-btn
                            color="red-7"
                            class="afrika full-width q-mb-md"
                            @click="optionsDialog = false"
                        >Cancelar</q-btn>
                    </q-card-section>
                </q-card>
                <q-card style="width: 700px; max-width: 80vw;" dark v-else>
                    <q-card-section>
                        <div class="text-h6 text-center afrika">Primero seleccione un area.</div>
                    </q-card-section>
                    <q-card-section>
                        <q-btn
                            color="green-7"
                            class="afrika full-width q-mb-md"
                            @click="optionsDialog = false"
                        >Aceptar</q-btn>
                    </q-card-section>
                </q-card>
            </q-dialog>
            <!-- END OPTIONS DIALOG -->

            <!-- SUCCESS DIALOG -->
            <q-dialog v-model="successDialog">
                <q-card style="width: 700px; max-width: 80vw;" dark>
                    <q-card-section>
                        <div class="text-h6 text-center afrika">Agregado con exito</div>
                    </q-card-section>
                    <q-card-section>
                        <q-btn
                            color="green-7"
                            class="afrika full-width q-mb-md"
                            @click="successDialog = false"
                        >Aceptar</q-btn>
                    </q-card-section>
                </q-card>
            </q-dialog>
            <!-- END SUCCESS DIALOG -->

            <!-- CART DIALOG -->
            <q-dialog v-model="cartDialog">
                <q-card style="width: 700px; max-width: 80vw;" dark v-if="cart.length > 0">
                    <q-card-section>
                        <div class="text-h6 text-center afrika">Detalle de pedido</div>
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
                                    class="text-body2 q-pl-sm"
                                    v-if="item.title != 'Lata de Coca Cola'"
                                >
                                    <strong>
                                        ({{ item.amount }})
                                        {{ item.title }} con
                                        {{ item.selectedOption }}
                                    </strong>
                                </div>
                                <div class="text-body2 q-pl-sm" v-else>
                                    <strong>
                                        ({{ item.amount }})
                                        {{ item.title }}
                                    </strong>
                                </div>
                            </div>
                        </div>
                    </q-card-section>
                    <hr />
                    <q-card-section>
                        <div class="text-body2">
                            <strong>Direccion de entrega:</strong>
                            {{ address }}
                        </div>
                        <div class="text-body2">
                            <strong>Metodo de pago:</strong>
                            {{ selectedPaymentMethod }}
                        </div>
                        <br />
                        <div class="text-body2 text-center" v-if="selectedPaymentMethod == 'Yappy'">
                            Recuerda enviar el comprobante de pago a nuestro
                            Whatsapp.
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <q-btn
                            color="green-7"
                            class="full-width q-mb-md afrika"
                            @click="sendChat"
                        >Enviar</q-btn>
                        <q-btn
                            color="red-7"
                            class="full-width q-mb-md afrika"
                            @click="cartDialog = false"
                        >Cancelar</q-btn>
                    </q-card-section>
                </q-card>
                <q-card style="width: 700px; max-width: 80vw;" dark v-else>
                    <q-card-section>
                        <div
                            class="text-h6 text-center afrika"
                        >Primero debes agregar algo a tu pedido.</div>
                    </q-card-section>
                    <q-card-section>
                        <q-btn
                            color="green-7"
                            class="afrika full-width q-mb-md"
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
            whatsappNumber: '61127723',
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
                    title: 'Fish Bobotie',
                    desc:
                        'Pescado al horno con especias acompañado de nuestro arroz amarillo o puré, chutney de mango y sambals (ensalada de pepino)',
                    options: ['Arroz amarillo', 'Pure'],
                    pic: 'fish_bobotie.jpeg',
                    pricePma: 8.5,
                    priceWest: 7.5,
                },
                {
                    title: 'Meat Bobotie',
                    desc:
                        'Carne al horno con especias acompañado de nuestro arroz amarillo o puré, chutney de mango y sambals (ensalada de pepino)',
                    options: ['Arroz amarillo', 'Pure'],
                    pic: 'meat_bobotie.jpeg',
                    pricePma: 8.5,
                    priceWest: 7.5,
                },
                {
                    title: 'Lata de Coca Cola',
                    desc: '',
                    options: ['Agregar Coca Cola'],
                    pricePma: 1.0,
                    priceWest: 1.0,
                    pic: 'soda.jpg',
                },
            ],
        }
    },
    methods: {
        selectItem(index) {
            this.selectedItem = {}
            this.selectedItem = {
                title: this.menu[index].title,
                options: this.menu[index].options,
                amount: 1,
            }
            if (this.selectedArea == 'Panama Pacifico & Panama Centro')
                this.selectedItem.price = this.menu[index].pricePma
            else this.selectedItem.price = this.menu[index].priceWest

            this.optionsDialog = true
        },
        addItemToCart(option) {
            this.selectedItem.selectedOption = option
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
            let message =
                'Buenas, me gustaria realizar un pedido de:%0D%0A%0D%0A'
            for (let item of this.cart) {
                if (item.title != 'Lata de Coca Cola')
                    message += `- (${item.amount}) ${item.title} con ${item.selectedOption}%0D%0A`
                else message += `- (${item.amount}) ${item.title}%0D%0A`
            }
            // message = message.slice(0, -2)
            message += `%0D%0AArea de: ${this.selectedArea}%0D%0ADireccion: ${
                this.address
            }%0D%0AMetodo de pago: ${
                this.selectedPaymentMethod
            }%0D%0ATotal: $ ${this.total.toFixed(2)} (wk2)`
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
@font-face {
    font-family: Afrika;
    src: url('../../assets/wp/biggfive/south_afirkas_ 2100.ttf');
}

.afrika {
    font-family: Afrika;
}
</style>
