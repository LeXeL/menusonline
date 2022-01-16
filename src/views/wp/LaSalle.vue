<template>
    <q-page class="bg-grey-2">
        <!-- HEADER -->
        <q-img
            :src="require('@/assets/wp/lasalle/logo.jpg')"
            class="shadow-7"
        />
        <!-- /HEADER -->

        <div
            class="text-h6 poppins-bold text-center q-mt-lg q-mb-md text-orange-8"
        >
            Menu del día: {{ returnDayName }}
        </div>

        <!-- MENU -->
        <div class="q-pa-md">
            <div v-for="(item, i) in menu" :key="i">
                <q-card class="q-mb-lg" v-if="showToday(item.day)">
                    <q-card-section class="q-pa-none">
                        <img :src="item.img" width="100%" />
                    </q-card-section>
                    <q-card-section>
                        <div class="text-h6 text-bold">
                            {{ item.name }}
                        </div>
                        <div class="text-h6 poppins-bold">
                            $ {{ item.price.toFixed(2) }}
                        </div>
                        <div class="text-caption text-grey">
                            {{ item.description }}
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
                class="bg-red-7 text-white"
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
                        v-model="studentName"
                    />
                    <div class="text-caption poppins-bold q-mb-xs">
                        Comentarios especiales de tu pedido:
                    </div>
                    <q-input
                        label="Comentarios"
                        placeholder="La salsa aparte por favor."
                        filled
                        dark
                        type="textarea"
                        rows="3"
                        class="q-mb-lg"
                        v-model="comments"
                    />
                    <div class="text-caption poppins-bold q-mb-xs">
                        Entrega: *
                    </div>
                    <q-btn-toggle
                        v-model="selectedPickupMethod"
                        spread
                        all-caps
                        class="poppins-bold full-width q-mb-lg"
                        toggle-color="red-7"
                        color="white"
                        text-color="black"
                        :options="pickupMethods"
                    />
                    <div class="text-caption poppins-bold q-mb-xs">
                        Metodo de pago: *
                    </div>
                    <q-btn-toggle
                        v-model="selectedPaymentMethod"
                        spread
                        all-caps
                        class="poppins-bold full-width"
                        toggle-color="red-7"
                        color="white"
                        text-color="black"
                        :options="paymentMethods"
                    />
                </q-card-section>
                <q-card-section>
                    <div class="text-h5 poppins-bold text-center">
                        Total: $ {{ total.toFixed(2) }}
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
import InventoryHandler from '@/mixins/InventoryHandler.js'
export default {
    data() {
        return {
            isLoading: true,
            whatsappNo: '60657225',
            cart: [],
            total: 0,
            seamless: true,
            cartDialog: false,
            studentName: '',
            comments: '',
            selectedPickupMethod: '',
            selectedPaymentMethod: '',
            pickupMethods: [
                {label: 'Segundo recreo', value: 'Segundo recreo'},
                {label: 'Salida', value: 'Salida'},
            ],
            paymentMethods: [
                {
                    label: 'Yappy',
                    value: 'Yappy',
                },
                {label: 'ACH', value: 'ACH'},
                {label: 'Efectivo', value: 'Efectivo'},
            ],
            menu: [],
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
        showToday(itemDay) {
            let today = new Date()
            let todayDay = today.getDay()
            let todayHour = today.getHours()
            if (todayDay == 5 && todayHour >= 15 && itemDay == 1) return true
            if (todayDay > 5 && itemDay == 1) return true
            if (itemDay == todayDay && todayHour < 15) return true
            if (itemDay < todayDay) return false
            if (itemDay == todayDay + 1 && todayHour >= 15) return true
        },
        generateWhatsappMessage() {
            let message =
                'Buenas me gustaria realizar un pedido de:%0D%0A%0D%0A'
            this.cart.forEach(item => {
                message += `(${item.amount}) - ${item.name}%0D%0A`
            })
            message += `%0D%0ANombre: ${this.studentName}`
            message += `%0D%0AEntrega: ${this.selectedPickupMethod}`
            message += `%0D%0AMetodo de pago: ${this.selectedPaymentMethod}`
            message += `%0D%0ATotal: $${this.total.toFixed(2)}`
            if (this.comments)
                message += `%0D%0A%0D%0AComentarios: ${this.comments}`
            message = message.replace(/\+/g, '%2B')
            message = message.replace(/&/g, '%26')
            message = message.replace(/#/g, '%23')
            return message
        },
        sendOrder() {
            if (
                !this.studentName ||
                !this.selectedPickupMethod ||
                !this.selectedPaymentMethod
            ) {
                let errors = []
                let errMsg = 'Debes llenar los siguientes campos: '
                if (!this.studentName) errors.push('Nombre')
                if (!this.selectedPickupMethod) errors.push('Entrega')
                if (!this.selectedPaymentMethod) errors.push('Metodo de pago')
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
    },
    computed: {
        showSeamless() {
            if (this.cart.length) return true
        },
        returnDayName() {
            let today = new Date()
            let todayDay = today.getDay()
            let todayHour = today.getHours()
            if (todayDay == 1 && todayHour < 15) return 'Lunes'
            if (todayDay == 1 && todayHour >= 15) return 'Martes'
            if (todayDay == 2 && todayHour < 15) return 'Martes'
            if (todayDay == 2 && todayHour >= 15) return 'Miercoles'
            if (todayDay == 3 && todayHour < 15) return 'Miercoles'
            if (todayDay == 3 && todayHour >= 15) return 'Jueves'
            if (todayDay == 4 && todayHour < 15) return 'Jueves'
            if (todayDay == 4 && todayHour >= 15) return 'Viernes'
            if (todayDay == 5 && todayHour < 15) return 'Viernes'
            if (todayDay == 5 && todayHour >= 15) return 'Lunes'
            if (todayDay > 5) return 'Lunes'
        },
    },
    mixins: [InventoryHandler],

    async mounted() {
        this.menu = await this.getInventoryItems()
        let id = 0
        this.menu.forEach(item => {
            item.id = id
            id++
        })
        this.isLoading = false
    },
}
</script>
