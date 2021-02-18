<template>
    <q-page class="bg-grey-2">
        <q-img
            :src="require(`@/assets/wp/${generalData.folder}/logo.jpg`)"
            class="shadow-7"
        />
        <div class="q-pa-md">
            <div
                class="text-subtitle2 poppins-bold q-mt-sm"
                v-if="generalData.instagram.account"
            >
                <i class="fab fa-instagram text-red-8"></i>
                <a
                    :href="generalData.instagram.link"
                    style="text-decoration: none; color: black"
                    >&nbsp;{{ generalData.instagram.account }}</a
                >
            </div>
            <div
                class="text-subtitle2 poppins-bold q-mb-lg"
                v-if="generalData.whatsappPOP"
            >
                <i class="fab fa-whatsapp text-red-8"></i> Comprobantes al
                {{ generalData.whatsappPOP }}
            </div>
            <div class="text-h5 text-center q-mt-sm q-mb-lg poppins-bold">
                REALIZA TU PEDIDO
            </div>
            <div
                :class="
                    `text-subtitle2 q-mb-sm q-mt-md text-${generalData.accentColor}`
                "
            >
                Categorias
            </div>
            <q-select
                filled
                v-model="selectedCategory"
                :options="generalData.categories"
                class="q-mb-lg"
                label="Seleccione"
                :color="generalData.accentColor"
                emit-value
                map-options
            />
            <!-- MENU ITEMS -->
            <div v-for="(item, i) in filterMenuItems" :key="i">
                <q-card class="full-width q-mb-lg">
                    <q-img
                        v-if="item.pic"
                        :src="
                            require(`@/assets/wp/${generalData.folder}/${item.pic}`)
                        "
                    />
                    <q-card-section class="q-pb-none">
                        <div class="row">
                            <div class="text-h6">{{ item.title }}</div>
                            <div
                                :class="
                                    `text-subtitle2 poppins-bold full-width text-${generalData.subtitleColor}`
                                "
                                v-if="item.subtitle != null"
                            >
                                {{ item.subtitle }}
                            </div>
                        </div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <div v-if="item.price" class="text-h6 poppins-bold">
                            $ {{ item.price.toFixed(2) }}
                        </div>
                        <div v-else class="text-h6 poppins-bold">
                            <!-- <span style="font-size: 13px;">Desde</span> $ {{ item.options[0].price.toFixed(2) }} -->
                            <span style="font-size: 13px;">Desde</span> $
                            {{ returnMinVal(item.options) }}
                        </div>
                        <div class="text-caption text-grey">
                            {{ item.desc }}
                        </div>
                    </q-card-section>

                    <q-separator />

                    <q-card-actions>
                        <q-space />
                        <q-btn
                            flat
                            :color="generalData.accentColor"
                            @click="selectItem(item)"
                            :disable="isAvailableByDay(item)"
                            >Agregar</q-btn
                        >
                    </q-card-actions>
                </q-card>
            </div>
            <!-- END MENU ITEMS -->

            <!-- OPTIONS DIALOG -->
            <q-dialog v-model="optionsDialog">
                <q-card style="width: 700px; max-width: 80vw" class="bg-grey-2">
                    <q-card-section class="q-py-sm">
                        <div class="text-h6 text-center poppins-bold">
                            ELIJA
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
                            >Cancelar</q-btn
                        >
                    </q-card-section>
                </q-card>
            </q-dialog>
            <!-- END OPTIONS DIALOG -->

            <!-- STYLES DIALOG -->
            <q-dialog v-model="stylesDialog">
                <q-card style="width: 700px; max-width: 80vw" class="bg-grey-2">
                    <q-card-section class="q-py-sm">
                        <div class="text-h6 text-center poppins-bold">
                            ELIJA
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
                            >Cancelar</q-btn
                        >
                    </q-card-section>
                </q-card>
            </q-dialog>
            <!-- END STYLES DIALOG -->

            <!-- SIDES DIALOG -->
            <q-dialog v-model="sideDialog">
                <q-card style="width: 700px; max-width: 80vw" class="bg-grey-2">
                    <q-card-section class="q-py-sm">
                        <div class="text-h6 text-center poppins-bold">
                            ELIJA
                        </div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                        <q-btn
                            text-color="black"
                            outline
                            class="poppins-bold full-width q-mb-md"
                            v-for="(side, i) in menu[selectedItemIndex].sides"
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
                            >Cancelar</q-btn
                        >
                    </q-card-section>
                </q-card>
            </q-dialog>
            <!-- END SIDES DIALOG -->

            <!-- SUCCESS DIALOG -->
            <q-dialog v-model="successDialog">
                <q-card style="width: 700px; max-width: 80vw" class="bg-grey-2">
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

            <!-- CART DIALOG -->
            <q-dialog
                v-model="cartDialog"
                maximized
                transition-show="slide-up"
                transition-hide="slide-down"
            >
                <div class="row">
                    <div class="col"></div>
                    <div class="col-lg-3 col-md-3 col-sm-4 shadow-10">
                        <q-card class="bg-grey-9 text-white">
                            <q-bar style="height: 45px">
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
                                                ({{ item.amount }})
                                                {{ item.title }} -
                                                {{ item.options.title }}
                                                <span
                                                    v-if="
                                                        item.styles.title !=
                                                            undefined
                                                    "
                                                >
                                                    {{
                                                        ` - ${item.styles.title}`
                                                    }}
                                                </span>
                                                <span
                                                    v-if="
                                                        item.sides.title !=
                                                            undefined
                                                    "
                                                >
                                                    {{
                                                        ` - ${item.sides.title}`
                                                    }}
                                                </span>
                                            </strong>
                                        </div>
                                    </div>
                                </div>
                            </q-card-section>
                            <q-card-section v-else>
                                <div class="row">
                                    <div class="col text-grey-6 text-center">
                                        <i
                                            class="fas fa-utensils q-mt-lg q-mb-md"
                                            style="font-size: 75px"
                                        ></i>
                                        <div
                                            class="text-h5 poppins-bold q-mb-lg"
                                        >
                                            Tu carrito esta vacio
                                        </div>
                                    </div>
                                </div>
                            </q-card-section>

                            <q-separator dark />
                            <q-card-section>
                                <div class="row text-center">
                                    <div class="col">
                                        <div
                                            class="text-h6 poppins-bold q-mb-md"
                                        >
                                            Datos de orden
                                        </div>
                                    </div>
                                </div>
                                <div
                                    v-for="(input, i) in cartSettings.inputData"
                                    :key="i"
                                >
                                    <InputText
                                        v-if="input.type == 'text'"
                                        :label="input.label"
                                        :placeholder="input.placeholder"
                                        :isRequired="input.required"
                                        :accentColor="generalData.accentColor"
                                        :index="i"
                                        @update-value="updateValue"
                                    />
                                    <TextArea
                                        v-if="input.type == 'textarea'"
                                        :label="input.label"
                                        :placeholder="input.placeholder"
                                        :isRequired="input.required"
                                        :accentColor="generalData.accentColor"
                                        :index="i"
                                        @update-value="updateValue"
                                    />
                                    <ButtonGroup
                                        v-if="input.type == 'radio'"
                                        :label="input.label"
                                        :isRequired="input.required"
                                        :accentColor="generalData.accentColor"
                                        :options="input.options"
                                        :index="i"
                                        @update-value="updateValue"
                                    />
                                </div>
                                <div class="row q-mb-md">
                                    <div
                                        class="text-subtitle2 poppins-bold q-mb-sm"
                                    >
                                        Metodo de entrega: *
                                    </div>
                                    <q-btn-toggle
                                        v-model="selectedPickupMethod"
                                        spread
                                        all-caps
                                        class="poppins-bold full-width"
                                        :toggle-color="generalData.accentColor"
                                        color="white"
                                        text-color="black"
                                        :options="pickupMethods"
                                    />
                                </div>
                                <div
                                    class="row"
                                    v-if="
                                        this.selectedPickupMethod == 'Delivery'
                                    "
                                >
                                    <div
                                        class="text-subtitle2 poppins-bold q-mb-sm full-width"
                                    >
                                        Ubicacion de entrega: *
                                    </div>
                                </div>
                                <GoogleMaps
                                    class="q-mb-md"
                                    v-if="
                                        Object.keys(center).length > 0 &&
                                            this.selectedPickupMethod ==
                                                'Delivery'
                                    "
                                    @markerPosition="setMarkerPosition"
                                    :editable="true"
                                    :markers="markers"
                                    :mapCenter="center"
                                ></GoogleMaps>
                                <div
                                    class="row q-mb-md"
                                    v-if="selectedPickupMethod == 'Delivery'"
                                >
                                    <div
                                        class="text-subtitle2 poppins-bold q-mb-sm"
                                    >
                                        Direccion de entrega (completa): *
                                    </div>
                                    <q-input
                                        v-model="address"
                                        filled
                                        dark
                                        type="textarea"
                                        class="full-width poppins-regular"
                                        placeholder="Barriada, No. Calle, No. Casa"
                                        :color="generalData.accentColor"
                                        rows="4"
                                        data-hj-allow
                                    />
                                </div>
                            </q-card-section>
                            <q-card-section v-if="cart.length > 0">
                                <div class="row">
                                    <div class="col text-center">
                                        <div class="text-h5 poppins-bold">
                                            Total: $ {{ total.toFixed(2) }}
                                        </div>
                                        <div
                                            class="text-subtitle2 poppins-bold text-red-8"
                                            v-if="
                                                selectedPickupMethod ==
                                                    'Delivery'
                                            "
                                        >
                                            El costo del delivery sera calculado
                                            y enviado aparte.
                                        </div>
                                    </div>
                                </div>
                            </q-card-section>
                            <q-card-section>
                                <q-btn
                                    color="green-7"
                                    class="full-width q-mb-md poppins-bold"
                                    @click="sendChat"
                                    :disable="cart.length <= 0"
                                    >Enviar</q-btn
                                >
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class="col"></div>
                </div>
            </q-dialog>
            <!-- END CART DIALOG -->

            <!-- CART BOTTOM BAR DIALOG -->
            <q-dialog v-model="seamless" seamless position="bottom">
                <q-card
                    style="width: 350px; border-radius: 0"
                    :class="`text-white bg-${generalData.accentColor}`"
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
                    </q-card-section>
                </q-card>
            </q-dialog>
            <!-- END CART BOTTOM BAR DIALOG -->
        </div>
    </q-page>
</template>

<script>
import InputText from '@/components/wp/InputText'
import TextArea from '@/components/wp/TextArea'
import ButtonGroup from '@/components/wp/ButtonGroup'
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
    props: ['generalData', 'menu', 'cartSettings'],
    data() {
        return {
            selectedCategory: null,
            orderNo: '',
            selectedItemIndex: 0,
            seamless: false,
            selectedItem: {},
            pickupMethods: [
                {label: 'Delivery', value: 'Delivery'},
                {label: 'Retirar en local', value: 'Retirar en local'},
            ],
            selectedPickupMethod: '',
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
            cart: [],
        }
    },
    methods: {
        updateValue(e) {
            this.cartSettings.inputData[e.index].value = e.value
        },
        returnMinVal(options) {
            let min = options[0].price
            options.forEach(op => {
                if (op.price < min) min = op.price
            })
            return min.toFixed(2)
        },
        addItemToCart() {
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
                        c.options.title === this.selectedItem.options.title &&
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
        },
        handleDialogs(section, item) {
            //option, style, side
            if (section === 'option') {
                this.selectedItem.options = item
                this.optionsDialog = false
                if (this.menu[this.selectedItemIndex].styles.length > 0) {
                    this.stylesDialog = true
                } else {
                    this.addItemToCart()
                }
            }
            if (section === 'style') {
                this.selectedItem.styles = item
                this.stylesDialog = false
                if (this.menu[this.selectedItemIndex].sides.length > 0) {
                    this.sideDialog = true
                } else {
                    this.addItemToCart()
                }
            }
            if (section === 'side') {
                this.sideDialog = false
                this.selectedItem.sides = item
                this.addItemToCart()
            }
        },
        selectItem(item) {
            let itemInMenu = this.menu.filter((m, index) => {
                if (m.title === item.title) {
                    this.selectedItemIndex = index
                    return m
                }
            })
            this.selectedItem = JSON.parse(
                JSON.stringify(this.menu[this.selectedItemIndex])
            )
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
                message += `- (${item.amount}) ${item.title} - ${item.options.title}`
                if (item.styles.title != undefined) {
                    message += ` - ${item.styles.title}`
                }
                if (item.sides.title != undefined) {
                    message += ` - ${item.sides.title}`
                }
                message += `%0D%0A`
            }
            this.cartSettings.inputData.forEach(input => {
                if (input.value != undefined)
                    message += `%0D%0A${input.label}: ${input.value}`
            })
            message += `%0D%0AMetodo de entrega: ${this.selectedPickupMethod}`
            if (this.selectedPickupMethod == 'Delivery') {
                message += `%0D%0AUbicacion: ${this.getLocationForMessage()}%0D%0ADireccion: ${
                    this.address
                }`
            }
            message += `%0D%0ANo. de pedido: ${this.orderNo}`
            message += `%0D%0ATotal: $ ${this.total.toFixed(2)}`
            message = message.replace(/\+/g, '%2B')
            message = message.replace(/&/g, '%26')
            message = message.replace(/#/g, '%23')
            return message
        },
        async sendToGoogleDriveSheet() {
            let message = ''
            for (let item of this.cart) {
                message += `- (${item.amount}) ${item.title} - ${item.options.title}`
                if (item.styles.title != undefined) {
                    message += `- ${item.styles.title}`
                }
                if (item.sides.title != undefined) {
                    message += `- ${item.sides.title}`
                }
                message += `\n`
            }
            let data = {
                id: this.orderNo,
                pedido: message,
                status: 'orden creada',
                total: this.total,
                metodo_de_entrega: this.selectedPickupMethod,
            }
            if (data.metodo_de_entrega === 'Delivery') {
                data.direcion_1 = this.getLocationForMessage()
                data.direcion_2 = this.address
            }
            this.cartSettings.inputData.forEach(input => {
                let key = input.label.toLowerCase()
                key = key.replace(/\s/g, '_')
                if (input.value != undefined) data[key] = input.value
                else data[key] = ''
            })
            var url = this.generalData.googleSheets.url
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
                    parseFloat(this.center.lat) ===
                        parseFloat(
                            this.cartSettings.locationDefaults.defaultLat
                        ) &&
                    parseFloat(this.center.lng) ===
                        parseFloat(this.cartSettings.locationDefaultsdefaultLng)
                ) {
                    return `>> Pedir Ubicacion !!`
                } else {
                    if (this.generalData.wazeIntegration == false) {
                        if (this.center.lat < 0)
                            this.center.lng = `+${this.center.lng}` //Google Maps
                        if (this.center.lng < 0)
                            this.center.lng = `+${this.center.lng}` //Google Maps
                        return `https://www.google.com/maps?q=${this.center.lat},${this.center.lng}`
                    } else {
                        return `https://waze.com/ul?ll=${this.center.lat},${this.center.lng}&z=10`
                    }
                }
            } else {
                let lat = parseFloat(this.location.lat)
                let lng = parseFloat(this.location.lng)
                if (lat === NaN || lng === NaN) return `>> Pedir Ubicacion !!`
                if (this.generalData.wazeIntegration == false) {
                    if (lat < 0) lat = `+${lat}` //Google Maps
                    if (lng < 0) lng = `+${lng}` //Google Maps
                    return `https://www.google.com/maps?q=${lat},${lng}`
                } else {
                    return `https://waze.com/ul?ll=${lat},${lng}&z=10`
                }
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
                        lat: parseFloat(
                            this.cartSettings.locationDefaults.defaultLat
                        ),
                        lng: parseFloat(
                            this.cartSettings.locationDefaults.defaultLng
                        ),
                    }
                    this.markers.push({position: this.center})
                }
            )
        },
        async sendChat() {
            for (let input of this.cartSettings.inputData) {
                if (
                    input.required == true &&
                    (input.value == undefined || input.value == '')
                ) {
                    alert(
                        `Debes ingresar la siguiente informacion:\n\n${input.label}`
                    )
                    return
                }
            }
            if (this.selectedPickupMethod == '') {
                alert('Debes seleccionar un metodo de entrega.')
                return
            }
            if (this.selectedPickupMethod == 'Delivery' && this.address == '') {
                alert(
                    'Debes ingresar tu direccion completa para la entrega de tu pedido.'
                )
                return
            } else {
                this.orderNo = Math.floor(100000 + Math.random() * 900000)
                this.$analytics.logEvent(`wp-${this.generalData.folder}`, {
                    content_action: 'Orden Completada',
                })
                if (this.generalData.googleSheets.integration == true)
                    await this.sendToGoogleDriveSheet()
                window.location.href = `https://wa.me/507${
                    this.generalData.whatsappNumber
                }?text=${this.generateMessage()}`
            }
        },
        isAvailableByDay(item) {
            let today = new Date().getDay()
            if (item.days) {
                if (item.days.includes(today)) return false
                else return true
            } else {
                return false
            }
        },
    },
    computed: {
        filterMenuItems() {
            let items = []
            if (
                this.selectedCategory == null ||
                this.selectedCategory == 'Todo'
            )
                return this.menu
            this.menu.forEach(item => {
                if (item.type == this.selectedCategory) {
                    items.push(item)
                }
            })
            return items
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
    },
    components: {
        GoogleMaps,
        InputText,
        TextArea,
        ButtonGroup,
    },
    mounted() {
        this.generalData.categories.push('Todo')
        if (this.$hj) {
            this.$hj('vpv', 'funnel-step-one')
        }
        this.$store.commit('SET_DISPLAYFOOTER', false)
        let path = this.$route.params.path
        this.$analytics.logEvent(`wp-${this.generalData.folder}`, {
            path,
        })
        this.geolocate()
    },
}
</script>
