<template>
    <q-page class="bg-grey-2">
        <q-img
            :src="require('@/assets/wp/ceciliapescao/logo.jpg')"
            class="shadow-7"
        />

        <div class="q-pa-md">
            <div class="text-subtitle2 text-indigo-10 q-mb-sm q-mt-md">
                Categorias
            </div>
            <q-select
                filled
                v-model="selectedCategory"
                :options="categories"
                class="q-mb-md"
                label="Seleccione"
                color="indigo-10"
            />
            <!-- MENU ITEMS -->
            <div v-for="(item, i) in filterMenu(menu)" :key="i">
                <div
                    v-if="item.title == 'Almejas al ajillo'"
                    class="text-h6 text-center q-my-lg text-indigo-10 poppins-bold"
                >
                    ENTRADAS / STARTERS
                </div>
                <div
                    v-if="item.title == 'Pescado entero frito'"
                    class="text-h6 text-center q-mt-xl q-mb-lg text-indigo-10 poppins-bold"
                >
                    PLATILLOS / MAIN DISHES
                </div>
                <div
                    v-if="item.title == 'Ceviche de pescado'"
                    class="text-h6 text-center q-mt-xl q-mb-lg text-indigo-10 poppins-bold"
                >
                    CEVICHES
                </div>
                <div
                    v-if="item.title == 'Cerveza nacional'"
                    class="text-h6 text-center q-mt-xl q-mb-lg text-indigo-10 poppins-bold"
                >
                    BEBIDAS / DRINKS
                </div>
                <div
                    v-if="item.title == 'Acompañamientos adicionales'"
                    class="text-h6 text-center q-mt-xl q-mb-lg text-indigo-10 poppins-bold"
                >
                    ACOMPAÑAMIENTOS / SIDES
                </div>
                <q-card class="full-width q-mb-lg">
                    <q-img
                        v-if="item.pic"
                        :src="require(`@/assets/wp/demo/${item.pic}`)"
                    />
                    <q-card-section class="q-pb-none">
                        <div class="row">
                            <div
                                class="col text-h6"
                                style="text-transform: uppercase;"
                            >
                                {{ item.title }}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col text-subtitle2">
                                {{ item.subtitle }}
                            </div>
                        </div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <div class="text-h6 poppins-bold">
                            {{
                                item.price > 0
                                    ? '$' + item.price.toFixed(2)
                                    : ''
                            }}
                        </div>
                        <div
                            class="text-h6 poppins-bold"
                            v-if="item.price == 0"
                        >
                            Desde $ {{ item.styles[0].price.toFixed(2) }}
                        </div>
                        <div class="text-caption text-grey">
                            {{ item.desc }}
                        </div>
                    </q-card-section>

                    <q-separator />

                    <q-card-actions>
                        <q-space />
                        <q-btn flat color="indigo-10" @click="selectItem(item)"
                            >Agregar</q-btn
                        >
                    </q-card-actions>
                </q-card>
            </div>

            <!-- END MENU ITEMS -->

            <!-- STYLES DIALOG -->
            <q-dialog v-model="stylesDialog">
                <q-card
                    style="width: 700px; max-width: 80vw;"
                    class="bg-grey-2"
                >
                    <q-card-section class="q-py-sm">
                        <div class="text-h6 text-center poppins-bold">
                            ELIJA
                        </div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                        <q-btn
                            outline
                            color="indigo-10"
                            class="poppins-bold full-width q-mb-md"
                            v-for="(style, i) in menu[selectedItemIndex].styles"
                            :key="i"
                            @click="addItemToCart('style', style)"
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
                <q-card
                    style="width: 700px; max-width: 80vw;"
                    class="bg-grey-2"
                >
                    <q-card-section class="q-py-sm">
                        <div class="text-h6 text-center poppins-bold">
                            ELIJA
                        </div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                        <q-btn
                            color="indigo-10"
                            class="poppins-bold full-width q-mb-md"
                            outline
                            v-for="(option, i) in menu[selectedItemIndex]
                                .options"
                            :key="i"
                            @click="addItemToCart('option', option)"
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

            <!-- SUCCESS DIALOG -->
            <q-dialog v-model="successDialog">
                <q-card
                    style="width: 700px; max-width: 80vw;"
                    class="bg-grey-2"
                >
                    <q-card-section>
                        <div class="text-h6 text-center poppins-bold">
                            Agregado con exito
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <q-btn
                            color="indigo-10"
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
                <q-card class="bg-grey-9 text-white">
                    <q-bar style="height: 45px;">
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
                                    <strong v-if="item.type == 'starter'">
                                        ({{ item.amount }}) Entrada -
                                        {{ item.title }}
                                    </strong>
                                    <strong v-if="item.type == 'main'">
                                        ({{ item.amount }}) {{ item.title }}
                                        {{
                                            item.styles.title
                                                ? `- ${item.styles.title}`
                                                : ''
                                        }}
                                        -
                                        {{ item.options.title }}
                                    </strong>
                                    <strong v-if="item.type == 'ceviche'"
                                        >({{ item.amount }})
                                        {{ item.title }}</strong
                                    >
                                    <strong v-if="item.type == 'side'">
                                        ({{ item.amount }}) Extra -
                                        {{ item.title }}
                                        {{ item.options.title }}
                                    </strong>
                                    <strong v-if="item.type == 'drink'">
                                        ({{ item.amount }}) {{ item.title }} -
                                        {{ item.options.title }}
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
                                    style="font-size: 75px;"
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
                                    Datos de pedido
                                </div>
                            </div>
                        </div>
                        <div class="row q-mb-md">
                            <div class="text-subtitle2 poppins-bold q-mb-sm">
                                Nombre:
                            </div>
                            <q-input
                                v-model="name"
                                filled
                                dark
                                type="text"
                                class="full-width poppins-regular"
                                placeholder="Nombre Apellido"
                                color="indigo-10"
                            />
                        </div>
                        <div class="row q-mb-md">
                            <div class="text-subtitle2 poppins-bold q-mb-sm">
                                Metodo de entrega:
                            </div>
                            <q-btn-toggle
                                v-model="selectedPickupMethod"
                                spread
                                all-caps
                                class="poppins-bold full-width"
                                toggle-color="indigo-10"
                                color="white"
                                text-color="black"
                                :options="pickupMethods"
                            />
                        </div>
                        <div
                            class="row"
                            v-if="this.selectedPickupMethod == 'Delivery'"
                        >
                            <div class="text-subtitle2 poppins-bold q-mb-sm">
                                Ubicacion de entrega:
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
                                Direccion de entrega (completa):
                            </div>
                            <q-input
                                v-model="address"
                                filled
                                dark
                                type="textarea"
                                class="full-width poppins-regular"
                                placeholder="Barriada, No. Calle, No. Casa"
                                color="indigo-10"
                                rows="4"
                            />
                        </div>
                        <div class="row">
                            <div class="text-subtitle2 poppins-bold q-mb-sm">
                                Metodo de pago:
                            </div>
                            <q-btn-toggle
                                v-model="selectedPaymentMethod"
                                spread
                                all-caps
                                class="poppins-bold full-width"
                                toggle-color="indigo-10"
                                color="white"
                                text-color="black"
                                :options="paymentMethods"
                            />
                        </div>
                    </q-card-section>
                    <q-card-section v-if="cart.length > 0">
                        <div class="row">
                            <div class="col text-center">
                                <div class="text-h5 poppins-bold">
                                    Total: $ {{ total.toFixed(2) }}
                                </div>
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <q-btn
                            color="green-7"
                            class="full-width q-mb-md poppins-bold"
                            @click="sendChat"
                            :disable="cart.length <= 0 || displayLoading"
                        >
                            <span v-if="!displayLoading">Enviar</span>
                            <q-spinner-facebook
                                v-if="displayLoading"
                                color="white"
                                size="1em"
                            />
                        </q-btn>
                    </q-card-section>
                </q-card>
            </q-dialog>
            <!-- END CART DIALOG -->

            <!-- NEW DIALOG -->
            <q-dialog v-model="seamless" seamless position="bottom">
                <q-card
                    style="width: 350px; border-radius: 0;"
                    class="bg-indigo-10 text-white"
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
import emailjs from 'emailjs-com'

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
                'Todo / All',
                'Entradas / Starters',
                'Platillos / Main dishes',
                'Ceviches',
                'Bebidas / Drinks',
                'Acompañantes / Sides',
            ],
            selectedItemIndex: 0,
            name: '',
            orderNo: '',
            seamless: false,
            displayLoading: false,
            whatsappNumber: '62042578',
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
            selectedPaymentMethod: null,
            selectedPickupMethod: '',
            address: '',
            total: 0,
            location: [],
            markers: [],
            center: {},
            optionsDialog: false,
            stylesDialog: false,
            successDialog: false,
            cartDialog: false,
            cart: [],
            menu: [
                {
                    title: 'Almejas al ajillo',
                    subtitle: 'Clams in garlic sauce',
                    desc: '',
                    options: [{title: 'Regular', price: 0}],
                    styles: [],
                    pic: '',
                    price: 6,
                    type: 'starter',
                },
                {
                    title: 'Deditos de pescado',
                    subtitle: 'Fish fingers',
                    desc: '',
                    options: [{title: 'Regular', price: 0}],
                    styles: [],
                    pic: '',
                    price: 6,
                    type: 'starter',
                },
                {
                    title: 'Alitas',
                    subtitle: 'Buffalo wings',
                    desc: '',
                    options: [{title: 'Regular', price: 0}],
                    styles: [],
                    pic: '',
                    price: 6,
                    type: 'starter',
                },
                {
                    title: 'Arañitas',
                    subtitle: 'Fried baby squid',
                    desc: '',
                    options: [{title: 'Regular', price: 0}],
                    styles: [],
                    pic: '',
                    price: 6,
                    type: 'starter',
                },
                {
                    title: 'Sopa de mariscos',
                    subtitle: 'Seafood mix soup',
                    desc: '',
                    options: [{title: 'Regular', price: 0}],
                    styles: [],
                    pic: '',
                    price: 8,
                    type: 'starter',
                },
                {
                    title: 'Pescado entero frito',
                    subtitle: 'Fried fish',
                    desc:
                        'Pescado entero frito chico, mediano o grande, con ensalada y acompañamiento de su eleccion.',
                    options: [
                        {title: 'Patacones', price: 0},
                        {title: 'Yuca al mojo', price: 0},
                        {title: 'Yuca frita', price: 0},
                        {title: 'Papas fritas', price: 0},
                        {title: 'Arroz', price: 0},
                    ],
                    styles: [
                        {
                            title: 'Chico',
                            price: 10,
                        },
                        {
                            title: 'Mediano',
                            price: 12,
                        },
                        {
                            title: 'Grande',
                            price: 15,
                        },
                    ],
                    pic: '',
                    price: 0,
                    type: 'main',
                },
                {
                    title: 'Filete de pescado frito',
                    subtitle: 'Fried fish filet',
                    desc: 'Con ensalada y acompañamiento de su eleccion.',
                    options: [
                        {title: 'Patacones', price: 0},
                        {title: 'Yuca al mojo', price: 0},
                        {title: 'Yuca frita', price: 0},
                        {title: 'Papas fritas', price: 0},
                        {title: 'Arroz', price: 0},
                    ],
                    styles: [],
                    pic: '',
                    price: 8,
                    type: 'main',
                },
                {
                    title: 'Filete de pescado frito con salsa al ajillo',
                    subtitle: 'Fried fish filet with garlic sauce',
                    desc: 'Con ensalada y acompañamiento de su eleccion.',
                    options: [
                        {title: 'Patacones', price: 0},
                        {title: 'Yuca al mojo', price: 0},
                        {title: 'Yuca frita', price: 0},
                        {title: 'Papas fritas', price: 0},
                        {title: 'Arroz', price: 0},
                    ],
                    styles: [],
                    pic: '',
                    price: 9,
                    type: 'main',
                },
                {
                    title: 'Filete de pescado frito apanado',
                    subtitle: 'Breaded fried fish filet',
                    desc: 'Con ensalada y acompañamiento de su eleccion.',
                    options: [
                        {title: 'Patacones', price: 0},
                        {title: 'Yuca al mojo', price: 0},
                        {title: 'Yuca frita', price: 0},
                        {title: 'Papas fritas', price: 0},
                        {title: 'Arroz', price: 0},
                    ],
                    styles: [],
                    pic: '',
                    price: 9,
                    type: 'main',
                },
                {
                    title: 'Especial de la casa, Pescado a lo macho',
                    subtitle: '',
                    desc:
                        'Pescado entero frito con mixto de marisco, camarones, almejas y langosta, con ensalada y acompañamiento de su eleccion. / Specialty of the house, fried fish with seafood mix, shrimps, clams and lobster, with salad and side of your choice.',
                    options: [
                        {title: 'Patacones', price: 0},
                        {title: 'Yuca al mojo', price: 0},
                        {title: 'Yuca frita', price: 0},
                        {title: 'Papas fritas', price: 0},
                        {title: 'Arroz', price: 0},
                    ],
                    styles: [],
                    pic: '',
                    price: 35,
                    type: 'main',
                },
                {
                    title: 'Pescado frito con almejas',
                    subtitle: 'Fried fish with clams',
                    desc:
                        'Pescado frito con almejas chico, mediano o grande, con ensalada y acompañamiento de su eleccion.',
                    options: [
                        {title: 'Patacones', price: 0},
                        {title: 'Yuca al mojo', price: 0},
                        {title: 'Yuca frita', price: 0},
                        {title: 'Papas fritas', price: 0},
                        {title: 'Arroz', price: 0},
                    ],
                    styles: [
                        {
                            title: 'Chico',
                            price: 14,
                        },
                        {
                            title: 'Mediano',
                            price: 16,
                        },
                        {
                            title: 'Grande',
                            price: 19,
                        },
                    ],
                    pic: '',
                    price: 0,
                    type: 'main',
                },
                {
                    title: 'Pescado frito con camarones',
                    subtitle: 'Fried fish with shrimps',
                    desc:
                        'Pescado frito con camarones chico, mediano o grande, con ensalada y acompañamiento de su eleccion.',
                    options: [
                        {title: 'Patacones', price: 0},
                        {title: 'Yuca al mojo', price: 0},
                        {title: 'Yuca frita', price: 0},
                        {title: 'Papas fritas', price: 0},
                        {title: 'Arroz', price: 0},
                    ],
                    styles: [
                        {
                            title: 'Chico',
                            price: 14,
                        },
                        {
                            title: 'Mediano',
                            price: 16,
                        },
                        {
                            title: 'Grande',
                            price: 19,
                        },
                    ],
                    pic: '',
                    price: 0,
                    type: 'main',
                },
                {
                    title: 'Pescado frito con mixto de mariscos',
                    subtitle: 'Fried fish with seafood mix',
                    desc:
                        'Pescado frito con mixto de mariscos chico, mediano o grande, con ensalada y acompañamiento de su eleccion.',
                    options: [
                        {title: 'Patacones', price: 0},
                        {title: 'Yuca al mojo', price: 0},
                        {title: 'Yuca frita', price: 0},
                        {title: 'Papas fritas', price: 0},
                        {title: 'Arroz', price: 0},
                    ],
                    styles: [
                        {
                            title: 'Chico',
                            price: 14,
                        },
                        {
                            title: 'Mediano',
                            price: 16,
                        },
                        {
                            title: 'Grande',
                            price: 19,
                        },
                    ],
                    pic: '',
                    price: 0,
                    type: 'main',
                },
                {
                    title: 'Filete de pescado frito con almejas',
                    subtitle: 'Fried fish filet with clams',
                    desc: 'Con ensalada y acompañamiento de su eleccion.',
                    options: [
                        {title: 'Patacones', price: 0},
                        {title: 'Yuca al mojo', price: 0},
                        {title: 'Yuca frita', price: 0},
                        {title: 'Papas fritas', price: 0},
                        {title: 'Arroz', price: 0},
                    ],
                    styles: [],
                    pic: '',
                    price: 12,
                    type: 'main',
                },
                {
                    title: 'Filete de pescado frito con camarones',
                    subtitle: 'Fried fish filet with shrimps',
                    desc: 'Con ensalada y acompañamiento de su eleccion.',
                    options: [
                        {title: 'Patacones', price: 0},
                        {title: 'Yuca al mojo', price: 0},
                        {title: 'Yuca frita', price: 0},
                        {title: 'Papas fritas', price: 0},
                        {title: 'Arroz', price: 0},
                    ],
                    styles: [],
                    pic: '',
                    price: 12,
                    type: 'main',
                },
                {
                    title: 'Filete de pescado frito con mixto de mariscos',
                    subtitle: 'Fried fish filet with seafood mix',
                    desc: 'Con ensalada y acompañamiento de su eleccion.',
                    options: [
                        {title: 'Patacones', price: 0},
                        {title: 'Yuca al mojo', price: 0},
                        {title: 'Yuca frita', price: 0},
                        {title: 'Papas fritas', price: 0},
                        {title: 'Arroz', price: 0},
                    ],
                    styles: [],
                    pic: '',
                    price: 12,
                    type: 'main',
                },
                {
                    title: 'Picada mixta',
                    subtitle: 'Mixed platter',
                    desc:
                        'Picada mixta chicha o grande con ensalada y acompañamiento de su eleccion.',
                    options: [
                        {title: 'Patacones', price: 0},
                        {title: 'Yuca al mojo', price: 0},
                        {title: 'Yuca frita', price: 0},
                        {title: 'Papas fritas', price: 0},
                        {title: 'Arroz', price: 0},
                    ],
                    styles: [
                        {
                            title: 'Chica',
                            price: 20,
                        },
                        {
                            title: 'Grande',
                            price: 30,
                        },
                    ],
                    pic: '',
                    price: 0,
                    type: 'main',
                },

                {
                    title: 'Langosta',
                    subtitle: 'Lobster',
                    desc: 'Con ensalada y acompañamiento de su eleccion.',
                    options: [
                        {title: 'Patacones', price: 0},
                        {title: 'Yuca al mojo', price: 0},
                        {title: 'Yuca frita', price: 0},
                        {title: 'Papas fritas', price: 0},
                        {title: 'Arroz', price: 0},
                    ],
                    styles: [],
                    pic: '',
                    price: 35,
                    type: 'main',
                },
                {
                    title: 'Langostinos',
                    subtitle: 'Jumbo shrimps',
                    desc: 'Con ensalada y acompañamiento de su eleccion.',
                    options: [
                        {title: 'Patacones', price: 0},
                        {title: 'Yuca al mojo', price: 0},
                        {title: 'Yuca frita', price: 0},
                        {title: 'Papas fritas', price: 0},
                        {title: 'Arroz', price: 0},
                    ],
                    styles: [],
                    pic: '',
                    price: 12,
                    type: 'main',
                },
                {
                    title: 'Camarones al ajillo',
                    subtitle: 'Shrimps in garlic sauce',
                    desc: 'Con ensalada y acompañamiento de su eleccion.',
                    options: [
                        {title: 'Patacones', price: 0},
                        {title: 'Yuca al mojo', price: 0},
                        {title: 'Yuca frita', price: 0},
                        {title: 'Papas fritas', price: 0},
                        {title: 'Arroz', price: 0},
                    ],
                    styles: [],
                    pic: '',
                    price: 10,
                    type: 'main',
                },
                {
                    title: 'Camarones apanados',
                    subtitle: 'Breaded shrimps',
                    desc: 'Con ensalada y acompañamiento de su eleccion.',
                    options: [
                        {title: 'Patacones', price: 0},
                        {title: 'Yuca al mojo', price: 0},
                        {title: 'Yuca frita', price: 0},
                        {title: 'Papas fritas', price: 0},
                        {title: 'Arroz', price: 0},
                    ],
                    styles: [],
                    pic: '',
                    price: 10,
                    type: 'main',
                },
                {
                    title: 'Mixto de mariscos',
                    subtitle: 'Seafood mix',
                    desc: 'Con ensalada y acompañamiento de su eleccion.',
                    options: [
                        {title: 'Patacones', price: 0},
                        {title: 'Yuca al mojo', price: 0},
                        {title: 'Yuca frita', price: 0},
                        {title: 'Papas fritas', price: 0},
                        {title: 'Arroz', price: 0},
                    ],
                    styles: [],
                    pic: '',
                    price: 10,
                    type: 'main',
                },
                {
                    title: 'Patacones rellenos mixtos',
                    subtitle: 'Fried plantain cups filled with seafood',
                    desc: 'Con ensalada y acompañamiento de su eleccion.',
                    options: [
                        {title: 'Patacones', price: 0},
                        {title: 'Yuca al mojo', price: 0},
                        {title: 'Yuca frita', price: 0},
                        {title: 'Papas fritas', price: 0},
                        {title: 'Arroz', price: 0},
                    ],
                    styles: [],
                    pic: '',
                    price: 10,
                    type: 'main',
                },
                {
                    title: 'Patacones rellenos de camarones',
                    subtitle: 'Fried plantain cups filled with shrimps',
                    desc: 'Con ensalada y acompañamiento de su eleccion.',
                    options: [
                        {title: 'Patacones', price: 0},
                        {title: 'Yuca al mojo', price: 0},
                        {title: 'Yuca frita', price: 0},
                        {title: 'Papas fritas', price: 0},
                        {title: 'Arroz', price: 0},
                    ],
                    styles: [],
                    pic: '',
                    price: 12,
                    type: 'main',
                },
                {
                    title: 'Tiritas de pollo frito',
                    subtitle: 'Chicken tenders',
                    desc: 'Con ensalada y acompañamiento de su eleccion.',
                    options: [
                        {title: 'Patacones', price: 0},
                        {title: 'Yuca al mojo', price: 0},
                        {title: 'Yuca frita', price: 0},
                        {title: 'Papas fritas', price: 0},
                        {title: 'Arroz', price: 0},
                    ],
                    styles: [],
                    pic: '',
                    price: 8,
                    type: 'main',
                },
                {
                    title: 'Ceviche de pescado',
                    subtitle: 'Fish',
                    desc: '',
                    options: [{title: 'Regular', price: 0}],
                    styles: [],
                    pic: '',
                    price: 2,
                    type: 'ceviche',
                },
                {
                    title: 'Ceviche de camaron',
                    subtitle: 'Shrimp',
                    desc: '',
                    options: [{title: 'Regular', price: 0}],
                    styles: [],
                    pic: '',
                    price: 3.5,
                    type: 'ceviche',
                },
                {
                    title: 'Ceviche de pulpo',
                    subtitle: 'Octopus',
                    desc: '',
                    options: [{title: 'Regular', price: 0}],
                    styles: [],
                    pic: '',
                    price: 3,
                    type: 'ceviche',
                },
                {
                    title: 'Ceviche de combinacion',
                    subtitle: 'Combination',
                    desc: '',
                    options: [{title: 'Regular', price: 0}],
                    styles: [],
                    pic: '',
                    price: 4,
                    type: 'ceviche',
                },
                {
                    title: 'Ceviche de concha negra',
                    subtitle: 'Black shell',
                    desc: '',
                    options: [{title: 'Regular', price: 0}],
                    styles: [],
                    pic: '',
                    price: 4.5,
                    type: 'ceviche',
                },
                {
                    title: 'Cocktail de combinacion',
                    subtitle: 'Combination cocktail',
                    desc: '',
                    options: [{title: 'Regular', price: 0}],
                    styles: [],
                    pic: '',
                    price: 4.25,
                    type: 'ceviche',
                },
                {
                    title: 'Cocktail de camaron',
                    subtitle: 'Shrimp Cocktail',
                    desc: '',
                    options: [{title: 'Regular', price: 0}],
                    styles: [],
                    pic: '',
                    price: 4,
                    type: 'ceviche',
                },
                {
                    title: 'Cerveza nacional',
                    subtitle: 'National beer',
                    desc: '',
                    options: [
                        {title: 'Atlas', price: 0},
                        {title: 'Balboa', price: 0},
                        {title: 'Panama', price: 0},
                        {title: 'Soberana', price: 0},
                    ],
                    styles: [],
                    pic: '',
                    price: 1.25,
                    type: 'drink',
                },
                {
                    title: 'Cerveza internacional',
                    subtitle: 'International beer',
                    desc: '',
                    options: [
                        {title: 'Miller Lite', price: 0},
                        {title: 'Coors Light', price: 0},
                    ],
                    styles: [],
                    pic: '',
                    price: 2,
                    type: 'drink',
                },
                {
                    title: 'Corona',
                    subtitle: '',
                    desc: '',
                    options: [{title: 'Botella', price: 0}],
                    styles: [],
                    pic: '',
                    price: 2.5,
                    type: 'drink',
                },
                {
                    title: 'Smirnoff Ice',
                    subtitle: '',
                    desc: '',
                    options: [{title: 'Botella', price: 0}],
                    styles: [],
                    pic: '',
                    price: 2.5,
                    type: 'drink',
                },
                {
                    title: 'Gatorade',
                    subtitle: '',
                    desc: '',
                    options: [{title: 'Botella', price: 0}],
                    styles: [],
                    pic: '',
                    price: 2,
                    type: 'drink',
                },
                {
                    title: 'Soda',
                    subtitle: 'Soft drinks',
                    desc: '',
                    options: [
                        {title: 'Coca Cola', price: 0},
                        {title: 'Squirt', price: 0},
                        {title: 'Ginger Ale', price: 0},
                    ],
                    styles: [],
                    pic: '',
                    price: 1,
                    type: 'drink',
                },
                {
                    title: 'Agua',
                    subtitle: 'Bottled water',
                    desc: '',
                    options: [{title: 'Botella', price: 0}],
                    styles: [],
                    pic: '',
                    price: 1,
                    type: 'drink',
                },
                {
                    title: 'Te frio',
                    subtitle: 'Iced tea',
                    desc: '',
                    options: [{title: 'Regular', price: 0}],
                    styles: [],
                    pic: '',
                    price: 2,
                    type: 'drink',
                },
                {
                    title: 'Limonada',
                    subtitle: 'Lemonade',
                    desc: '',
                    options: [{title: 'Regular', price: 0}],
                    styles: [],
                    pic: '',
                    price: 2,
                    type: 'drink',
                },
                {
                    title: 'Acompañamientos adicionales',
                    subtitle: 'Sides',
                    desc: '',
                    options: [
                        {title: 'Patacones', price: 0},
                        {title: 'Yuca al mojo', price: 0},
                        {title: 'Yuca frita', price: 0},
                        {title: 'Papas fritas', price: 0},
                        {title: 'Arroz', price: 0},
                    ],
                    styles: [],
                    pic: '',
                    price: 2,
                    type: 'side',
                },
            ],
        }
    },
    methods: {
        filterMenu(menu) {
            let type = ''
            if (this.selectedCategory === 'Todo / All') {
                type = 'all'
                return this.menu
            }
            if (this.selectedCategory === null) {
                return this.menu
            }
            if (this.selectedCategory === 'Entradas / Starters')
                type = 'starter'
            if (this.selectedCategory === 'Platillos / Main dishes')
                type = 'main'
            if (this.selectedCategory === 'Ceviches') type = 'ceviche'
            if (this.selectedCategory === 'Bebidas / Drinks') type = 'drink'
            if (this.selectedCategory === 'Acompañantes / Sides') type = 'side'
            return menu.filter(m => {
                if (m.type === type) return m
            })
        },
        selectItem(item) {
            let itemInMenu = this.menu.filter((m, index) => {
                if (m.title === item.title) {
                    this.selectedItemIndex = index
                    return m
                }
            })
            this.selectedItem = Object.assign(
                {},
                this.menu[this.selectedItemIndex]
            )
            if (this.selectedItem.styles.length > 0) {
                this.stylesDialog = true
                return
            }
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
        addItemToCart(section, item) {
            if (section === 'style') {
                this.selectedItem.styles = item
                this.stylesDialog = false
                this.optionsDialog = true
            } else {
                this.selectedItem.options = item
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
            }
        },
        removeItemFromCart(i) {
            this.cart.splice(i, 1)
        },
        getLocationForMessage() {
            if (this.location.length <= 0) {
                let lat = parseFloat(this.center.lat)
                let lng = parseFloat(this.center.lng)
                if (lat < 0) lat = `+${lat}`
                if (lng < 0) lng = `+${lng}`
                return `https://www.google.com/maps?q=${lat},${lng}`
            } else {
                let lat = parseFloat(this.location.lat)
                let lng = parseFloat(this.location.lng)
                if (lat < 0) lat = `+${lat}`
                if (lng < 0) lng = `+${lng}`
                return `https://www.google.com/maps?q=${lat},${lng}`
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
                        lat: parseFloat(9.068463),
                        lng: parseFloat(-79.452694),
                    }
                    this.markers.push({position: this.center})
                }
            )
        },
        calculateTotal() {
            let total = 0
            this.cart.forEach(c => {
                if (c.price) total += c.price * c.amount
                if (c.options.price) total += c.options.price * c.amount
                if (c.styles.price) total += c.styles.price * c.amount
            })
            this.total = total
        },
        generateMessage() {
            let message =
                'Buenas, me gustaria realizar un pedido de:%0D%0A%0D%0A'
            for (let item of this.cart) {
                if (item.type == 'starter')
                    message += `- (${item.amount}) ${item.title}%0D%0A`
                if (item.type == 'main')
                    message += `- (${item.amount}) ${item.title} ${
                        item.styles.title ? '- ' + item.styles.title + ' ' : ''
                    } - ${item.options.title}%0D%0A`
                if (item.type == 'ceviche')
                    message += `- (${item.amount}) ${item.title}%0D%0A`
                if (item.type == 'side')
                    message += `- (${item.amount}) Extra - ${item.title} - ${item.options.title}%0D%0A`
                if (item.type == 'drink')
                    message += `- (${item.amount}) ${item.title} - ${item.options.title}%0D%0A`
            }
            message += `%0D%0ANo. de pedido: ${this.orderNo}%0D%0ANombre: ${this.name}`
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
        async sendEmail() {
            let message = ''
            for (let item of this.cart) {
                if (item.type == 'starter')
                    message += `(${item.amount}) ${item.title}<br>`
                if (item.type == 'main')
                    message += `(${item.amount}) ${item.title} ${
                        item.styles.title ? '- ' + item.styles.title + ' ' : ''
                    } - ${item.options.title}<br>`
                if (item.type == 'ceviche')
                    message += `(${item.amount}) ${item.title}<br>`
                if (item.type == 'side')
                    message += `(${item.amount}) Extra - ${item.title} - ${item.options.title}<br>`
                if (item.type == 'drink')
                    message += `(${item.amount}) ${item.title} - ${item.options.title}<br>`
            }
            let data = {
                id: this.orderNo,
                pedido: message,
                nombre: this.name,
                status: 'orden creada',
                total: this.total,
                metodo_de_pago: this.selectedPaymentMethod,
                metodo_de_entrega: this.selectedPickupMethod,
            }
            if (data.metodo_de_entrega === 'Delivery') {
                data.direcion_1 = this.getLocationForMessage()
                data.direcion_2 = this.address
            }
            await emailjs.send(
                'gmail',
                'template_n11yl4q',
                data,
                'user_l9KYZVj8DNvwXi3kegar5'
            )
        },
        async sendChat() {
            if (this.name == '') {
                alert('Debes ingresar tu nombre para enviar el pedido.')
                return
            }
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
                this.$analytics.logEvent('wp-ceciliapescao', {
                    content_action: 'Orden Completada',
                })
                this.displayLoading = true
                await this.sendEmail()
                let whatsappMessage = await this.generateMessage()
                this.cart = []
                this.seamless = false
                window.location.href = `https://wa.me/507${this.whatsappNumber}?text=${whatsappMessage}`
                this.displayLoading = false
            }
        },
    },
    mounted() {
        this.$store.commit('SET_DISPLAYFOOTER', false)
        let path = this.$route.params.path
        this.$analytics.logEvent('wp-ceciliapescao', {
            path,
        })
        this.geolocate()
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
    components: {
        GoogleMaps,
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
