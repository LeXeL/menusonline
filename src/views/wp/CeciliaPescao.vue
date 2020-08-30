<template>
    <q-page>
        <q-img :src="require('@/assets/wp/ceciliapescao/logo.jpg')" />
        <div class="q-pa-md">
            <div class="text-h4 text-center q-mt-sm q-mb-xl lobster">
                <strong>Realiza tu pedido</strong>
            </div>

            <!-- MENU ITEMS -->
            <div
                class="row q-mb-lg bg-grey-3 q-pa-md rounded-borders"
                v-for="(item, i) in menu"
                :key="i"
            >
                <div class="col">
                    <div class="text-h5 lobster">{{ item.title }}</div>
                    <div class="text-h6 q-mb-md">
                        <strong>$ {{ item.price.toFixed(2) }}</strong>
                    </div>
                    <q-btn
                        color="amber"
                        text-color="black"
                        class="full-width"
                        @click="selectItem(i)"
                    >Agregar</q-btn>
                </div>
            </div>
            <!-- END MENU ITEMS -->

            <hr />

            <!-- TOTAL TO PAY -->
            <div class="row q-my-lg">
                <div class="col">
                    <div class="text-h5 text-right afrika">
                        <strong>TOTAL: $ {{ total.toFixed(2) }}</strong>
                    </div>
                </div>
            </div>
            <!-- END TOTAL TO PAY -->

            <!-- VIEW CART BUTTON -->
            <div class="row q-mb-md">
                <q-btn color="green-7" class="full-width" @click="cartDialog = true">Ver carrito</q-btn>
            </div>
            <!-- END VIEW CART BUTTON -->

            <!-- OPTIONS DIALOG -->
            <q-dialog v-model="optionsDialog">
                <q-card style="width: 700px; max-width: 80vw;">
                    <q-card-section>
                        <div class="text-h5 text-center lobster">
                            <strong>Elija</strong>
                        </div>
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
            </q-dialog>
            <!-- END OPTIONS DIALOG -->

            <!-- SUCCESS DIALOG -->
            <q-dialog v-model="successDialog">
                <q-card style="width: 700px; max-width: 80vw;">
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
                <q-card style="width: 700px; max-width: 80vw;" v-if="cart.length > 0">
                    <q-card-section>
                        <div class="text-h5 text-center lobster">Detalle de pedido</div>
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
                <q-card style="width: 700px; max-width: 80vw;" v-else>
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
            whatsappNumber: '66189701',
            selectedItem: {},
            total: 0,
            optionsDialog: false,
            successDialog: false,
            cartDialog: false,
            cart: [],
            menu: [
                {
                    title: 'Pescao Frito con Escabeche',
                    options: ['Arroz con coco', 'Yuca al mojo', 'Patacones'],
                    price: 8,
                },
                {
                    title: 'Pescao Frito con Mixto',
                    options: ['Arroz con coco', 'Yuca al mojo', 'Patacones'],
                    price: 12,
                },
                {
                    title: 'Filete de Pescao',
                    options: ['Arroz con coco', 'Yuca al mojo', 'Patacones'],
                    price: 6,
                },
                {
                    title: 'Filete de Pescao con Mixto',
                    options: ['Arroz con coco', 'Yuca al mojo', 'Patacones'],
                    price: 10,
                },
                {
                    title: 'Filete con Camarones',
                    options: ['Arroz con coco', 'Yuca al mojo', 'Patacones'],
                    price: 10,
                },
                {
                    title: 'Langostinos al Ajillo',
                    options: ['Arroz con coco', 'Yuca al mojo', 'Patacones'],
                    price: 10,
                },
                {
                    title: 'Anillos de Calamar a la Criolla',
                    options: ['Arroz con coco', 'Yuca al mojo', 'Patacones'],
                    price: 8,
                },
                {
                    title: 'Camarones al ajillo',
                    options: ['Arroz con coco', 'Yuca al mojo', 'Patacones'],
                    price: 10,
                },
                {
                    title: 'Mixto de Mariscos en leche de coco',
                    options: ['Arroz con coco', 'Yuca al mojo', 'Patacones'],
                    price: 7,
                },
                {
                    title: 'Almejas al Ajillo (entrada)',
                    options: ['Arroz con coco', 'Yuca al mojo', 'Patacones'],
                    price: 5,
                },
                {
                    title: 'Deditos de Pollo',
                    options: ['Arroz con coco', 'Yuca al mojo', 'Patacones'],
                    price: 6,
                },
            ],
        }
    },
    methods: {
        selectItem(index) {
            this.selectedItem = {}
            this.selectedItem = {
                title: this.menu[index].title,
                price: this.menu[index].price,
                options: this.menu[index].options,
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
                message += `- (${item.amount}) ${item.title} con ${item.selectedOption}%0D%0A`
            }
            message += `%0D%0ATotal: $ ${this.total.toFixed(2)}`
            message = message.replace(/&/g, '%26')
            message = message.replace(/#/g, '%23')
            return message
        },
        sendChat() {
            window.location.href = `https://wa.me/507${
                this.whatsappNumber
            }?text=${this.generateMessage()}`
        },
    },
    watch: {
        cart: function () {
            this.calculateTotal()
        },
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

.lobster {
    font-family: 'Lobster', cursive;
}
</style>
