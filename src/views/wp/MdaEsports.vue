<template>
    <q-page class="mda-bg">
        <!-- HEADER -->
        <q-img
            :src="require('@/assets/wp/mdaesports/banner.jpeg')"
            class="shadow-7"
        />
        <!-- /HEADER -->

        <!-- IG -->
        <div class="row q-py-md justify-center">
            <a
                :href="
                    `https://api.whatsapp.com/send/?phone=507${whatsappNo}&text&app_absent=0`
                "
                target="_blank"
                style="text-decoration: none"
            >
                <q-btn color="black" icon="fab fa-whatsapp" flat round />
            </a>
            <a
                href="https://www.instagram.com/mdaesportsleague/"
                target="_blank"
                style="text-decoration: none"
            >
                <q-btn color="black" icon="fab fa-instagram" flat round />
            </a>
            <a
                href="https://discord.com/invite/wMzycF8fbv"
                target="_blank"
                style="text-decoration: none"
            >
                <q-btn color="black" icon="fab fa-discord" flat round />
            </a>
            <a
                href="https://www.twitch.tv/mdaesportsleague"
                target="_blank"
                style="text-decoration: none"
            >
                <q-btn color="black" icon="fab fa-twitch" flat round />
            </a>

            <a
                href="https://www.youtube.com/channel/UCzoanldTA0NjXd6qAszEr7Q"
                target="_blank"
                style="text-decoration: none"
            >
                <q-btn color="black" icon="fab fa-youtube" flat round />
            </a>

            <a
                href="https://vm.tiktok.com/ZMLTT86tp/"
                target="_blank"
                style="text-decoration: none"
            >
                <q-btn color="black" icon="fab fa-tiktok" flat round />
            </a>
        </div>
        <!-- /IG -->

        <!-- HOW TO BUY BTN -->
        <div class="row q-px-md q-mb-lg">
            <q-btn-toggle
                v-model="isInUsd"
                toggle-color="black"
                unelevated
                color="white"
                text-color="black"
                push
                class="poppins-bold"
                size="sm"
                :options="[
                    {label: 'USD', value: true},
                    {label: 'EUR', value: false},
                ]"
            />

            <q-space />
            <q-btn
                label="Como comprar FIFA COINS"
                no-caps
                push
                color="black"
                class="poppins-bold"
                size="sm"
                @click="videoGuideDialog = true"
            />
        </div>
        <!-- /HOW TO BUY BTN -->

        <!-- CATEGORY FILTER SELECT -->
        <div class="q-px-md q-mb-md">
            <q-select
                label="Filtrar por categoria"
                color="black"
                filled
                emit-value
                bg-color="white"
                map-options
                :options="
                    [{label: 'VER TODO', value: ''}].concat(
                        returnCategoriesOptions
                    )
                "
                v-model="selectedCategoryFilter"
            />
        </div>
        <!-- /CATEGORY FILTER SELECT -->

        <!-- SUB CATEGORY FILTER SELECT -->
        <div class="q-px-md">
            <q-select
                label="Filtrar por sub-categoria"
                bg-color="white"
                color="black"
                filled
                emit-value
                map-options
                :options="
                    [{label: 'VER TODO', value: ''}].concat(
                        returnSubCategoriesOptions
                    )
                "
                :disable="!selectedCategoryFilter"
                v-model="selectedSubCategoryFilter"
            />
        </div>
        <!-- /SUB CATEGORY FILTER SELECT -->

        <!-- MENU -->
        <div class="q-pa-md">
            <div
                v-for="(item, i) in filterMenuByCategoryAndSubCategory"
                :key="i"
            >
                <q-card class="q-mb-lg">
                    <q-card-section class="q-pa-none">
                        <img :src="item.img" width="100%" loading="lazy" />
                    </q-card-section>
                    <q-card-section>
                        <div class="text-h6 text-bold">
                            {{ item.name }}
                        </div>
                        <div class="text-body2 text-grey text-bold q-mb-sm">
                            {{ item.description }}
                        </div>
                        <div class="text-h6 poppins-bold" v-if="item.price">
                            {{ isInUsd ? '$' : '€' }}
                            {{ item.price.toFixed(2) }}
                        </div>
                        <!-- returnLowestOptionPrice -->
                        <div class="text-h6 poppins-bold" v-else>
                            Desde {{ isInUsd ? '$' : '€' }}
                            {{ returnLowestOptionPrice(item.options) }}
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
                class="bg-black text-white"
            >
                <q-card-section class="row items-center no-wrap">
                    <div>
                        <div class="text-h6 poppins-bold">
                            <span class="text-subtitle2 poppins-bold"
                                >Sub Total:</span
                            >
                            {{ isInUsd ? '$' : '€' }}
                            {{ total.toFixed(2) }}
                        </div>
                    </div>

                    <q-space />

                    <q-btn
                        flat
                        icon="shopping_cart"
                        label="Ver carrito"
                        @click="openCartDialog()"
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
            <q-card class="text-white">
                <div class="mda-cart-bg">
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
                            :key="i"
                        >
                            <div class="col-2">
                                <q-btn
                                    icon="close"
                                    round
                                    color="red-7"
                                    flat
                                    @click="removeFromCart(i)"
                                />
                            </div>
                            <div class="col-10">
                                <div
                                    class="text-subtitle2 poppins-bold q-ml-sm"
                                >
                                    ({{ item.amount }}) - {{ item.name }}
                                    <span v-if="item.selectedOption"
                                        >- {{ item.selectedOption }}</span
                                    >
                                </div>
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
                            v-model="fullName"
                            color="yellow-9"
                            data-hj-allow
                        />
                        <div class="text-caption poppins-bold q-mb-xs">
                            Correo electronico: *
                        </div>
                        <q-input
                            label="correo@electronico.com"
                            filled
                            dark
                            class="q-mb-lg"
                            v-model="email"
                            color="yellow-9"
                            type="email"
                            data-hj-allow
                        />
                        <div class="text-caption poppins-bold q-mb-xs">
                            Número de contacto: *
                        </div>
                        <q-input
                            filled
                            dark
                            class="q-mb-lg"
                            v-model="contactNo"
                            color="yellow-9"
                            data-hj-allow
                        />
                        <template v-if="containsFifaCoinsInCart">
                            <div class="text-caption poppins-bold q-mb-xs">
                                Plataforma: *
                            </div>
                            <q-select
                                label="Selecciona plataforma"
                                v-model="selectedPlatform"
                                :options="['PlayStation', 'Xbox', 'PC']"
                                dark
                                filled
                                class="q-mb-lg"
                                color="yellow-9"
                                data-hj-allow
                            />
                            <div class="text-caption poppins-bold q-mb-xs">
                                Cantidad de monedas disponibles en tu club: *
                            </div>
                            <q-input
                                filled
                                dark
                                class="q-mb-lg"
                                color="yellow-9"
                                data-hj-allow
                                label="Ingresa la cantidad de monedas actuales en tu club"
                                type="number"
                                v-model.number="currentPointsAmount"
                            />
                            <div class="text-caption poppins-bold q-mb-xs">
                                Código de descuento:
                            </div>
                            <q-input
                                filled
                                dark
                                class="q-mb-lg"
                                color="yellow-9"
                                data-hj-allow
                                label="Ingresa tu código de descuento"
                                v-model="discountInput"
                            />
                        </template>
                        <div class="text-caption poppins-bold q-mb-xs">
                            Entrega: *
                        </div>
                        <q-btn-toggle
                            v-model="selectedPickupMethod"
                            spread
                            all-caps
                            class="poppins-bold full-width q-mb-lg"
                            toggle-color="yellow-9"
                            color="white"
                            text-color="black"
                            :options="pickupMethods"
                        />
                        <div
                            class="row"
                            v-if="this.selectedPickupMethod == 'Delivery'"
                        >
                            <div
                                class="
                                    text-subtitle2
                                    poppins-bold
                                    q-mb-sm
                                    full-width
                                "
                            >
                                Ubicacion de entrega: *
                            </div>
                        </div>
                        <GoogleMaps
                            class="q-mb-md"
                            v-if="
                                Object.keys(center).length > 0 &&
                                    this.selectedPickupMethod == 'Delivery'
                            "
                            @markerPosition="setMarkerPosition"
                            @newMarkerPosition="setNewMarkerPosition"
                            :editable="true"
                            :markers="markers"
                            :mapCenter="center"
                        ></GoogleMaps>
                        <div
                            class="row q-mb-md"
                            v-if="selectedPickupMethod == 'Delivery'"
                        >
                            <div class="text-subtitle2 poppins-bold q-mb-sm">
                                Dirección de entrega (completa): *
                            </div>
                            <q-input
                                v-model="address"
                                filled
                                dark
                                type="textarea"
                                class="full-width poppins-regular"
                                placeholder="Barriada, No. Calle, No. Casa"
                                color="yellow-9"
                                rows="4"
                                data-hj-allow
                            />
                        </div>
                        <div class="text-caption poppins-bold q-mb-xs">
                            Metodo de pago: *
                        </div>
                        <q-btn-toggle
                            v-model="selectedPaymentMethod"
                            spread
                            toggle-color="yellow-9"
                            color="white"
                            no-caps
                            text-color="black"
                            :options="paymentMethods"
                        >
                            <template v-slot:yappy>
                                <img
                                    src="https://i.ibb.co/37Yxdm1/yappy.png"
                                    style="width: 100%"
                                />
                            </template>

                            <template v-slot:nequi>
                                <img
                                    src="https://i.ibb.co/93rBRWP/nequi.png"
                                    style="width: 100%"
                                />
                            </template>

                            <template v-slot:paypal>
                                <img
                                    src="https://i.ibb.co/Q69pnnJ/paypal.png"
                                    style="width: 100%"
                                />
                            </template>
                            <template v-slot:cash>
                                <q-icon name="payments" size="1.5em" />
                                <div
                                    class="text-caption text-bold"
                                    style="font-size: 10px"
                                >
                                    Efectivo
                                </div>
                            </template>
                            <template v-slot:ach>
                                <q-icon name="currency_exchange" size="1.5em" />
                                <div
                                    class="text-caption text-bold"
                                    style="font-size: 10px"
                                >
                                    ACH
                                </div>
                            </template>
                            <template v-slot:zelle>
                                <img
                                    src="https://i.ibb.co/6Pctf67/zelle.png"
                                    style="width: 100%"
                                />
                            </template>
                            <template v-slot:visa>
                                <img
                                    src="https://i.ibb.co/KjnsnYr/visa.jpg"
                                    style="width: 100%"
                                />
                            </template>
                            <template v-slot:mastercard>
                                <img
                                    src="https://i.ibb.co/Y8cZhWj/mastercard.jpg"
                                    style="width: 100%"
                                />
                            </template>
                            <!-- <template v-slot:binance>
                                <img
                                    src="https://i.ibb.co/Q62jH31/binance.png"
                                    style="width: 100%;"
                                />
                            </template>
                            <template v-slot:zinly>
                                <img
                                    src="https://i.ibb.co/ykRpM3H/zinly.png"
                                    style="width: 100%;"
                                />
                            </template> -->
                        </q-btn-toggle>
                        <!-- <q-btn-toggle
                        v-model="selectedPaymentMethod"
                        spread
                        all-caps
                        class="poppins-bold full-width"
                        toggle-color="yellow-9"
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
                            class="text-subtitle2 q-mb-sm"
                            v-if="selectedPaymentMethod == 'Yappy'"
                        >
                            Envía tu pago por Yappy al número<br />
                            <span class="text-h6 poppins-bold"
                                >6204-6903
                                <q-btn
                                    icon="content_copy"
                                    class="q-ml-sm"
                                    round
                                    flat
                                    dense
                                    size="sm"
                                    color="yellow-9"
                                    @click="copyToClipboard('62046903')"
                            /></span>
                        </div>
                        <div
                            class="text-subtitle2 q-mb-md"
                            v-if="selectedPaymentMethod == 'Yappy'"
                        >
                            Búscanos en el directorio como<br />
                            <span class="text-h6 poppins-bold"
                                >@mdaesportsleague
                                <q-btn
                                    icon="content_copy"
                                    class="q-ml-sm"
                                    round
                                    flat
                                    dense
                                    size="sm"
                                    color="yellow-9"
                                    @click="copyToClipboard('mdaesportsleague')"
                            /></span>
                        </div>
                        <div
                            class="text-subtitle2 q-mb-md"
                            v-if="selectedPaymentMethod == 'Zinly'"
                        >
                            <span class="text-h6 poppins-bold"
                                >mikeadd29@gmail.com
                                <q-btn
                                    icon="content_copy"
                                    class="q-ml-sm"
                                    round
                                    flat
                                    dense
                                    size="sm"
                                    color="yellow-9"
                                    @click="
                                        copyToClipboard('mikeadd29@gmail.com')
                                    "
                            /></span>
                        </div>
                        <div
                            class="text-subtitle2 q-mb-md"
                            v-if="selectedPaymentMethod == 'Nequi'"
                        >
                            Envía tu pago por Nequi al número<br />
                            <span class="text-h6 poppins-bold"
                                >6204-6903
                                <q-btn
                                    icon="content_copy"
                                    class="q-ml-sm"
                                    round
                                    flat
                                    dense
                                    size="sm"
                                    color="yellow-9"
                                    @click="copyToClipboard('62046903')"
                            /></span>
                        </div>
                        <div
                            class="row justify-center"
                            v-if="
                                selectedPaymentMethod == 'Yappy' ||
                                    selectedPaymentMethod == 'Nequi' ||
                                    selectedPaymentMethod == 'Zinly'
                            "
                        >
                            <q-btn
                                label="Ver QR"
                                rounded
                                color="yellow-9"
                                unelevated
                                no-caps
                                class="poppins-bold"
                                icon="qr_code"
                                @click="qrDialog = true"
                            />
                        </div>
                        <div
                            class="text-subtitle2"
                            v-if="selectedPaymentMethod == 'ACH'"
                        >
                            Envia tu pago por ACH a la cuenta<br />
                            <span class="text-h6 poppins-bold"
                                >0449991860790
                                <q-btn
                                    icon="content_copy"
                                    class="q-ml-sm"
                                    round
                                    flat
                                    dense
                                    size="sm"
                                    color="yellow-9"
                                    @click="
                                        copyToClipboard('0449991860790')
                                    "/></span
                            ><br />
                            Banco General | Cuenta de ahorros | Michael Davis
                        </div>
                        <div
                            class="text-subtitle2"
                            v-if="selectedPaymentMethod == 'Paypal'"
                        >
                            Envía tu pago por Paypal<br />
                            <span class="text-h6 poppins-bold"
                                >mikeadd29@gmail.com
                                <q-btn
                                    icon="content_copy"
                                    class="q-ml-sm"
                                    round
                                    flat
                                    dense
                                    size="sm"
                                    color="yellow-9"
                                    @click="
                                        copyToClipboard('mikeadd29@gmail.com')
                                    "/></span
                            ><br />
                            <span class="text-h6 poppins-bold"
                                >www.paypal.me/mdavisd29
                                <q-btn
                                    icon="content_copy"
                                    class="q-ml-sm"
                                    round
                                    flat
                                    dense
                                    size="sm"
                                    color="yellow-9"
                                    @click="
                                        copyToClipboard(
                                            'https://www.paypal.me/mdavisd29'
                                        )
                                    "/></span
                            ><br />
                            Paypal | Michael Davis
                        </div>
                        <div
                            class="text-subtitle2"
                            v-if="selectedPaymentMethod == 'Zelle'"
                        >
                            Envía tu pago por Zelle<br />
                            <span class="text-h6 poppins-bold"
                                >mikeadd29@gmail.com
                                <q-btn
                                    icon="content_copy"
                                    class="q-ml-sm"
                                    round
                                    flat
                                    dense
                                    size="sm"
                                    color="yellow-9"
                                    @click="
                                        copyToClipboard('mikeadd29@gmail.com')
                                    "
                            /></span>
                        </div>
                        <div
                            class="text-subtitle2"
                            v-if="selectedPaymentMethod == 'Binance'"
                        >
                            Envía tu pago por Binance<br />
                            <span class="text-h6 poppins-bold"
                                >mikeadd29@gmail.com
                                <q-btn
                                    icon="content_copy"
                                    class="q-ml-sm"
                                    round
                                    flat
                                    dense
                                    size="sm"
                                    color="yellow-9"
                                    @click="
                                        copyToClipboard('mikeadd29@gmail.com')
                                    "
                            /></span>
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <div class="text-subtitl2 poppins-bold text-center">
                            Sub Total: {{ isInUsd ? '$' : '€' }}
                            {{ total.toFixed(2) }}
                        </div>
                        <div
                            class="
                                text-subtitl2
                                poppins-bold
                                text-center
                                q-mb-md
                            "
                        >
                            ITBMS: {{ isInUsd ? '$' : '€' }}
                            {{ calculateTax(total).toFixed(2) }}
                        </div>
                        <div
                            class="
                                text-subtitl2
                                poppins-bold
                                text-center
                                q-mb-md
                            "
                            v-if="selectedPickupMethod == 'Delivery'"
                        >
                            Delivery: {{ isInUsd ? '$' : '€' }}
                            {{ deliveryAmount.toFixed(2) }}
                        </div>
                        <!-- <div
                            class="
                                text-subtitl2
                                poppins-bold
                                text-center
                                q-mb-md
                            "
                            v-if="selectedPaymentMethod == 'Paypal'"
                        >
                            ITBMS (Impuesto): {{ isInUsd ? '$' : '€' }}
                            {{ calculatePaypalFee(total).toFixed(2) }}
                        </div> -->
                        <div
                            class="text-h5 poppins-bold text-center"
                            v-if="selectedPickupMethod != 'Delivery'"
                        >
                            Total: {{ isInUsd ? '$' : '€' }}
                            {{
                                this.selectedPaymentMethod == 'Paypal'
                                    ? (total + calculateTax(total)).toFixed(2)
                                    : (total + calculateTax(total)).toFixed(2)
                            }}
                        </div>
                        <div class="text-h5 poppins-bold text-center" v-else>
                            Total: {{ isInUsd ? '$' : '€' }}
                            {{
                                this.selectedPaymentMethod == 'Paypal'
                                    ? (
                                          total +
                                          this.deliveryAmount +
                                          calculateTax(total)
                                      ).toFixed(2)
                                    : (
                                          total +
                                          deliveryAmount +
                                          calculateTax(total)
                                      ).toFixed(2)
                            }}
                        </div>
                    </q-card-section>
                    <q-card-actions align="center">
                        <q-checkbox
                            v-model="acceptTerms"
                            dark
                            color="yellow-9"
                            label="Acepto los términos y condiciones"
                        />
                    </q-card-actions>
                    <q-card-actions>
                        <q-btn
                            label="Enviar"
                            color="green-7"
                            class="poppins-bold full-width q-mb-xl"
                            push
                            @click="sendOrder()"
                            :disable="!acceptTerms"
                        />
                    </q-card-actions>
                </div>
            </q-card>
        </q-dialog>
        <!-- /CART DIALOG -->

        <!-- QR DIALOG -->
        <q-dialog v-model="qrDialog">
            <q-card flat>
                <q-card-section class="q-pb-none">
                    <img
                        :src="require('@/assets/wp/mdaesports/qr-yappy.png')"
                        width="100%"
                        v-if="selectedPaymentMethod == 'Yappy'"
                    />
                    <img
                        :src="require('@/assets/wp/mdaesports/qr-nequi.png')"
                        width="100%"
                        v-if="selectedPaymentMethod == 'Nequi'"
                    />
                    <img
                        :src="require('@/assets/wp/mdaesports/zinly.jpg')"
                        width="100%"
                        v-if="selectedPaymentMethod == 'Zinly'"
                    />
                </q-card-section>
                <q-card-actions align="center" class="q-pt-none">
                    <q-btn
                        label="Cerrar"
                        flat
                        rounded
                        color="red-7"
                        no-caps
                        class="poppins-bold full-width"
                        @click="qrDialog = false"
                    />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <!-- /QR DIALOG -->

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

        <!-- OPTIONS DIALOG -->
        <q-dialog v-model="optionsDialog">
            <q-card
                v-if="selectedItem"
                flat
                style="width: 700px; max-width: 80vw"
            >
                <q-card-section class="q-pb-none">
                    <div class="text-h6 poppins-bold text-center">
                        {{ selectedItem.name }}
                    </div>
                </q-card-section>
                <q-card-section>
                    <q-btn
                        :label="
                            `${option.label} -  ${
                                isInUsd
                                    ? '$' + option.price.toFixed(2)
                                    : '€' + option.euroPrice.toFixed(2)
                            }`
                        "
                        unelevated
                        color="black"
                        class="full-width poppins-bold q-mb-sm"
                        v-for="option in selectedItem.options"
                        :key="option.label"
                        @click="addItemWithOptionsToCart(option)"
                    />
                    <q-btn
                        label="Cancelar"
                        unelevated
                        color="red-7"
                        class="full-width poppins-bold q-mb-sm"
                        flat
                        @click="
                            optionsDialog = false
                            selectedItem = null
                        "
                    />
                </q-card-section>
            </q-card>
        </q-dialog>
        <!-- /OPTIONS DIALOG -->

        <!-- VIDEO GUIDE DIALOG -->
        <q-dialog v-model="videoGuideDialog">
            <q-card class="q-ma-none">
                <q-card-section>
                    <video width="100%" controls>
                        <source
                            src="@/assets/wp/mdaesports/how_to_buy.mp4"
                            type="video/mp4"
                        />
                        Your browser does not support HTML video.
                    </video>
                </q-card-section>
            </q-card>
        </q-dialog>
        <!-- /VIDEO GUIDE DIALOG -->

        <!-- CURRENCY SELECT DIALOG -->
        <q-dialog v-model="currencySelectDialog" persistent>
            <q-card flat>
                <q-card-section class="q-pb-none">
                    <div class="text-h6 poppins-bold text-center text-black">
                        Selecciona tu moneda
                    </div>
                </q-card-section>
                <q-card-section>
                    <q-btn
                        label="$ - Dólares Americanos (USD)"
                        color="black"
                        class="full-width poppins-bold q-mb-md"
                        v-close-popup
                        @click="isInUsd = true"
                    />
                    <q-btn
                        label="€ - Euros (EUR)"
                        color="black"
                        class="full-width poppins-bold"
                        v-close-popup
                        @click="isInUsd = false"
                    />
                </q-card-section>
            </q-card>
        </q-dialog>
        <!-- /CURRENCY SELECT DIALOG -->

        <!-- Whatsapp FAB -->
        <q-page-sticky
            position="bottom-left"
            :offset="[18, cart.length > 0 ? 150 : 85]"
        >
            <a
                :href="`https://wa.me/507${whatsappNo}`"
                style="text-decoration: none"
                target="_blank"
            >
                <q-btn fab icon="fab fa-whatsapp" color="black" />
            </a>
        </q-page-sticky>
        <!-- /Whatsapp FAB -->

        <!-- SOCIAL FAB -->
        <q-page-sticky
            position="bottom-left"
            :offset="[18, cart.length > 0 ? 80 : 18]"
        >
            <q-fab
                v-model="socialFab"
                vertical-actions-align="left"
                color="black"
                icon="share"
                direction="right"
            >
                <a
                    href="https://www.instagram.com/mdaesportsleague/"
                    style="text-decoration: none"
                    target="_blank"
                >
                    <q-fab-action color="black" icon="fab fa-instagram" />
                </a>
                <a
                    href="https://vm.tiktok.com/ZMLTT86tp/"
                    style="text-decoration: none"
                    target="_blank"
                >
                    <q-fab-action color="black" icon="fab fa-tiktok" />
                </a>
            </q-fab>
        </q-page-sticky>
        <!-- /SOCIAL FAB -->

        <!-- FOOTER -->
        <div
            class="text-center bg-white q-py-md shadow-5 text-bold"
            style="text-decoration: underline"
        >
            <div class="cursor-pointer" @click="showTermsDialog('terms')">
                Términos y condiciones
            </div>
            <div class="cursor-pointer" @click="showTermsDialog('privacy')">
                Políticas de privacidad
            </div>
            <div class="cursor-pointer" @click="showTermsDialog('returns')">
                Políticas de devolución
            </div>
            <div>
                <a class="text-black" href="mailto:mdaesportsleague@gmail.com"
                    >mdaesportsleague@gmail.com</a
                >
            </div>
            <div>
                <a class="text-black" href="tel:507-6675-2446"
                    >(507) 6675-2446</a
                >
            </div>
            <div class="q-mt-sm">
                <div class="row items-center justify-center">
                    <img
                        src="https://i.ibb.co/KjnsnYr/visa.jpg"
                        style="width: 30px;"
                        class="q-pr-xs"
                    />
                    <img
                        src="https://i.ibb.co/Y8cZhWj/mastercard.jpg"
                        style="width: 30px;"
                        class="q-pl-xs"
                    />
                </div>
            </div>
        </div>
        <!-- /FOOTER -->

        <!-- TERMS DIALOG -->
        <q-dialog
            v-model="termsDialog"
            maximized
            transition-show="slide-up"
            transition-hide="slide-down"
        >
            <q-card>
                <q-bar>
                    <q-space />
                    <q-btn dense flat icon="close" v-close-popup round>
                        <q-tooltip content-class="bg-white text-black"
                            >Cerrar</q-tooltip
                        >
                    </q-btn>
                </q-bar>
                <q-card-section>
                    <TermsAndConditions v-if="termsType == 'terms'" />
                    <PrivacyPolicy v-if="termsType == 'privacy'" />
                    <ReturnsPolicy v-if="termsType == 'returns'" />
                </q-card-section>
            </q-card>
        </q-dialog>
        <!-- /TERMS DIALOG -->

        <!-- KNOW HOW TO BUY DIALOG -->
        <q-dialog v-model="knowHowToBuyDialog">
            <q-card>
                <q-card-section>
                    <q-img src="https://i.ibb.co/6tFVzxw/fifa-coins.jpg" />
                </q-card-section>
                <q-card-section>
                    <div class="text-h6 text-center text-bold">
                        ¿Conoces el proceso del traspaso de las monedas?
                    </div>
                </q-card-section>
                <q-card-actions align="around">
                    <q-btn
                        label="Si, ya lo conozco"
                        @click="cartDialog = true"
                        v-close-popup
                        unelevated
                        color="green-7"
                        outline
                        no-caps
                        class="full-width q-mb-sm text-bold"
                    />
                    <q-btn
                        label="Quiero saber mas"
                        @click="videoConfirmDialog = true"
                        v-close-popup
                        unelevated
                        color="green-7"
                        no-caps
                        class="full-width text-bold"
                    />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <!-- /KNOW HOW TO BUY DIALOG -->

        <!-- VIDEO CONFIRM DIALOG -->
        <q-dialog v-model="videoConfirmDialog">
            <q-card class="q-ma-none">
                <q-card-section>
                    <video width="100%" controls>
                        <source
                            src="@/assets/wp/mdaesports/how_to_buy.mp4"
                            type="video/mp4"
                        />
                        Your browser does not support HTML video.
                    </video>
                </q-card-section>
                <q-card-actions>
                    <q-btn
                        label="Continuar al carrito"
                        class="full-width text-bold"
                        unelevated
                        color="green-7"
                        icon="shopping_cart"
                        @click="cartDialog = true"
                        v-close-popup
                    />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <!-- /VIDEO CONFIRM DIALOG -->
    </q-page>
</template>

<script>
import GoogleMaps from '../../components/general/GoogleMaps'
import {copyToClipboard} from 'quasar'
import InventoryHandler from '@/mixins/InventoryHandler.js'

import TermsAndConditions from '@/components/mdaesports/TermsAndConditions'
import PrivacyPolicy from '@/components/mdaesports/PrivacyPolicy'
import ReturnsPolicy from '@/components/mdaesports/ReturnsPolicy'

export default {
    components: {
        GoogleMaps,
        TermsAndConditions,
        PrivacyPolicy,
        ReturnsPolicy,
    },
    data() {
        return {
            knowHowToBuyDialog: false,
            videoConfirmDialog: false,
            acceptTerms: false,
            termsType: '',
            termsDialog: false,
            isLoading: true,
            qrDialog: false,
            whatsappNo: '66752446',
            cart: [],
            total: 0,
            seamless: true,
            cartDialog: false,
            fullName: '',
            email: '',
            contactNo: '',
            comments: '',
            selectedPickupMethod: '',
            selectedPaymentMethod: '',
            currentPointsAmount: '',
            selectedPlatform: '',
            pickupMethods: [
                {label: 'Producto digital', value: 'Producto digital'},
                {label: 'Recoger en local', value: 'Recoger en local'},
                {label: 'Entrega domicilio', value: 'Delivery'},
            ],
            paymentMethods: [
                {value: 'Yappy', slot: 'yappy'},
                {value: 'Nequi', slot: 'nequi'},
                {value: 'Paypal', slot: 'paypal'},
                {value: 'Zelle', slot: 'zelle'},
                {value: 'Visa', slot: 'visa'},
                {value: 'Mastercard', slot: 'mastercard'},
                // {value: 'Binance', slot: 'binance'},
                // {value: 'Zinly', slot: 'zinly'},
                // {value: 'ACH', slot: 'ach'},
                // {value: 'Efectivo', slot: 'cash'},
            ],
            menu: [],
            location: [],
            markers: [],
            center: {},
            address: '',
            selectedCategoryFilter: '',
            selectedSubCategoryFilter: '',
            deliveryAmount: 5,
            optionsDialog: false,
            selectedItem: null,
            videoGuideDialog: false,
            isInUsd: true,
            currencySelectDialog: true,
            discountCodes: ['kemstarmda', 'jcmda'],
            discountInput: '',
            socialFab: false,
        }
    },
    methods: {
        openCartDialog() {
            let contains = false
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i].name.includes('FIFA FUT COINS')) {
                    contains = true
                    break
                }
            }
            if (contains) this.knowHowToBuyDialog = true
            else this.cartDialog = true
        },
        showTermsDialog(type) {
            this.termsDialog = true
            this.termsType = type
        },
        addToCart(item) {
            if (!item.options) {
                if (this.cart.find(el => el.id == item.id)) {
                    this.cart.find(el => {
                        if (el.id == item.id) item.amount++
                    })
                } else {
                    item.amount = 1
                    this.cart.push(item)
                }
            } else {
                this.selectedItem = item
                this.optionsDialog = true
            }
            this.calculateTotal()
        },
        addItemWithOptionsToCart(selectedOption) {
            let newItem = {
                name: `${this.selectedItem.name} - ${selectedOption.label} ${
                    this.selectedItem.name == 'FIFA FUT COINS 23'
                        ? this.addFifaCoinsPromo(selectedOption.label)
                        : ''
                }`,
                amount: 1,
                price: this.isInUsd
                    ? selectedOption.price
                    : selectedOption.euroPrice,
                skipTaxes: this.selectedItem.skipTaxes ? true : false,
            }
            this.cart.push(newItem)
            this.optionsDialog = false
            this.selectedItem = null
            this.calculateTotal()
        },
        addFifaCoinsPromo(label) {
            // if (label == '300,000') return '+ 100k gratis'
            // if (label == '400,000') return '+ 100k gratis'
            if (label == '500,000') return '+ 50k gratis'
            if (label == '600,000') return '+ 50k gratis'
            if (label == '700,000') return '+ 50k gratis'
            if (label == '800,000') return '+ 50k gratis'
            if (label == '900,000') return '+ 50k gratis'
            if (label == '1,000,000') return '+ 100k gratis'
            else return ''
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
            this.total = this.total - this.calculateDiscount()
        },
        calculateDiscount() {
            if (this.discountCodes.includes(this.discountInput.toLowerCase()))
                return this.total * 0.1
            else return 0
        },
        calculateTax() {
            let chargeTax = ['Paypal', 'Visa', 'Mastercard']
            if (!chargeTax.includes(this.selectedPaymentMethod)) return 0
            let total = 0
            this.cart.forEach(item => {
                if (!item.skipTaxes) total += item.amount * item.price
            })
            return Math.round(total * 0.07 * 100) / 100
        },
        calculatePaypalFee(total) {
            return Math.round(total * 0.054 * 100) / 100 + 0.3
        },
        getLocationForMessage() {
            if (this.location.length === 0) {
                if (
                    parseFloat(this.center.lat) === parseFloat(9.068463) &&
                    parseFloat(this.center.lng) === parseFloat(-79.452694)
                ) {
                    return `>> Pedir Ubicacion !!`
                } else {
                    return `https://waze.com/ul?ll=${this.center.lat},${this.center.lng}&z=10`
                }
                // let lat = parseFloat(this.center.lat)
                // let lng = parseFloat(this.center.lng)
                // if (lat < 0) lat = `+${lat}`
                // if (lng < 0) lng = `+${lng}`
            } else {
                let lat = parseFloat(this.location.lat)
                let lng = parseFloat(this.location.lng)
                if (lat === NaN || lng === NaN) return `>> Pedir Ubicacion !!`
                // if (lat < 0) lat = `+${lat}`
                // if (lng < 0) lng = `+${lng}`
                return `https://waze.com/ul?ll=${lat},${lng}&z=10`
            }
        },
        generateWhatsappMessage() {
            let message =
                'Buenas, me gustaría realizar un pedido de:%0D%0A%0D%0A'
            this.cart.forEach(item => {
                message += `(${item.amount}) - ${item.name}%0D%0A`
            })
            message += `%0D%0ANombre: ${this.fullName}`
            message += `%0D%0AEntrega: ${this.selectedPickupMethod}`
            if (this.selectedPickupMethod == 'Delivery') {
                message += `%0D%0ADirección: ${this.address}`
                message += `%0D%0AUbicación: ${this.getLocationForMessage()}`
            }
            message += `%0D%0AMetodo de pago: ${this.selectedPaymentMethod}`
            if (this.containsFifaCoinsInCart) {
                message += `%0D%0ACantidad de monedas disponibles: ${this.currentPointsAmount}`
                message += `%0D%0APlataforma: ${this.selectedPlatform}`
                message += `%0D%0ACódigo descuento: ${this.discountInput}`
            }
            message += `%0D%0ASub Total: ${
                this.isInUsd ? '$' : '€'
            }${this.total.toFixed(2)}`
            message += `%0D%0AITBMS: ${
                this.isInUsd ? '$' : '€'
            }${this.calculateTax(this.total).toFixed(2)}`
            if (this.selectedPickupMethod == 'Delivery')
                message += `%0D%0ADelivery: ${
                    this.isInUsd ? '$' : '€'
                }${this.deliveryAmount.toFixed(2)}`
            // if (this.selectedPaymentMethod == 'Paypal')
            //     message += `%0D%0AITBMS (Impuesto): ${
            //         this.isInUsd ? '$' : '€'
            //     }${this.calculatePaypalFee(this.total).toFixed(2)}`
            if (this.selectedPickupMethod != 'Delivery') {
                message += `%0D%0ATotal: ${this.isInUsd ? '$' : '€'}${
                    this.selectedPaymentMethod == 'Paypal'
                        ? (this.total + this.calculateTax(this.total)).toFixed(
                              2
                          )
                        : (this.total + this.calculateTax(this.total)).toFixed(
                              2
                          )
                }`
            } else {
                message += `%0D%0ATotal: ${this.isInUsd ? '$' : '€'}${
                    this.selectedPaymentMethod == 'Paypal'
                        ? (
                              this.total +
                              this.deliveryAmount +
                              this.calculateTax(this.total)
                          ).toFixed(2)
                        : (
                              this.total +
                              this.deliveryAmount +
                              this.calculateTax(this.total)
                          ).toFixed(2)
                }`
            }
            message = message.replace(/\+/g, '%2B')
            message = message.replace(/&/g, '%26')
            message = message.replace(/#/g, '%23')
            return message
        },
        sendOrder() {
            if (
                !this.fullName ||
                !this.selectedPickupMethod ||
                !this.selectedPaymentMethod ||
                !this.email ||
                !this.contactNo ||
                (this.selectedPickupMethod == 'Delivery' && !this.address) ||
                (this.containsFifaCoinsInCart && !this.selectedPlatform) ||
                (this.containsFifaCoinsInCart && !this.currentPointsAmount)
            ) {
                let errors = []
                let errMsg = 'Debes llenar los siguientes campos: '
                if (!this.fullName) errors.push('Nombre')
                if (!this.selectedPickupMethod) errors.push('Entrega')
                if (!this.selectedPaymentMethod) errors.push('Metodo de pago')
                if (!this.email) errors.push('Correo electrónico')
                if (!this.contactNo) errors.push('Número de contacto')
                if (this.selectedPickupMethod == 'Delivery' && !this.address)
                    errors.push('Dirección de entrega')
                if (this.containsFifaCoinsInCart && !this.selectedPlatform)
                    errors.push('Plataforma')
                if (this.containsFifaCoinsInCart && !this.currentPointsAmount)
                    errors.push('Cantidad actual de puntos')
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
                        color: 'yellow-9',
                        icon: 'check',
                        badgeColor: 'blue-7',
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
        setMarkerPosition(event) {
            this.location = event
        },
        setNewMarkerPosition(event) {
            this.markers = [{position: event}]
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
        returnLowestOptionPrice(options) {
            if (this.isInUsd) {
                let lowest = options[0].price
                options.forEach(option => {
                    if (option.price < lowest) lowest = option.price
                })
                return lowest.toFixed(2)
            } else {
                let lowest = options[0].euroPrice
                options.forEach(option => {
                    if (option.euroPrice < lowest) lowest = option.euroPrice
                })
                return lowest.toFixed(2)
            }
        },
    },
    computed: {
        showSeamless() {
            if (this.cart.length) return true
        },
        returnCategoriesOptions() {
            let categories = []
            let formattedCategories = []
            this.menu.forEach(item => {
                if (!categories.includes(item.category))
                    categories.push(item.category)
            })
            categories.forEach(cat => {
                formattedCategories.push({
                    value: cat,
                    label: cat.replace(/_/g, ' ').toUpperCase(),
                })
            })
            return formattedCategories
        },
        returnSubCategoriesOptions() {
            let subcategories = []
            let formattedSubCategories = []
            this.filterByCategory.forEach(item => {
                if (!subcategories.includes(item.subCategory))
                    subcategories.push(item.subCategory)
            })
            subcategories.forEach(subcat => {
                formattedSubCategories.push({
                    label: subcat.replace(/_/g, ' ').toUpperCase(),
                    value: subcat,
                })
            })
            return formattedSubCategories
        },
        filterByCategory() {
            let filteredProducts = []
            this.menu.forEach(product => {
                if (
                    product.category == this.selectedCategoryFilter ||
                    this.selectedCategoryFilter == ''
                )
                    filteredProducts.push(product)
            })
            return filteredProducts
        },
        filterMenuByCategoryAndSubCategory() {
            let filteredProducts = []
            if (!this.selectedCategoryFilter && !this.selectedSubCategoryFilter)
                return this.menu
            else {
                this.menu.forEach(item => {
                    if (
                        item.category.includes(this.selectedCategoryFilter) &&
                        item.subCategory.includes(
                            this.selectedSubCategoryFilter
                        )
                    )
                        filteredProducts.push(item)
                })
                return filteredProducts
            }
        },
        containsFifaCoinsInCart() {
            let contains = false
            this.cart.forEach(item => {
                if (item.name.includes('FIFA FUT COINS 23')) contains = true
            })
            return contains
        },
    },
    mixins: [InventoryHandler],
    watch: {
        selectedCategoryFilter: function() {
            this.selectedSubCategoryFilter = ''
        },
        discountInput: function() {
            this.calculateTotal()
        },
    },
    async mounted() {
        // this.menu = await this.getInventoryItems()
        this.geolocate()
        let m = [
            {
                name: 'FIFA FUT COINS 23',
                img: 'https://i.ibb.co/6tFVzxw/fifa-coins.jpg',
                description:
                    'Adquiere monedas para crear el equipo de tus sueños de FIFA 22 ULTIMATE TEAM sin ningún tipo de riesgo de baneo, para cualquier plataforma (XBOX, PLAYSTATION y PC)',
                category: 'recargas',
                subCategory: 'fifa',
                options: [
                    {label: '100,000', price: 14.99, euroPrice: 14.99},
                    {label: '200,000', price: 28.99, euroPrice: 28.99},
                    {label: '300,000', price: 42.99, euroPrice: 42.99},
                    {label: '400,000', price: 56.99, euroPrice: 56.99},
                    {label: '500,000', price: 70.99, euroPrice: 70.99},
                    {label: '600,000', price: 84.99, euroPrice: 84.99},
                    {label: '700,000', price: 98.99, euroPrice: 98.99},
                    {label: '800,000', price: 112.99, euroPrice: 112.99},
                    {label: '900,000', price: 126.99, euroPrice: 126.99},
                    {label: '1,000,000', price: 140.99, euroPrice: 140.99},
                ],
            },
            {
                name: 'PASS ROYALE',
                price: 6.99,
                img: 'https://i.ibb.co/GxtKfwx/pass-royale.jpg',
                description:
                    'Clash Royale Pass Royale es un paquete de contenido desbloqueable in-game por temporada, incluye ítems cosméticos y de progreso para el juego. Disponible para Android & IOS',
                category: 'recargas',
                subCategory: 'clash_royale',
            },
            {
                name: 'Clash Royale 80 Gemas',
                price: 2,
                img: 'https://i.ibb.co/y6wgrFk/80-gems.jpg',
                description:
                    'Clash Royale Gemas es un paquete de monedas in-game el cual puedes utilizar para comprar contenido exclusivo del juego CLASH ROYALE, la recarga de la misma se hace de manera directa a su cuenta de SUPER CELL en cuestiones de segundo. Disponible para Android & IOS',
                category: 'recargas',
                subCategory: 'clash_royale',
            },
            {
                name: 'Clash Royale 500 Gemas',
                price: 6,
                img: 'https://i.ibb.co/xMBzVW3/500-gems.jpg',
                description:
                    'Clash Royale Gemas es un paquete de monedas in-game el cual puedes utilizar para comprar contenido exclusivo del juego CLASH ROYALE, la recarga de la misma se hace de manera directa a su cuenta de SUPER CELL en cuestiones de segundo. Disponible para Android & IOS',
                category: 'recargas',
                subCategory: 'clash_royale',
            },
            {
                name: 'Clash Royale 1,200 Gemas',
                price: 12,
                img: 'https://i.ibb.co/6gZ5SdV/1200-gems.jpg',
                description:
                    'Clash Royale Gemas es un paquete de monedas in-game el cual puedes utilizar para comprar contenido exclusivo del juego CLASH ROYALE, la recarga de la misma se hace de manera directa a su cuenta de SUPER CELL en cuestiones de segundo. Disponible para Android & IOS',
                category: 'recargas',
                subCategory: 'clash_royale',
            },
            {
                name: 'Clash Royale 2,500 Gemas',
                price: 22,
                img: 'https://i.ibb.co/M5DSyXM/2500-gems.jpg',
                description:
                    'Clash Royale Gemas es un paquete de monedas in-game el cual puedes utilizar para comprar contenido exclusivo del juego CLASH ROYALE, la recarga de la misma se hace de manera directa a su cuenta de SUPER CELL en cuestiones de segundo. Disponible para Android & IOS',
                category: 'recargas',
                subCategory: 'clash_royale',
            },
            {
                name: 'Clash Royale 6,500 Gemas',
                price: 54,
                img: 'https://i.ibb.co/f1TX7yh/6500-gems.jpg',
                description:
                    'Clash Royale Gemas es un paquete de monedas in-game el cual puedes utilizar para comprar contenido exclusivo del juego CLASH ROYALE, la recarga de la misma se hace de manera directa a su cuenta de SUPER CELL en cuestiones de segundo. Disponible para Android & IOS',
                category: 'recargas',
                subCategory: 'clash_royale',
            },
            {
                name: 'Clash Royale 14,000 Gemas',
                price: 105,
                img: 'https://i.ibb.co/8bHczf3/14000-gems.jpg',
                description:
                    'Clash Royale Gemas es un paquete de monedas in-game el cual puedes utilizar para comprar contenido exclusivo del juego CLASH ROYALE, la recarga de la misma se hace de manera directa a su cuenta de SUPER CELL en cuestiones de segundo. Disponible para Android & IOS',
                category: 'recargas',
                subCategory: 'clash_royale',
            },
            {
                name: 'Fortnite 1000 V-Bucks',
                price: 10,
                img: 'https://i.ibb.co/CzJzSyk/1000-pavos.jpg',
                description:
                    'Fortnite V-Bucks es un paquete de monedas in-game el cual puedes utilizar para comprar diferentes artículos dentro del juego de FORNITE, la recarga de la misma se hace de manera directa a su cuenta de Epic Games en cuestiones de segundos disponible para cualquier plataforma (XBOX, PLAYSTATION, PC, NINTENDO, ANDROID & IOS)',
                category: 'recargas',
                subCategory: 'fortnite',
            },
            {
                name: 'Fortnite 2800 V-Bucks',
                price: 24,
                img: 'https://i.ibb.co/drkjrXs/2800-pavos.jpg',
                description:
                    'Fortnite V-Bucks es un paquete de monedas in-game el cual puedes utilizar para comprar diferentes artículos dentro del juego de FORNITE, la recarga de la misma se hace de manera directa a su cuenta de Epic Games en cuestiones de segundos disponible para cualquier plataforma (XBOX, PLAYSTATION, PC, NINTENDO, ANDROID & IOS)',
                category: 'recargas',
                subCategory: 'fortnite',
            },
            {
                name: 'Fortnite 5000 V-Bucks',
                price: 36,
                img: 'https://i.ibb.co/R4Q6gR0/5000-pavos.jpg',
                description:
                    'Fortnite V-Bucks es un paquete de monedas in-game el cual puedes utilizar para comprar diferentes artículos dentro del juego de FORNITE, la recarga de la misma se hace de manera directa a su cuenta de Epic Games en cuestiones de segundos disponible para cualquier plataforma (XBOX, PLAYSTATION, PC, NINTENDO, ANDROID & IOS)',
                category: 'recargas',
                subCategory: 'fortnite',
            },
            {
                name: 'Fortnite 13,500 V-Bucks',
                price: 86,
                img: 'https://i.ibb.co/XpnNq6w/13500-pavos.jpg',
                description:
                    'Fortnite V-Bucks es un paquete de monedas in-game el cual puedes utilizar para comprar diferentes artículos dentro del juego de FORNITE, la recarga de la misma se hace de manera directa a su cuenta de Epic Games en cuestiones de segundos disponible para cualquier plataforma (XBOX, PLAYSTATION, PC, NINTENDO, ANDROID & IOS)',
                category: 'recargas',
                subCategory: 'fortnite',
            },
            {
                name: 'League of Legends 10$ - RIOT GAMES PC',
                price: 11.99,
                img: 'https://i.ibb.co/njpvMPP/riot-1815.jpg',
                description:
                    '¡Sube de nivel tu experiencia en League of Legends! Entrega de código digital para que lo canjee desde su cuenta League of Legends. Disponible para: PC',
                category: 'recargas',
                subCategory: 'league_of_legends',
            },
            {
                name: 'League of Legends 25$ - RIOT GAMES PC',
                price: 26.99,
                img: 'https://i.ibb.co/Qf8Z1yZ/riot-4000.jpg',
                description:
                    '¡Sube de nivel tu experiencia en League of Legends! Entrega de código digital para que lo canjee desde su cuenta League of Legends. Disponible para: PC',
                category: 'recargas',
                subCategory: 'league_of_legends',
            },
            {
                name: 'League of Legends 50$ - RIOT GAMES PC',
                price: 52.99,
                img: 'https://i.ibb.co/cLdpYJT/riot-8400.jpg',
                description:
                    '¡Sube de nivel tu experiencia en League of Legends! Entrega de código digital para que lo canjee desde su cuenta League of Legends. Disponible para: PC',
                category: 'recargas',
                subCategory: 'league_of_legends',
            },
            {
                name: 'League of Legends 100$ - RIOT GAMES PC',
                price: 104.99,
                img: 'https://i.ibb.co/rmBdXtP/riot-13200.jpg',
                description:
                    '¡Sube de nivel tu experiencia en League of Legends! Entrega de código digital para que lo canjee desde su cuenta League of Legends. Disponible para: PC',
                category: 'recargas',
                subCategory: 'league_of_legends',
            },
            {
                name: 'Giftcard PlayStation $10',
                price: 11.99,
                img: 'https://i.ibb.co/RGnDHJx/10-ps-giftcard.png',
                description:
                    'Giftcard de PSN con valor de $25. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'psn',
            },
            {
                name: 'Giftcard PlayStation $20',
                price: 22.99,
                img: 'https://i.ibb.co/5n56FvH/20-ps-giftcard.png',
                description:
                    'Giftcard de PSN con valor de $20. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'psn',
            },
            {
                name: 'Giftcard PlayStation $25',
                price: 26.99,
                img:
                    'https://multimedia.bbycastatic.ca/multimedia/products/500x500/126/12677/12677654.jpg',
                description:
                    'Giftcard de PSN con valor de $25. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'psn',
            },
            {
                name: 'Giftcard PlayStation $50',
                price: 52.99,
                img: 'https://i.ibb.co/FnSTn6H/50-ps-giftcard.png',
                description:
                    'Giftcard de PSN con valor de $50. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'psn',
            },
            {
                name: 'Giftcard PlayStation $60',
                price: 62.99,
                img:
                    'https://http2.mlstatic.com/D_NQ_NP_733875-MLA47429803387_092021-O.jpg',
                description:
                    'Giftcard de PSN con valor de $60. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'psn',
            },
            {
                name: 'Giftcard PlayStation $75',
                price: 77.99,
                img: 'https://i.ibb.co/zRwKXpx/psn-75.png',
                description:
                    'Giftcard de PSN con valor de $75. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'psn',
            },
            {
                name: 'Giftcard PlayStation $100',
                price: 104.99,
                img: 'https://i.ibb.co/rx961ZL/100-ps-giftcard.png',
                description:
                    'Giftcard de PSN con valor de $100. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'psn',
            },
            {
                name: 'PlayStation Plus - 1 mes',
                price: 12.99,
                img: 'https://i.ibb.co/Dr0Z5xn/psplus-1m.jpg',
                description:
                    'PlayStation Plus válido por 1 mes. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'psn',
            },
            {
                name: 'PlayStation Plus - 3 meses',
                price: 27.99,
                img: 'https://i.ibb.co/4YB4xKC/psplus-3m.jpg',
                description:
                    'PlayStation Plus válido por 3 meses. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'psn',
            },
            {
                name: 'PlayStation Plus - 12 meses',
                price: 62.99,
                img: 'https://i.ibb.co/BtH24jL/psplus-12m.jpg',
                description:
                    'PlayStation Plus válido por 12 meses. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'psn',
            },
            {
                name: 'Giftcard Nintendo $5',
                price: 5.99,
                img:
                    'https://m.media-amazon.com/images/I/71kcx+3mcmL._SL1500_.jpg',
                description:
                    'Giftcard de Nintendo con valor de $5. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'nintendo',
            },
            {
                name: 'Giftcard Nintendo $10',
                price: 11.99,
                img:
                    'https://m.media-amazon.com/images/I/71g8qy0R8zL._SY445_.jpg',
                description:
                    'Giftcard de Nintendo con valor de $10. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'nintendo',
            },
            {
                name: 'Giftcard Nintendo $20',
                price: 21.99,
                img:
                    'https://m.media-amazon.com/images/I/71YSvFcuK7L._SL1500_.jpg',
                description:
                    'Giftcard de Nintendo con valor de $20. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'nintendo',
            },
            {
                name: 'Giftcard Nintendo $35',
                price: 36.99,
                img:
                    'https://m.media-amazon.com/images/I/71kYjm-EI8L._SL1500_.jpg',
                description:
                    'Giftcard de Nintendo con valor de $35. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',

                subCategory: 'nintendo',
            },
            {
                name: 'Giftcard Nintendo $45',
                price: 46.99,
                img: 'https://m.media-amazon.com/images/I/51XPfhiwKlL.jpg',
                description:
                    'Giftcard de Nintendo con valor de $45. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',

                subCategory: 'nintendo',
            },
            {
                name: 'Giftcard Nintendo $50',
                price: 52.99,
                img:
                    'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5784/5784110_sd.jpg',
                description:
                    'Giftcard de Nintendo con valor de $50. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'nintendo',
            },
            {
                name: 'Giftcard Nintendo $70',
                price: 71.99,
                img:
                    'https://m.media-amazon.com/images/I/714oSJ60A9L._SY679_.jpg',
                description:
                    'Giftcard de Nintendo con valor de $70. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'nintendo',
            },
            {
                name: 'Giftcard Nintendo $99',
                price: 104.99,
                img:
                    'https://m.media-amazon.com/images/I/51x+YpqXTIL._AC_SY780_.jpg',
                description:
                    'Giftcard de Nintendo con valor de $99. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'nintendo',
            },
            {
                name: 'Giftcard Xbox $5',
                price: 5.99,
                img:
                    'https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/3ca45092c6274acb91b6d108db61ce2e_Medium.jpg',
                description:
                    'Giftcard de Xbox con valor de $5. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'xbox',
            },
            {
                name: 'Giftcard Xbox $10',
                price: 11.99,
                img:
                    'https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/5f72dd18f2254cf2a54924656290d6eb_Medium.jpg',
                description:
                    'Giftcard de Xbox con valor de $10. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'xbox',
            },
            {
                name: 'Giftcard Xbox $15',
                price: 16.99,
                img:
                    'https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/43fc9a2a8e2a4bf8a71d94d724da72a5_Medium.jpg',
                description:
                    'Giftcard de Xbox con valor de $15. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'xbox',
            },
            // {
            //     name: 'Giftcard Xbox $20',
            //     price: 21.99,
            //     img:
            //         'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/1891/1891044_sa.jpg',
            //     description:
            //         'Giftcard de Xbox con valor de $20. Exclusivo para cuentas en los Estados Unidos.',

            //     subCategory: 'xbox',
            // },
            {
                name: 'Giftcard Xbox $30',
                price: 31.99,
                img:
                    'https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/7fbd1d9e15bd40b8b474412870e0a5b3_Medium.jpg',
                description:
                    'Giftcard de Xbox con valor de $30. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'xbox',
            },
            {
                name: 'Giftcard Xbox $40',
                price: 42.99,
                img:
                    'https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/a2fd5c3369c2458886537d60df2b45de_Medium.jpg',
                description:
                    'Giftcard de Xbox con valor de $40. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'xbox',
            },
            {
                name: 'Giftcard Xbox $50',
                price: 52.99,
                img:
                    'https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/5893379e583644c699eabb160f4efd46_Medium.jpg',
                description:
                    'Giftcard de Xbox con valor de $50. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'xbox',
            },
            // {
            //     name: 'Giftcard Xbox $60',
            //     price: 62.99,
            //     img:
            //         'https://cdn-products.eneba.com/resized-products/kV91qZzS2cn4wZ1KPKwiYQBjtPzI0nnA6Syn7AHWSv8_350x200_2x-0.jpeg',
            //     description:
            //         'Giftcard de Xbox con valor de $60. Exclusivo para cuentas en los Estados Unidos.',

            //     subCategory: 'xbox',
            // },
            {
                name: 'Giftcard Xbox $70',
                price: 72.99,
                img:
                    'https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/628a5f48c3c345fb88c284a3d12f8905_Medium.jpg',
                description:
                    'Giftcard de Xbox con valor de $70. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'xbox',
            },
            {
                name: 'Giftcard Xbox $100',
                price: 104.99,
                img:
                    'https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/1564636ad707434c835493fabc918e01_Medium.jpg',
                description:
                    'Giftcard de Xbox con valor de $100. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'xbox',
            },
            {
                name: 'Spotify Premium - 3 Meses',
                price: 32.99,
                img: 'https://i.ibb.co/h9NsNDR/spotify-3meses.jpg',
                description:
                    'Cuentas Spotify en Plan Premium por tiempo de vigencia de 3 meses predeterminado desde efectuada la compra. (Sin afiliar tarjetas de crédito/débito).',
                category: 'codigos_digitales',
                subCategory: 'spotify',
            },
            {
                name: 'Spotify Premium - 12 Meses',
                price: 104.99,
                img: 'https://i.ibb.co/bRvZFmL/spotify-12meses.jpg',
                description:
                    'Cuentas Spotify en Plan Premium por tiempo de vigencia de 12 meses predeterminado desde efectuada la compra (Sin afiliar tarjetas de crédito/débito).',
                category: 'codigos_digitales',
                subCategory: 'spotify',
            },
            {
                name: 'Netflix - 3 Meses',
                price: 32.99,
                img: 'https://i.ibb.co/PZC72pY/netflix-3meses.jpg',
                description:
                    'Cuentas NETFLIX en Plan Premium por tiempo de vigencia de 3 meses predeterminado desde efectuada la compra (Sin afiliar tarjetas de crédito/débito).',
                category: 'codigos_digitales',
                subCategory: 'netflix',
            },
            {
                name: 'Netflix - 12 Meses',
                price: 104.99,
                img: 'https://i.ibb.co/jfhy3YW/netflix-12meses.jpg',
                description:
                    'Cuentas NETFLIX en Plan Premium por tiempo de vigencia de 12 meses predeterminado desde efectuada la compra (Sin afiliar tarjetas de crédito/débito).',
                category: 'codigos_digitales',
                subCategory: 'netflix',
            },
            {
                name: 'Giftcard Google Play $5',
                price: 8,
                img:
                    'https://www.thecardcloset.com/static/img/gift-cards/5-google-play-digital-gift-card-email-delivery-2x.png',
                description:
                    'Giftcard de Google Play con valor de $5. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'google',
            },
            {
                name: 'Giftcard Google Play $10',
                price: 12,
                img:
                    'https://www.thecardcloset.com/static/img/gift-cards/10-google-play-digital-gift-card-email-delivery-2x.png',
                description:
                    'Giftcard de Google Play con valor de $10. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'google',
            },
            {
                name: 'Giftcard Google Play $15',
                price: 17,
                img:
                    'https://www.thecardcloset.com/static/img/gift-cards/15-google-play-digital-gift-card-email-delivery-2x.png',
                description:
                    'Giftcard de Google Play con valor de $15. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'google',
            },
            {
                name: 'Giftcard Google Play $25',
                price: 27,
                img:
                    'https://www.thecardcloset.com/static/img/gift-cards/25-google-play-digital-gift-card-email-delivery-2x.png',
                description:
                    'Giftcard de Google Play con valor de $25. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'google',
            },
            {
                name: 'Giftcard Google Play $50',
                price: 53,
                img:
                    'https://www.thecardcloset.com/static/img/gift-cards/50-google-play-digital-gift-card-email-delivery-2x.png',
                description:
                    'Giftcard de Google Play con valor de $50. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'google',
            },
            {
                name: 'Giftcard Google Play $100',
                price: 105,
                img:
                    'https://www.thecardcloset.com/static/img/gift-cards/100-google-play-digital-gift-card-email-delivery-2x.png',
                description:
                    'Giftcard de Google Play con valor de $100. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'google',
            },
            {
                name: 'Giftcard iTunes $5',
                price: 8,
                img:
                    'https://www.thecardcloset.com/static/img/gift-cards/5-itunes-digital-gift-card-email-delivery-2x.png',
                description:
                    'Giftcard de Google Play con valor de $5. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'itunes',
            },
            {
                name: 'Giftcard iTunes $10',
                price: 12,
                img:
                    'https://www.thecardcloset.com/static/img/gift-cards/10-itunes-digital-gift-card-email-delivery-2x.png',
                description:
                    'Giftcard de Google Play con valor de $10. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'itunes',
            },
            {
                name: 'Giftcard iTunes $15',
                price: 17,
                img:
                    'https://www.thecardcloset.com/static/img/gift-cards/5-itunes-digital-gift-card-email-delivery-2x.png',
                description:
                    'Giftcard de Google Play con valor de $15. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'itunes',
            },
            {
                name: 'Giftcard iTunes $25',
                price: 27,
                img:
                    'https://www.thecardcloset.com/static/img/gift-cards/25-itunes-digital-gift-card-email-delivery-2x.png',
                description:
                    'Giftcard de Google Play con valor de $25. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'itunes',
            },
            {
                name: 'Giftcard iTunes $50',
                price: 53,
                img:
                    'https://www.thecardcloset.com/static/img/gift-cards/50-itunes-digital-gift-card-email-delivery-2x.png',
                description:
                    'Giftcard de Google Play con valor de $50. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'itunes',
            },
            {
                name: 'Giftcard iTunes $100',
                price: 105,
                img:
                    'https://www.thecardcloset.com/static/img/gift-cards/100-itunes-digital-gift-card-email-delivery-2x.png',
                description:
                    'Giftcard de Google Play con valor de $100. Exclusivo para cuentas en los Estados Unidos.',
                category: 'codigos_digitales',
                subCategory: 'itunes',
            },
            {
                name: 'PlayStation 5 - Digital',
                price: 650,
                img: 'https://i.ibb.co/KGwgjzY/ps5-digital.jpg',
                description: 'PlayStation 5 Versión digital.',
                category: 'consolas',
                subCategory: 'playstation',
            },
            {
                name: 'PlayStation 5 - Disco',
                price: 750,
                img: 'https://i.ibb.co/pPn2hK3/ps5-disk.jpg',
                description: 'PlayStation 5 Versión disco.',
                category: 'consolas',
                subCategory: 'playstation',
            },
            {
                name: 'Xbox Series S',
                price: 650,
                img: 'https://i.ibb.co/TMMPFwm/xbox-s.jpg',
                description: 'Xbox Series S.',
                category: 'consolas',
                subCategory: 'xbox',
            },
            {
                name: 'Xbox Series X',
                price: 750,
                img: 'https://i.ibb.co/r0PxpXj/xbox-x.jpg',
                description: 'Xbox Series X.',
                category: 'consolas',
                subCategory: 'xbox',
            },
            {
                name: 'Control PS4 - Azul',
                price: 50.99,
                img: 'https://i.ibb.co/JxTqKQx/control-ps4-blue.jpg',
                description: 'Control para PlayStation 4 color azul',
                category: 'accesorios',
                subCategory: 'ps4',
            },
            {
                name: 'Control PS4 - Cyan',
                price: 50.99,
                img: 'https://i.ibb.co/qJJLg0d/control-ps4-cyan.jpg',
                description: 'Control para PlayStation 4 color cyan',
                category: 'accesorios',
                subCategory: 'ps4',
            },
            {
                name: 'Control PS4 - Naranja',
                price: 50.99,
                img: 'https://i.ibb.co/BVsV7Jc/control-ps4-orange.jpg',
                description: 'Control para PlayStation 4 color naranja',
                category: 'accesorios',
                subCategory: 'ps4',
            },
            {
                name: 'Control PS4 - Negro',
                price: 50.99,
                img: 'https://i.ibb.co/xH6jBSC/control-ps4-black.jpg',
                description: 'Control para PlayStation 4 color negro',
                category: 'accesorios',
                subCategory: 'ps4',
            },
            {
                name: 'Control PS4 - Camo',
                price: 50.99,
                img: 'https://i.ibb.co/q71zNRJ/control-ps4-camo.jpg',
                description: 'Control para PlayStation 4 color negro',
                category: 'accesorios',
                subCategory: 'ps4',
            },
        ]
        this.menu = m
        let id = 0
        this.menu.forEach(item => {
            item.id = id
            id++
        })
        this.isLoading = false
    },
}
</script>
