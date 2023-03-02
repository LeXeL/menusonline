<template>
    <q-page class="bg-grey-2">
        <!-- HEADER -->
        <!-- <q-img
            :src="require('@/assets/wp/lasalle/logo.jpg')"
            class="shadow-7"
        /> -->
        <div class="q-py-xl shadow-7 bg-lasalle-blue text-center">
            <!-- <div class="text-h4 poppins-bold text-center text-white">
                Cafetería Secundaria de la Salle
            </div> -->
            <div class="text-h5 poppins-bold text-lasalle-yellow">La Salle</div>
            <div class="text-h4 poppins-bold text-white">
                Cafeteria Secundaria
            </div>
        </div>
        <!-- /HEADER -->

        <!-- RULES -->
        <div class="q-pa-md">
            <div class="q-pa-md bg-white rounded-borders shadow-1">
                <div class="row items-center">
                    <div class="text-h6 poppins-bold text-lasalle-yellow">
                        Importante:
                    </div>
                    <q-space />
                    <q-btn
                        :icon="showRules ? 'expand_less' : 'expand_more'"
                        flat
                        round
                        dense
                        @click="showRules = !showRules"
                    />
                </div>

                <q-slide-transition>
                    <div v-show="showRules">
                        <ul class="q-pl-md poppins-regular">
                            <li class="q-mb-sm">
                                <div class="text-body2">
                                    Se aceptan pedidos online de
                                    <span class="text-bold text-lasalle-blue"
                                        >3:00pm</span
                                    >
                                    hasta las
                                    <span class="text-bold text-lasalle-blue"
                                        >10:00am</span
                                    >
                                    del día siguiente.
                                </div>
                            </li>
                            <li class="q-mb-sm">
                                <div class="text-body2">
                                    Para que su pedido sea preparado debe ser
                                    cancelado por Yappy
                                    <span class="text-bold text-lasalle-blue"
                                        >antes</span
                                    >
                                    de las
                                    <span class="text-bold text-lasalle-blue"
                                        >10:00am</span
                                    >
                                </div>
                            </li>
                            <li class="q-mb-sm">
                                <div class="text-body2">
                                    Si por algún motivo no pudo hacer su pedido
                                    por menú digital. Puede acercarse a la
                                    cafetería en el primer recreo.
                                </div>
                            </li>
                            <li class="q-mb-sm">
                                <div class="text-body2">
                                    El horario de retiro de su pedido será de
                                    <span class="text-bold text-lasalle-blue"
                                        >12:00 pm</span
                                    >
                                    a
                                    <span class="text-bold text-lasalle-blue"
                                        >3:00pm</span
                                    >.
                                </div>
                            </li>
                            <li class="q-mb-sm">
                                <div class="text-body2">
                                    Método de pago
                                    <span class="text-bold">Yappy</span>
                                    al
                                    <span class="text-bold text-lasalle-blue"
                                        >6065-7225</span
                                    >
                                </div>
                            </li>
                            <li>
                                <div class="text-body2">
                                    Temporalmente, algunos productos podrán no contar con imagen de referencia.
                                </div>
                            </li>
                        </ul>
                    </div>
                </q-slide-transition>
            </div>
        </div>
        <!-- /RULES -->

        <!-- DAY -->
        <div class="text-h6 poppins-bold text-center q-mt-md q-mb-md">
            <!-- Menú del día:
            <span class="text-lasalle-blue">{{ returnDayName }}</span> -->
            Menú semanal
        </div>
        <!-- /DAY -->

        <!-- MENU -->
        <div class="q-pa-md">
            <div v-for="(item, i) in menu" :key="i">
                <q-card class="q-mb-lg" v-if="hideIfInThePast(item.day)">
                    <q-card-section class="q-pa-none">
                        <img :src="item.img" width="100%" />
                    </q-card-section>
                    <q-card-section>
                        <div class="text-subtitle2 text-bold text-lasalle-blue">
                            {{ returnDayNameByNumber(item.day) }}
                        </div>
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
                    <q-separator v-if="showToday(item.day)"/>
                    <q-card-actions align="right" v-if="showToday(item.day)">
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
                class="bg-lasalle-blue text-white"
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
                        color="lasalle-yellow"
                        data-hj-allow
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
                        color="lasalle-yellow"
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
                        toggle-color="lasalle-yellow"
                        color="white"
                        text-color="black"
                        :options="pickupMethods"
                    />
                    <!-- <div class="text-caption poppins-bold q-mb-xs">
                        Metodo de pago: *
                    </div>
                    <q-btn-toggle
                        v-model="selectedPaymentMethod"
                        spread
                        all-caps
                        class="poppins-bold full-width"
                        toggle-color="lasalle-yellow"
                        color="white"
                        text-color="black"
                        :options="paymentMethods"
                    /> -->
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
                            >6065-7225
                            <q-btn
                                icon="content_copy"
                                class="q-ml-sm"
                                round
                                flat
                                dense
                                size="sm"
                                color="lasalle-yellow"
                                @click="copyToClipboard('60657225')"
                        /></span>
                    </div>
                    <div
                        class="text-subtitle2"
                        v-if="selectedPaymentMethod == 'ACH'"
                    >
                        Envia tu pago por ACH a la cuenta<br />
                        <span class="text-h6 poppins-bold"
                            >04-32-01-065893-1
                            <q-btn
                                icon="content_copy"
                                class="q-ml-sm"
                                round
                                flat
                                dense
                                size="sm"
                                color="lasalle-yellow"
                                @click="
                                    copyToClipboard('0432010658931')
                                "/></span
                        ><br />
                        Banco General | Cuenta de ahorros
                    </div>
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
import {copyToClipboard} from 'quasar'
import InventoryHandler from '@/mixins/InventoryHandler.js'
export default {
    data() {
        return {
            showRules: true,
            isLoading: true,
            whatsappNo: '60657225',
            cart: [],
            total: 0,
            seamless: true,
            cartDialog: false,
            studentName: '',
            comments: '',
            selectedPickupMethod: '',
            selectedPaymentMethod: 'Yappy',
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
            ],
            menu: [],
        }
    },
    methods: {
        addToCart(item) {
            let today = new Date()
            let todayDay = today.getDay()
            let todayHour = today.getHours()
            if (
                (todayDay > 0 || todayDay <= 5) &&
                todayHour >= 10 &&
                todayHour <= 14
            ) {
                this.$q.notify({
                    message:
                        'Lo sentimos, el horario de pedidos no esta disponible de 10am a 3pm.',
                    color: 'red-7',
                    icon: 'error',
                    position: 'top',
                    progress: true,
                    classes: 'text-bold',
                    timeout: 3000,
                })
                return
            }
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
            if ((todayDay > 5 || todayDay < 1) && itemDay == 1) return true
            if (itemDay == todayDay && todayHour < 15) return true
            if (itemDay < todayDay) return false
            if (itemDay == todayDay + 1 && todayHour >= 15) return true
        },
        hideIfInThePast(itemDay) {
            let today = new Date()
            let todayDay = today.getDay()
            let todayHour = today.getHours()
            // todayDay = 2
            // todayHour = 16
            if (todayDay == 6 || todayDay == 0) return true
            if (todayDay == 5 && todayHour >= 15) return true
            if (itemDay == todayDay && todayHour >= 15) return false
            if (itemDay >= todayDay) return true
            else return false
        },
        generateWhatsappMessage() {
            // let message =
            //     'Buenas me gustaria realizar un pedido de:%0D%0A%0D%0A'
            let message = ''
            message += `Orden No. ${this.generateOrderNo(4)}%0D%0A%0D%0A`
            this.cart.forEach(item => {
                message += `(${item.amount}) - ${item.name}%0D%0A`
            })
            message += `%0D%0ANombre: ${this.studentName}`
            message += `%0D%0AEntrega: ${this.selectedPickupMethod}`
            // message += `%0D%0AMetodo de pago: ${this.selectedPaymentMethod}`
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
        copyToClipboard(text) {
            copyToClipboard(text)
                .then(() => {
                    this.$q.notify({
                        message: `${this.selectedPaymentMethod} copiado con exito`,
                        color: 'lasalle-yellow',
                        icon: 'check',
                        badgeColor: 'lasalle-blue',
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
        generateOrderNo(length) {
            // let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            let chars = '0123456789'
            let code = ''
            for (let i = 0; i < length; i++) {
                let min = Math.ceil(0)
                let max = Math.floor(chars.length)
                let index = Math.floor(Math.random() * (max - min) + min)
                code += chars[index]
            }
            return code
        },
        returnDayNameByNumber(day) {
            if (day == 1) return 'Lunes'
            if (day == 2) return 'Martes'
            if (day == 3) return 'Miercoles'
            if (day == 4) return 'Jueves'
            if (day == 5) return 'Viernes'
        }
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
            if (todayDay > 5 || todayDay < 1) return 'Lunes'
        },
    },
    mixins: [InventoryHandler],

    async mounted() {
        this.generateOrderNo(4)
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

<style>
.text-lasalle-blue {
    color: #004c97 !important;
}
.bg-lasalle-blue {
    background: #004c97 !important;
}
.text-lasalle-yellow {
    color: #eec800 !important;
}
.bg-lasalle-yellow {
    background: #eec800 !important;
}
</style>
