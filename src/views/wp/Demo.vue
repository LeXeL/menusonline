<template>
    <q-page class="bg-grey-2">
        <q-img :src="require('@/assets/wp/demo/logo.jpg')" class="shadow-7" />
        <div class="q-pa-md">
            <div class="text-h5 text-center q-mt-sm q-mb-lg poppins-bold">REALIZA TU PEDIDO</div>

            <!-- MENU ITEMS -->
            <q-card class="full-width q-mb-lg" v-for="(item, i) in menu" :key="i">
                <q-img :src="require(`@/assets/wp/demo/${item.pic}`)" />
                <q-card-section class="q-pb-none">
                    <div class="row">
                        <div class="col text-h6">{{ item.title }}</div>
                    </div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div class="text-h6 poppins-bold">$ {{ item.price.toFixed(2) }}</div>
                    <div class="text-caption text-grey">{{ item.desc }}</div>
                </q-card-section>

                <q-separator />

                <q-card-actions>
                    <q-space />
                    <q-btn flat color="orange-9" @click="selectItem(i)">agregar</q-btn>
                </q-card-actions>
            </q-card>
            <div style="height: 50px;" v-if="cart.length > 0"></div>
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
                            v-for="option in selectedItem.options"
                            :key="option"
                            @click="addItemToCart(option)"
                        >{{ option }}</q-btn>
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
                                <div
                                    class="text-body2 poppins-regular"
                                    v-if="item.title != 'Bebidas'"
                                >
                                    <strong>
                                        ({{ item.amount }}) {{ item.title }} con
                                        {{ item.selectedOption }}
                                    </strong>
                                </div>
                                <div class="text-body2 poppins-regular" v-else>
                                    <strong>
                                        ({{ item.amount }}) Bebida -
                                        {{ item.selectedOption }}
                                    </strong>
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
    data() {
        return {
            seamless: false,
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
                    title: 'Hamburguesa Clasica',
                    desc:
                        'Deliciosa carne angus hecha a la parrilla, con cebolla, tomate, lechuga, salsa de la casa y pan artesanal.',
                    options: ['Papas fritas', 'Aros de cebolla', 'Camote'],
                    pic: 'hamburguesa.jpg',
                    price: 8.5,
                },
                {
                    title: 'ChilliDog',
                    desc:
                        'Hotdog con chille, queso y cebolla picada en pan artesanal.',
                    options: ['Papas fritas', 'Aros de cebolla', 'Camote'],
                    pic: 'hotdog.jpg',
                    price: 8.5,
                },
                {
                    title: 'Bebidas',
                    desc: '',
                    options: ['Coca Cola', 'Fresca', 'Ginger Ale'],
                    price: 1.0,

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
                price: this.menu[index].price,
                amount: 1,
            }
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
            if (this.cart.length > 0) {
                this.seamless = true
                this.$store.commit('SET_DISPLAYFOOTER', true)
            } else {
                this.seamless = false
                this.$store.commit('SET_DISPLAYFOOTER', false)
            }
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
