<template>
    <q-page class="bg-grey-2">
        <q-img
            :src="require('@/assets/wp/garageburgers/logo.jpg')"
            class="shadow-7"
        />
        <div class="q-pa-md">
            <div class="text-h5 text-center q-mt-sm q-mb-lg poppins-bold">
                REALIZA TU PEDIDO
            </div>
            <div class="text-subtitle2 text-orange-9 q-mb-sm q-mt-md">
                Categorias
            </div>
            <q-select
                filled
                v-model="selectedCategory"
                :options="categories"
                class="q-mb-md"
                label="Seleccione"
                color="orange-9"
            />
            <!-- MENU ITEMS -->
            <div v-for="(item, i) in filterMenu(menu)" :key="i">
                <div v-if="item.title == 'Alitas'">
                    <div
                        class="text-h6 text-center q-my-lg text-orange-9 poppins-bold"
                    >
                        ENTRADAS
                    </div>
                </div>

                <div v-if="item.title == 'Hamburguesa clasica'">
                    <div
                        class="text-h6 text-center q-my-lg text-orange-9 poppins-bold"
                    >
                        HAMBURGUESAS
                    </div>
                </div>

                <div v-if="item.title == 'Salchipapas sencillas'">
                    <div
                        class="text-h6 text-center q-my-lg text-orange-9 poppins-bold"
                    >
                        SALCHIPAPAS
                    </div>
                </div>
                <div v-if="item.title == 'Arepa con chorizo'">
                    <div
                        class="text-h6 text-center q-my-lg text-orange-9 poppins-bold"
                    >
                        AREPAS
                    </div>
                </div>
                <div v-if="item.title == 'Hotdog Sencillo'">
                    <div
                        class="text-h6 text-center q-my-lg text-orange-9 poppins-bold"
                    >
                        HOTDOG JUMBOS
                    </div>
                </div>
                <div v-if="item.title == 'Pepito de Pollo'">
                    <div
                        class="text-h6 text-center q-my-lg text-orange-9 poppins-bold"
                    >
                        PEPITOS
                    </div>
                </div>
                <div v-if="item.title == 'Burrito de Pollo'">
                    <div
                        class="text-h6 text-center q-my-lg text-orange-9 poppins-bold"
                    >
                        BURRITOS
                    </div>
                </div>
                <div v-if="item.title == 'Combo 1'">
                    <div
                        class="text-h6 text-center q-my-lg text-orange-9 poppins-bold"
                    >
                        COMBOS
                    </div>
                </div>
                <q-card class="full-width q-mb-lg">
                    <q-img
                        v-if="item.pic"
                        :src="require(`@/assets/wp/garageburgers/${item.pic}`)"
                    />
                    <q-card-section class="q-pb-none">
                        <div class="row">
                            <div class="text-h6">{{ item.title }}</div>
                            <div
                                class="text-subtitle2 poppins-bold text-red-8 full-width"
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
                        <div class="text-caption text-grey">
                            {{ item.desc }}
                        </div>
                    </q-card-section>

                    <q-separator />

                    <q-card-actions>
                        <q-space />
                        <q-btn flat color="orange-9" @click="selectItem(item)"
                            >Agregar</q-btn
                        >
                    </q-card-actions>
                </q-card>
            </div>

            <!-- END MENU ITEMS -->

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

            <!-- SIDE DIALOG -->
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
            <!-- END SIDE DIALOG -->

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

            <!-- LOCATION DIALOG -->
            <q-dialog v-model="locationDialog" persistent>
                <q-card style="width: 700px; max-width: 80vw" class="bg-grey-2">
                    <q-card-section>
                        <div
                            class="text-subtitle2 text-center poppins-bold text-red-7"
                        >
                            Arrastra el marcador del mapa a la ubicacion donde
                            deseas recibir tu pedido.
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <q-btn
                            color="black"
                            outline
                            class="poppins-bold full-width q-mb-md"
                            @click="locationDialog = false"
                            >Aceptar</q-btn
                        >
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
                                        ({{ item.amount }}) {{ item.title }} -
                                        {{ item.options.title }}
                                        <span
                                            v-if="
                                                item.styles.title != undefined
                                            "
                                        >
                                            {{ ` - ${item.styles.title}` }}
                                        </span>
                                        <span
                                            v-if="item.sides.title != undefined"
                                        >
                                            {{ ` - ${item.sides.title}` }}
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
                                <div class="text-h5 poppins-bold q-mb-lg">
                                    Tu carrito esta vacio
                                </div>
                            </div>
                        </div>
                    </q-card-section>

                    <q-separator dark />
                    <q-card-section>
                        <div class="row text-center">
                            <div class="col">
                                <div class="text-h6 poppins-bold q-mb-md">
                                    Datos de orden
                                </div>
                            </div>
                        </div>
                        <div class="row q-mb-md">
                            <div class="text-subtitle2 poppins-bold q-mb-sm">
                                Nombre: *
                            </div>
                            <q-input
                                v-model="name"
                                filled
                                dark
                                type="text"
                                class="full-width poppins-regular"
                                placeholder="Nombre Apellido"
                                color="orange-9"
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
                        <!-- <div class="row q-mb-md">
                            <div class="text-subtitle2 poppins-bold q-mb-sm">
                                Local: *
                            </div>
                            <q-btn-toggle
                                v-model="selectedPremises"
                                spread
                                all-caps
                                class="poppins-bold full-width"
                                toggle-color="red-8"
                                color="white"
                                text-color="black"
                                :options="premises"
                            />
                        </div> -->
                        <div class="row q-mb-md">
                            <div class="text-subtitle2 poppins-bold q-mb-sm">
                                Metodo de entrega: *
                            </div>
                            <q-btn-toggle
                                v-model="selectedPickupMethod"
                                spread
                                all-caps
                                class="poppins-bold full-width"
                                toggle-color="orange-9"
                                color="white"
                                text-color="black"
                                :options="pickupMethods"
                            />
                        </div>
                        <div
                            class="row"
                            v-if="this.selectedPickupMethod == 'Delivery'"
                        >
                            <div
                                class="text-subtitle2 poppins-bold q-mb-sm full-width"
                            >
                                Ubicacion de entrega: *
                            </div>
                            <div
                                class="text-subtitle2 poppins-bold q-mb-md text-red-7"
                            >
                                Para mover el marcador debes arrastrarlo a la
                                ubicacion que deseas recibir tu pedido.
                            </div>
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
                        <div
                            class="row q-mb-md"
                            v-if="selectedPickupMethod == 'Delivery'"
                        >
                            <div class="text-subtitle2 poppins-bold q-mb-sm">
                                Direccion de entrega (completa): *
                            </div>
                            <q-input
                                v-model="address"
                                filled
                                dark
                                type="textarea"
                                class="full-width poppins-regular"
                                placeholder="Barriada, No. Calle, No. Casa"
                                color="orange-9"
                                rows="4"
                                data-hj-allow
                            />
                        </div>
                        <div class="row">
                            <div class="text-subtitle2 poppins-bold q-mb-sm">
                                Metodo de pago: *
                            </div>
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
                            <div class="row full-width">
                                <div class="col text-center">
                                    <div
                                        class="text-subtitle2 q-mt-lg poppins-bold"
                                        v-if="selectedPaymentMethod == 'Yappy'"
                                    >
                                        Realiza tus pagos Yappy al
                                        <br />6890-9064.
                                    </div>
                                </div>
                            </div>
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
                                    v-if="selectedPickupMethod == 'Delivery'"
                                >
                                    Sin costos por delivery.
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
            </q-dialog>
            <!-- END CART DIALOG -->

            <!-- NEW DIALOG -->
            <q-dialog v-model="seamless" seamless position="bottom">
                <q-card
                    style="width: 350px; border-radius: 0"
                    class="bg-orange-9 text-white"
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
            selectedCategory: null,
            categories: [
                'Todo',
                'Entradas',
                'Hamburguesas',
                'Salchipapas',
                'Arepas',
                'Hotdogs',
                'Pepitos',
                'Burritos',
                'Combos',
            ],
            orderNo: '',
            name: '',
            specialComments: '',
            selectedItemIndex: 0,
            seamless: false,
            whatsappNumber: '68909064',
            selectedItem: {},
            paymentMethods: [
                {label: 'Yappy', value: 'Yappy'},
                {label: 'Efectivo', value: 'Efectivo'},
                {label: 'Tarjeta', value: 'Tarjeta'},
            ],
            pickupMethods: [
                {label: 'Delivery', value: 'Delivery'},
                {label: 'Retirar en local', value: 'Retirar en local'},
            ],
            selectedPickupMethod: '',
            premises: [
                {label: 'Arraijan', value: 'Arraijan'},
                {label: 'Chorrera', value: 'Chorrera'},
            ],
            selectedPremises: '',
            selectedPaymentMethod: null,
            address: '',
            total: 0,
            location: [],
            markers: [],
            center: {},
            defaultLat: 8.92788,
            defaultLng: -79.726955,
            optionsDialog: false,
            stylesDialog: false,
            sideDialog: false,
            successDialog: false,
            cartDialog: false,
            locationDialog: false,
            cart: [],
            menu: [
                {
                    title: 'Alitas',
                    desc:
                        '6 Unidades de alitas a la BBQ / Mostaza Miel, acompañadas con pasas fritas.',
                    type: 'starter',
                    pic: 'alitas_2.jpeg',
                    price: 4.5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Bowl Western',
                    desc: 'Papas western, carne molida, queso cheddar, bacon.',
                    type: 'starter',
                    pic: 'bowl_western.jpeg',
                    price: 5.5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Nachos',
                    desc:
                        'Tortillas de maiz, carne molida, pico de gallo, queso cheddar.',
                    type: 'starter',
                    pic: 'nachos_no_go.jpeg',
                    price: 3.5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Salchitortillas',
                    desc:
                        'Tortillas de maiz, salchichas jumbo, queso, salsa de la casa.',
                    type: 'starter',
                    pic: '',
                    price: 2.5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Hamburguesa clasica',
                    desc: 'Carne, queso cheddar, bacon, salsas de la casa.',
                    type: 'burger',
                    pic: '',
                    price: 2,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Garage Burger',
                    desc:
                        'Carne, queso cheddar, bacon, lechuga, tomate, cebolla, salsas de la casa.',
                    type: 'burger',
                    pic: 'garage_burger.jpeg',
                    price: 3,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Starchicken',
                    desc:
                        'Milanesa de pollo, queso cheddar, bacon, lechuga, tomate, cebolla, salsas de la casa.',
                    type: 'burger',
                    pic: '',
                    price: 3,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Bacon Burger',
                    desc: 'Carne, bacon, papitas fosforito, salsas de la casa.',
                    type: 'burger',
                    pic: '',
                    price: 3.5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Hamburguesa Especial',
                    desc:
                        'Carne, queso, cheddar, bacon, huevo frito, lechuga, tomate, cebolla , salsas de la casa.',
                    type: 'burger',
                    pic: '',
                    price: 4,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Hamburguesa Doble',
                    desc:
                        '2 Carnes, queso cheddar, bacon, tomate, lechuga, cebolla, salsas de la casa.',
                    type: 'burger',
                    pic: 'doble.jpeg',
                    price: 4.5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Hamburguesa Triple',
                    desc:
                        'Carne, pollo, chuleta, queso cheddar, lechuga, tomate, cebolla, salsas de la casa.',
                    type: 'burger',
                    pic: '',
                    price: 6,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Hamburguesa Bacon Cheddar',
                    desc:
                        '2 Carnes, queso cheddar, bacon, papitas fosforitos, salsas de la casa.',
                    type: 'burger',
                    pic: 'bacon_cheddar.jpeg',
                    price: 4.25,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Hamburguesa Especial Premium',
                    desc:
                        'Carne, queso cheddar, bacon, huevo, tajada, lechuga, tomate, cebolla, salsas de la casa.',
                    type: 'burger',
                    pic: 'especial_premium.jpeg',
                    price: 4.5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Hamburguesa Bacon Premium',
                    desc:
                        'Carne, queso mozzarella bacon, cebollas, acaramelizadas, papitas fosforito, salsas de la casa.',
                    type: 'burger',
                    pic: 'bacon_premium.jpeg',
                    price: 4.5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Salchipapas sencillas',
                    desc:
                        'Papas fritas, salchicha jumbo, queso, salsas de la casa.',
                    type: 'salchipapas',
                    pic: 'salchipapas.jpeg',
                    price: 2.5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Salchipapas con bacon',
                    desc:
                        'Papas fritas, salchicha jumbo, queso, bacon, maíz, salsas de la casa.',
                    type: 'salchipapas',
                    pic: '',
                    price: 3,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Salchipapas con chorizo',
                    desc:
                        'Papas fritas, salchicha jumbo, chorizo, queso, maíz, salsas de la casa.',
                    type: 'salchipapas',
                    pic: '',
                    price: 3.5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Salchipapas con pollo',
                    desc:
                        'Papas fritas, pollo, salchicha jumbo, chorizo, queso, maíz, salsas de la casa.',
                    type: 'salchipapas',
                    pic: '',
                    price: 4.5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Salchipapas con carne',
                    desc:
                        'Papas fritas, carne, salchicha jumbo, chorizo, queso, maíz, salsas de la casa.',
                    type: 'salchipapas',
                    pic: '',
                    price: 5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Salchipapas de combinacion',
                    desc:
                        'Papas fritas, pollo, carne, salchicha jumbo, chorizo, queso, maíz, salsas de la casa.',
                    type: 'salchipapas',
                    pic: '',
                    price: 6,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Arepa con chorizo',
                    desc:
                        'Arepa con chorizo, queso mozzarella, salsa de la casa.',
                    type: 'arepa',
                    pic: 'arepa.jpeg',
                    price: 3,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Arepa con pollo',
                    desc:
                        'Arepa con pollo, queso mozzarella, salsa de la casa.',
                    type: 'arepa',
                    pic: '',
                    price: 3.5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Arepa con copa vieja',
                    desc:
                        'Arepa con ropa vieja, queso mozzarella, salsa de la casa.',
                    type: 'arepa',
                    pic: '',
                    price: 3.5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Arepa de combinacion',
                    desc:
                        'Arepa combinación, ropa vieja, pollo, chorizo, queso mozzarella, salsa de la casa.',
                    type: 'arepa',
                    pic: '',
                    price: 4,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Hotdog Sencillo',
                    desc: 'Ensalada de repollo y zanahoria, salsas de la casa.',
                    type: 'hotdog',
                    pic: '',
                    price: 1.5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Hotdog Especial',
                    desc:
                        'Ensalada de repollo y zanahoria, papitas fosforito, queso, bacon, salsa de la casa.',
                    type: 'hotdog',
                    pic: 'hotdog_jumbo_especial.jpeg',
                    price: 2.5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Hotdog Tropical',
                    desc:
                        'Ensalada de repollo y zanahoria, huevo sancochado, papitas fosforitos, bacon, salsas de la casa.',
                    type: 'hotdog',
                    pic: '',
                    price: 3,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Hotdog Premium',
                    desc:
                        'Bacon, queso mozzarella, papitas fosforito, salsas de la casa.',
                    type: 'hotdog',
                    pic: '',
                    price: 3.25,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Hotdog con Chili',
                    desc: 'Carne molida, pico de gallo, bacon, queso cheddar.',
                    type: 'hotdog',
                    pic: 'hotdog_chili.jpeg',
                    price: 3.5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Pepito de Pollo',
                    desc:
                        'Pan de 1’ pie, lechuga, tomate, papas fritas, bacon, queso, maiz, salsas de la casa.',
                    type: 'pepito',
                    pic: '',
                    price: 5.5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Pepito de Carne',
                    desc:
                        'Pan de 1’ pie, lechuga, tomate, papas fritas, bacon, queso, maíz, salsas de la casa.',
                    type: 'pepito',
                    pic: '',
                    price: 5.75,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Pepito de Chuleta Ahumada',
                    desc:
                        'Pan de 1’ pie, lechuga, tomate, papas fritas, bacon, queso, maíz, salsas de la casa.',
                    type: 'pepito',
                    pic: '',
                    price: 5.75,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Pepito de Combinacion',
                    desc:
                        'Pan de 1’ pie, lechuga, tomate, papas fritas, bacon, queso, maíz, salsas de la casa.',
                    type: 'pepito',
                    pic: '',
                    price: 6.25,
                    count: 0,
                    styles: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                    sides: [],
                    options: [
                        {
                            title: 'Carne / Pollo',
                            price: 0,
                        },
                        {
                            title: 'Carne / Chuleta',
                            price: 0,
                        },
                        {
                            title: 'Pollo / Chuleta',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Pepito Triple',
                    desc:
                        'Pan de 1’ pie, Carne, pollo, chuleta, lechuga, tomate, papas fritas, bacon, queso, maíz, salsas de la casa.',
                    type: 'pepito',
                    pic: '',
                    price: 7,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Pepito Ayala Vida',
                    desc:
                        'Pan de 2’ pie, Carne, pollo, chuleta, chorizo, lechuga, tomate, papas fritas, bacon, queso, maíz, salsas de la casa.',
                    type: 'pepito',
                    pic: '',
                    price: 16,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Burrito de Pollo',
                    desc:
                        'Pico de gallo, maíz, queso mozzarella, salsa de la casa.',
                    type: 'burrito',
                    pic: 'burritos.jpeg',
                    price: 3,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Burrito de Carne',
                    desc: 'Pico de gallo, maíz, queso, salsa de la casa.',
                    type: 'burrito',
                    pic: '',
                    price: 3.25,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Burrito de Combinacion',
                    desc:
                        'Pollo, carne, pico de gallo, maíz, queso mozzarella, salsa de la casa.',
                    type: 'burrito',
                    pic: '',
                    price: 4,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Papas fritas y soda',
                            price: 1.75,
                        },
                        {
                            title: 'Papas western y soda',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Combo 1',
                    desc:
                        '1 salchipapas sencillas, 2 hotdog jumbos sencillos, 2 hotdogjumbo especial, 2 sodas de lata.',
                    type: 'combo',
                    pic: '',
                    price: 12,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Combo 2',
                    desc:
                        '4 hamburguesas clásicas, 6 alitas a la BBQ / mostaza miel con papas, 1 Coca-Cola de 1.5 L',
                    type: 'combo',
                    pic: '',
                    price: 14.5,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Combo 3',
                    desc:
                        '1 Salchitortillas, 2 hotdog jumbos premium, 1 nachos, 2 sodas de lata.',
                    type: 'combo',
                    pic: '',
                    price: 14,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Combo 4',
                    desc:
                        '1 Salchitortillas, 2 hotdog jumbos premium, 1 nachos, 2 sodas de lata.',
                    type: 'combo',
                    pic: '',
                    price: 14,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Combo 5',
                    desc:
                        '6 alitas a la BBQ / mostaza miel con papas, 1 nachos, 2 hamburguesas clásicas, 2 hamburguesas garage, 1 Coca-Cola de 1.5 L',
                    type: 'combo',
                    pic: '',
                    price: 20,
                    count: 0,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                },
            ],
        }
    },
    methods: {
        filterMenu(menu) {
            let type = ''
            if (this.selectedCategory === 'Todo') {
                type = 'all'
                return this.menu
            }
            if (this.selectedCategory === null) {
                return this.menu
            }
            if (this.selectedCategory === 'Entradas') type = 'starter'
            if (this.selectedCategory === 'Hamburguesas') type = 'burger'
            if (this.selectedCategory === 'Salchipapas') type = 'salchipapas'
            if (this.selectedCategory === 'Arepas') type = 'arepa'
            if (this.selectedCategory === 'Hotdogs') type = 'hotdog'
            if (this.selectedCategory === 'Pepitos') type = 'pepito'
            if (this.selectedCategory === 'Burritos') type = 'burrito'
            if (this.selectedCategory === 'Combos') type = 'combo'
            return menu.filter(m => {
                if (m.type === type) return m
            })
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
                nombre: this.name,
                status: 'orden creada',
                total: this.total,
                // local: this.selectedPremises,
                metodo_de_pago: this.selectedPaymentMethod,
                metodo_de_entrega: this.selectedPickupMethod,
            }
            if (data.metodo_de_entrega === 'Delivery') {
                data.direcion_1 = this.getLocationForMessage()
                data.direcion_2 = this.address
            }
            var url =
                'https://script.google.com/macros/s/AKfycbzPCB7GpZlqm0iKBy8mDPpa12_QFmcTukrsPlaINRFSYjWGvfD9/exec'
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
                        parseFloat(this.defaultLat) &&
                    parseFloat(this.center.lng) === parseFloat(this.defaultLng)
                ) {
                    return `>> Pedir Ubicacion !!`
                } else {
                    if (this.center.lat < 0)
                        this.center.lng = `+${this.center.lng}` //Google Maps
                    if (this.center.lng < 0)
                        this.center.lng = `+${this.center.lng}` //Google Maps
                    return `https://www.google.com/maps?q=${this.center.lat},${this.center.lng}`
                    // return `https://waze.com/ul?ll=${this.center.lat},${this.center.lng}&z=10`
                }
            } else {
                let lat = parseFloat(this.location.lat)
                let lng = parseFloat(this.location.lng)
                if (lat === NaN || lng === NaN) return `>> Pedir Ubicacion !!`
                if (lat < 0) lat = `+${lat}` //Google Maps
                if (lng < 0) lng = `+${lng}` //Google Maps
                return `https://www.google.com/maps?q=${lat},${lng}`
                // return `https://waze.com/ul?ll=${lat},${lng}&z=10`
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
                        lat: parseFloat(this.defaultLat),
                        lng: parseFloat(this.defaultLng),
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
            // if (this.selectedPremises == '') {
            //     alert('Debes el local de servicio.')
            //     return
            // }
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
                this.$analytics.logEvent('wp-garageburgers', {
                    content_action: 'Orden Completada',
                })
                // await this.sendToGoogleDriveSheet()
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
        this.$analytics.logEvent('wp-garageburgers', {
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
