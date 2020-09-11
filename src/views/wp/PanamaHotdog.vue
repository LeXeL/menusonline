<template>
    <q-page class="bg-grey-2">
        <q-img :src="require('@/assets/wp/panamahotdog/logo.jpg')" class="shadow-7" />
        <div class="q-pa-md">
            <div class="text-subtitle2 poppins-bold q-mt-sm">
                <i class="fab fa-instagram text-red-8"></i>
                <a
                    href="http://www.instagram.com/panamahotdogoficial"
                    style="text-decoration: none; color: black;"
                >&nbsp;PanamaHotdogOficial</a>
            </div>
            <div class="text-subtitle2 poppins-bold q-mb-lg">
                <i class="fab fa-whatsapp text-red-8"></i> Comprobantes al 6684-7121
            </div>
            <div class="text-h5 text-center q-mt-sm q-mb-lg poppins-bold">REALIZA TU PEDIDO</div>

            <!-- MENU ITEMS -->
            <q-card class="full-width q-mb-lg" v-for="(item, i) in menu" :key="i">
                <q-img v-if="item.pic" :src="require(`@/assets/wp/panamahotdog/${item.pic}`)" />
                <q-card-section class="q-pb-none">
                    <div class="row">
                        <div
                            class="text-subtitle2 poppins-bold text-red-8 full-width"
                            v-if="item.subtitle != null"
                        >{{ item.subtitle }}</div>
                        <div class="text-h6">{{ item.title }}</div>
                    </div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div
                        v-if="item.price"
                        class="text-h6 poppins-bold"
                    >$ {{ item.price.toFixed(2) }}</div>
                    <div class="text-caption text-grey">{{ item.desc }}</div>
                </q-card-section>

                <q-separator />

                <q-card-actions>
                    <q-space />
                    <q-btn
                        flat
                        color="red-7"
                        @click="selectItem(i)"
                        :disable="isWeekendItem(item)"
                    >Agregar</q-btn>
                </q-card-actions>
            </q-card>
            <!-- END MENU ITEMS -->

            <!-- STYLES DIALOG -->
            <q-dialog v-model="stylesDialog">
                <q-card style="width: 700px; max-width: 80vw;" class="bg-grey-2">
                    <q-card-section class="q-py-sm">
                        <div class="text-h6 text-center poppins-bold">ESTILO</div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                        <q-btn
                            text-color="black"
                            outline
                            class="poppins-bold full-width q-mb-md"
                            v-for="(style, i) in menu[selectedItemIndex].styles"
                            :key="i"
                            @click="addItemToCart('style',style)"
                        >
                            {{ style.title }}
                            <br />
                            {{ style.price > 0 ? '$'+style.price.toFixed(2):'' }}
                        </q-btn>
                        <q-btn
                            color="red-7"
                            flat
                            class="poppins-bold full-width q-mb-md"
                            @click="stylesDialog = false"
                        >Cancelar</q-btn>
                    </q-card-section>
                </q-card>
            </q-dialog>
            <!-- END STYLES DIALOG -->

            <!-- OPTIONS DIALOG -->
            <q-dialog v-model="optionsDialog">
                <q-card style="width: 700px; max-width: 80vw;" class="bg-grey-2">
                    <q-card-section class="q-py-sm">
                        <div class="text-h6 text-center poppins-bold">ELIJA</div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                        <q-btn
                            text-color="black"
                            outline
                            class="poppins-bold full-width q-mb-md"
                            v-for="(option, i) in menu[selectedItemIndex].options"
                            :key="i"
                            @click="addItemToCart('option',option)"
                        >
                            {{ option.title }}
                            <br />
                            {{ option.price > 0 ? '$'+option.price.toFixed(2):'' }}
                        </q-btn>
                        <q-btn
                            color="red-7"
                            flat
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
                            color="black"
                            outline
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
                                <div class="text-body2 poppins-regular">
                                    <strong>
                                        ({{ item.amount }}) {{ item.title }} {{item.styles.title ? `- ${item.styles.title}` :''}} -
                                        {{item.options.title}}
                                    </strong>
                                    <!-- <strong
                                        v-if="item.type == 'extras'"
                                    >({{ item.amount }}) Extra - {{item.options.title}}</strong>
                                    <strong
                                        v-if="item.type == 'drinks'"
                                    >({{ item.amount }}) Bebida - {{item.options.title}}</strong>-->
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
                        <div class="row text-center">
                            <div class="col">
                                <div class="text-h6 poppins-bold q-mb-md">Datos de orden</div>
                            </div>
                        </div>
                        <div class="row q-mb-md">
                            <div class="text-subtitle2 poppins-bold q-mb-sm">Nombre: *</div>
                            <q-input
                                v-model="name"
                                filled
                                dark
                                type="text"
                                class="full-width poppins-regular"
                                placeholder="Nombre Apellido"
                                color="red-7"
                            />
                        </div>
                        <div class="row q-mb-md">
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
                            />
                        </div>
                        <div class="row q-mb-md">
                            <div class="text-subtitle2 poppins-bold q-mb-sm">Metodo de entrega: *</div>
                            <q-btn-toggle
                                v-model="selectedPickupMethod"
                                spread
                                all-caps
                                class="poppins-bold full-width"
                                toggle-color="red-7"
                                color="white"
                                text-color="black"
                                :options="pickupMethods"
                            />
                        </div>
                        <div class="row" v-if="this.selectedPickupMethod == 'Delivery'">
                            <div class="text-subtitle2 poppins-bold q-mb-sm">Ubicacion de entrega: *</div>
                        </div>
                        <GoogleMaps
                            class="q-mb-md"
                            v-if="Object.keys(center).length > 0 && this.selectedPickupMethod == 'Delivery'"
                            @markerPosition="setMarkerPosition"
                            :editable="true"
                            :markers="markers"
                            :mapCenter="center"
                        ></GoogleMaps>
                        <div class="row q-mb-md" v-if="selectedPickupMethod == 'Delivery'">
                            <div
                                class="text-subtitle2 poppins-bold q-mb-sm"
                            >Direccion de entrega (completa): *</div>
                            <q-input
                                v-model="address"
                                filled
                                dark
                                type="textarea"
                                class="full-width poppins-regular"
                                placeholder="Barriada, No. Calle, No. Casa"
                                color="red-7"
                                rows="4"
                            />
                        </div>
                        <div class="row">
                            <div class="text-subtitle2 poppins-bold q-mb-sm">Metodo de pago: *</div>
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
                            <div
                                class="text-subtitle2 text-center q-mt-lg poppins-bold"
                                v-if="selectedPaymentMethod == 'Yappy'"
                            >Recuerda enviar el comprobante de pago por WhatsApp al numero 6684-7121</div>
                        </div>
                    </q-card-section>
                    <q-card-section v-if="cart.length > 0">
                        <div class="row">
                            <div class="col text-center">
                                <div class="text-h5 poppins-bold">Total: $ {{ total.toFixed(2) }}</div>
                                <div
                                    class="text-subtitle2 poppins-bold text-red-8"
                                    v-if="selectedPickupMethod == 'Delivery'"
                                >Sin costos por delivery.</div>
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
                <q-card style="width: 350px; border-radius: 0;" class="bg-red-7 text-white">
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
import GoogleMaps from '../../components/general/GoogleMaps'

export default {
    data() {
        return {
            orderNo: '',
            name: '',
            specialComments: '',
            selectedItemIndex: 0,
            seamless: false,
            whatsappNumber: '60539696',
            selectedItem: {},
            paymentMethods: [
                {label: 'Yappy', value: 'Yappy'},
                {label: 'Efectivo', value: 'Efectivo'},
            ],
            pickupMethods: [
                {label: 'Delivery', value: 'Delivery'},
                {label: 'Retirar en local', value: 'Retirar en local'},
            ],
            selectedPickupMethod: '',
            selectedPaymentMethod: null,
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
                    title: 'Hotdog Hawaiiano',
                    desc:
                        'Ketchup, mayonesa, queso blanco rayado, papitas trituradas y jalea de piña.',
                    type: 'main',
                    pic: 'hotdog_hawaiiano.jpg',
                    price: 2,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Chorizo',
                            price: 0.5,
                        },
                    ],
                },
                {
                    title: 'Hotdog Panameño',
                    desc:
                        'Ketchup, mayonesa, pico de gallo y queso amarillo fundido.',
                    type: 'main',
                    pic: 'hotdog_panameno.jpeg',
                    price: 2,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Chorizo',
                            price: 0.5,
                        },
                    ],
                },
                {
                    title: 'Chillidog',
                    desc:
                        'Ketchup, mayonesa, carne molida, y queso amarillo fundido.',
                    type: 'main',
                    pic: 'chillidog.jpeg',
                    price: 2.5,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Chorizo',
                            price: 0.5,
                        },
                    ],
                },
                {
                    title: 'Salchipapas Sencillas',
                    desc:
                        'Papas, salchichas, ketchup, mayonesa y queso amarillo.',
                    type: 'main',
                    pic: 'salchipapas.jpeg',
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Pequeño',
                            price: 3,
                        },
                        {
                            title: 'Grande',
                            price: 5,
                        },
                    ],
                },
                {
                    title: 'Salchipapas Revoltosa',
                    desc:
                        'Papas fritas, salchichas, ketchup, mayonesa, queso amarillo, carne molida o pollo y pico de gallo.',
                    type: 'main',
                    pic: 'salchipapas_revoltosa.jpeg',
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Carne molida - Pequeño',
                            price: 4,
                        },
                        {
                            title: 'Carne molida - Grande',
                            price: 6.5,
                        },
                        {
                            title: 'Pollo - Pequeño',
                            price: 4,
                        },
                        {
                            title: 'Pollo - Grande',
                            price: 6.5,
                        },
                        {
                            title: 'Mixta - Pequeña',
                            price: 4.5,
                        },
                        {
                            title: 'Mixta - Grande',
                            price: 7,
                        },
                    ],
                },
                {
                    title: 'Hamburguesa de carne',
                    desc:
                        'Ketchup, mayonesa, lechuga, tomate, queso amarillo fundido, carne de res 8oz.',
                    type: 'main',
                    pic: 'hamburguesa_carne.jpeg',
                    price: 4,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                        {
                            title: 'Con tocino',
                            price: 1,
                        },
                    ],
                },
                {
                    title: 'Hamburguesa de pollo',
                    desc:
                        'Mayonesa, lechuga, tomate, tender de pechuga de pollo, queso blanco, o amarillo.',
                    type: 'main',
                    pic: 'hamburguesa_pollo.jpeg',
                    styles: [],
                    sides: [],
                    price: 4,
                    options: [
                        {
                            title: 'Regular con queso blanco',
                            price: 0,
                        },
                        {
                            title: 'Regular con queso amarillo',
                            price: 0,
                        },
                        {
                            title: 'Con tocino y queso blanco',
                            price: 1,
                        },
                        {
                            title: 'Con tocino y queso amarillo',
                            price: 1,
                        },
                    ],
                },
                {
                    title: 'Hamburguesa Bulldog',
                    desc:
                        'Carne de res 8oz, tender de pollo, tocino, lechuga, tomate, queso amarillo fundido, ketchup y mayonesa.',
                    type: 'main',
                    pic: 'hamburguesa_bulldog.jpeg',
                    styles: [],
                    sides: [],
                    price: 6,
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Arepas',
                    desc:
                        'Elige entre arepa de pollo, arepa de carne desmechada o arepa mixta.',
                    type: 'main',
                    pic: 'arepa_mixta.jpeg',
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Pollo',
                            price: 4,
                        },
                        {
                            title: 'Carne desmechada',
                            price: 4,
                        },
                        {
                            title: 'Mixta',
                            price: 4,
                        },
                    ],
                },
                {
                    title: 'Burritos',
                    desc:
                        'Elige entre burrito de carne, burrito de pollo o burrito mixto.',
                    type: 'main',
                    pic: 'burrito_carne.jpeg',
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Carne',
                            price: 4,
                        },
                        {
                            title: 'Pollo',
                            price: 4,
                        },
                        {
                            title: 'Mixto',
                            price: 4,
                        },
                    ],
                },
                {
                    title: 'Club sandwich con papas',
                    desc: '',
                    type: 'main',
                    pic: 'club_sandwich.jpeg',
                    price: 6,
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
                    title: 'Combito de hamburguesa',
                    desc: '4 alas, papas, hamburguesa y soda',
                    type: 'main',
                    pic: 'combito_hamburguesa.jpeg',
                    price: 6,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Coca Cola',
                            price: 0,
                        },
                        {
                            title: 'GingerAle',
                            price: 0,
                        },
                        {
                            title: 'Dr. Pepper',
                            price: 0,
                        },
                        {
                            title: 'Kist Fresa',
                            price: 0,
                        },
                        {
                            title: 'Maltin Polar',
                            price: 0,
                        },
                        {
                            title: 'Root Beer',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Combito de Hotdog',
                    desc:
                        'Elije entre Hotdog Panameño o Hotdog Hawaiiano, acompañado de 4 alas, papas y soda.',
                    type: 'main',
                    pic: 'combito_hawaiiano.jpg',
                    price: 6,
                    styles: [
                        {
                            title: 'Hotdog Hawaiiano',
                            price: 0,
                        },
                        {
                            title: 'Hotdog Panameño',
                            price: 0,
                        },
                    ],
                    sides: [],
                    options: [
                        {
                            title: 'Coca Cola',
                            price: 0,
                        },
                        {
                            title: 'GingerAle',
                            price: 0,
                        },
                        {
                            title: 'Dr. Pepper',
                            price: 0,
                        },
                        {
                            title: 'Kist Fresa',
                            price: 0,
                        },
                        {
                            title: 'Maltin Polar',
                            price: 0,
                        },
                        {
                            title: 'Root Beer',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Alitas con papas',
                    desc: '',
                    type: 'main',
                    pic: 'alitas.jpeg',
                    price: 6,
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
                    title: 'Empanadas',
                    desc: 'Carne molida, carne desmechada, queso blanco.',
                    type: 'main',
                    pic: 'empanadas.jpeg',
                    price: 2,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Carne molida',
                            price: 0,
                        },
                        {
                            title: 'Carne desmechada',
                            price: 0,
                        },
                        {
                            title: 'Queso blanco',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Papas fritas',
                    desc: 'Orden extra de papas fritas.',
                    type: 'main',
                    pic: 'orden_papas.jpeg',
                    price: 1.5,
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
                    title: 'Soda',
                    desc:
                        'Coca Cola, GingerAle, Dr. Pepper, Kist Fresa, Maltin Polar, Root Beer',
                    type: 'main',
                    pic: 'soda.jpg',
                    price: 1,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Coca Cola',
                            price: 0,
                        },
                        {
                            title: 'GingerAle',
                            price: 0,
                        },
                        {
                            title: 'Dr. Pepper',
                            price: 0,
                        },
                        {
                            title: 'Kist Fresa',
                            price: 0,
                        },
                        {
                            title: 'Maltin Polar',
                            price: 0,
                        },
                        {
                            title: 'Root Beer',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Jugo',
                    desc: 'Melocoton, Pera, Manzana.',
                    type: 'main',
                    pic: 'jugos.jpg',
                    price: 1,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Melocoton',
                            price: 0,
                        },
                        {
                            title: 'Pera',
                            price: 0,
                        },
                        {
                            title: 'Manzana',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Agua',
                    desc: 'Botella de agua de 600ml.',
                    type: 'main',
                    pic: 'agua.jpg',
                    price: 1,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Botella 600ml',
                            price: 0,
                        },
                    ],
                },
                {
                    title: 'Batido',
                    desc:
                        'Batidos de fresa, maracuya, papaya, Melocoton, Guanabana, Cornflakes.',
                    type: 'main',
                    pic: 'batido.jpeg',
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Fresa',
                            price: 2.5,
                        },
                        {
                            title: 'Maracuya',
                            price: 2.5,
                        },
                        {
                            title: 'Papaya',
                            price: 2.5,
                        },
                        {
                            title: 'Melocoton',
                            price: 2.5,
                        },
                        {
                            title: 'Guanabana',
                            price: 2.5,
                        },
                        {
                            title: 'Cornflakes',
                            price: 2,
                        },
                    ],
                },
                {
                    title: 'Limonada con hierbabuena',
                    desc: '',
                    type: 'main',
                    pic: 'limonada.jpg',
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 2,
                        },
                        {
                            title: 'Con fresa',
                            price: 2.5,
                        },
                    ],
                },
                {
                    title: 'Pescado con patacones',
                    subtitle: 'Solo viernes y sabados',
                    desc: '',
                    type: 'extra',
                    pic: 'filete_de_pescado.jpeg',
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Filete',
                            price: 8,
                        },
                        {
                            title: 'Entero',
                            price: 10,
                        },
                    ],
                    days: [5, 6],
                },
                {
                    title: 'Patacones',
                    subtitle: 'Solo viernes y sabados',
                    desc: 'Orden extra de patacones fritos.',
                    type: 'extra',
                    pic: 'patacones.jpg',
                    price: 1.5,
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                    days: [5, 6],
                },
                {
                    title: 'Saus',
                    subtitle: 'Solo viernes',
                    desc: '',
                    type: 'extra',
                    price: 2,
                    styles: [],
                    sides: [],
                    pic: 'saus.jpeg',
                    options: [
                        {
                            title: 'Regular',
                            price: 0,
                        },
                    ],
                    days: [5],
                },
                {
                    title: 'Ceviche',
                    subtitle: 'Solo viernes y sabados',
                    desc: '',
                    type: 'extra',
                    pic: 'ceviche.jpeg',
                    styles: [],
                    sides: [],
                    options: [
                        {
                            title: 'Tradicional 16oz.',
                            price: 5,
                        },
                        {
                            title: 'Gourmet 16oz.',
                            price: 6,
                        },
                    ],
                    days: [5, 6],
                },
            ],
        }
    },
    methods: {
        isWeekendItem(item) {
            let today = new Date().getDay()
            if (item.type == 'main') {
                return false
            } else if (item.days.includes(today)) {
                return false
            } else {
                return true
            }
        },
        selectItem(index) {
            this.selectedItemIndex = index
            this.selectedItem = Object.assign({}, this.menu[index])
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
        calculateTotal() {
            let total = 0
            this.cart.forEach(c => {
                if (c.price) total += c.price * c.amount
                total += c.options.price * c.amount
            })
            this.total = total
        },
        generateMessage() {
            let message =
                'Buenas me gustaria realizar un pedido de:%0D%0A%0D%0A'
            for (let item of this.cart) {
                message += `- (${item.amount}) ${item.title} ${
                    item.styles.title ? '-' + item.styles.title : ' '
                } - ${item.options.title}%0D%0A`
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
                if (item.type == 'main')
                    message += `(${item.amount}) ${item.title} con ${item.options.title}\n`
                if (item.type == 'extras')
                    message += `(${item.amount}) ${item.title} - ${item.options.title}\n`
                if (item.type == 'drinks')
                    message += `(${item.amount}) Bebida - ${item.options.title}\n`
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
            var url =
                'https://script.google.com/macros/s/AKfycbybmCSxZchLRwk4V4B3ev_D0mIyXPiDtXTEA0lrBmgcGAetIJo/exec'
            var xhr = new XMLHttpRequest()
            xhr.open('POST', url)
            // xhr.withCredentials = true;
            xhr.setRequestHeader(
                'Content-Type',
                'application/x-www-form-urlencoded'
            )
            // url encode form data for sending as post data
            var encoded = Object.keys(data)
                .map(function (k) {
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
                this.$analytics.logEvent('wp-panamahotdog', {
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
    mounted() {
        this.$store.commit('SET_DISPLAYFOOTER', false)
        let path = this.$route.params.path
        this.$analytics.logEvent('wp-panamahotdog', {
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
