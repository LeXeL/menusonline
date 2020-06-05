<template>
    <q-page class="q-pa-md">
        <q-btn
            class="q-mt-md q-mb-md"
            color="primary"
            label="Nuevo"
            @click="restaurantFormPrompt = true; action = 'new'"
        />
        <div class="home">
            <!-- <input type="text" placeholder="Name" v-model="name" />
        <br />
        <input type="text" placeholder="Url" v-model="url" />
        <br />
        <button @click="Generate()">Generar</button>
        <div id="qrcode"></div>
        <div v-for="(element, index) in queue" :key="index">
            <pdfembeded :url="element.url"></pdfembeded>
            </div>-->
        </div>
        <div>
            <div class="row">
                <div class="col">
                    <div class="text-h6">Restaurante</div>
                </div>
                <div class="col">
                    <div class="text-h6">Ver QR</div>
                </div>
                <div class="col">
                    <div class="text-h6">Ver PDF</div>
                </div>
                <div class="col">
                    <div class="text-h6">Actualizar PDF</div>
                </div>
            </div>
            <div class="row q-mt-md" v-for="(rest, i) in 10" :key="i">
                <div class="col">
                    <p>Name here</p>
                </div>
                <div class="col">
                    <q-btn round color="purple" glossy @click="qrAlert = true">
                        <i class="fas fa-qrcode"></i>
                    </q-btn>
                </div>
                <div class="col">
                    <q-btn round color="secondary" glossy>
                        <i class="fas fa-file-pdf"></i>
                    </q-btn>
                </div>
                <div class="col">
                    <q-btn
                        round
                        color="amber"
                        glossy
                        @click="restaurantFormPrompt = true; action = 'edit'"
                    >
                        <i class="fas fa-edit"></i>
                    </q-btn>
                </div>
            </div>
        </div>
        <q-dialog v-model="restaurantFormPrompt">
            <q-card style="min-width: 350px">
                <q-card-section>
                    <div class="text-h6" v-if="action == 'new'">Agregar restaurante</div>
                    <div class="text-h6" v-else>Actualizar menu</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <template v-if="action == 'new'">
                        <q-input type="text" label="Nombre" class="q-mb-md" autofocus />
                        <q-file outlined v-model="logo" label="Logo de restaurante" class="q-mb-md">
                            <template v-slot:prepend>
                                <i class="fas fa-paperclip"></i>
                            </template>
                        </q-file>
                        <q-toggle v-model="qrLogo" label="Logo en QR" class="q-mb-md" />
                    </template>
                    <q-file outlined v-model="menu" label="Menu de restaurante">
                        <template v-slot:prepend>
                            <i class="fas fa-paperclip"></i>
                        </template>
                    </q-file>
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancel" v-close-popup />
                    <q-btn flat label="Guardar" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-dialog v-model="qrAlert">
            <q-card>
                <q-card-section>
                    <div class="text-h6">Nombre del restaurante</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <img
                        src="https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market_full/generator/dist/generator/assets/images/websiteQRCode_noFrame.png"
                        width="100%"
                    />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="OK" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
// @ is an alias to /src
import pdfembeded from '@/components/pdfembeded.vue'
import QRCode from 'easyqrcodejs'

export default {
    name: 'Home',
    components: {
        pdfembeded,
    },
    data() {
        return {
            queue: [],
            url: 'http://demplays.com/Beginningchords.pdf',
            name: 'chrods',
            qrAlert: false,
            restaurantFormPrompt: false,
            logo: '',
            qrLogo: false,
            menu: '',
            action: 'new',
        }
    },
    methods: {
        Generate() {
            var options = {
                text: this.url,
            }
            var qrcode = new QRCode(document.getElementById('qrcode'), options)

            this.queue.push({name: this.name, url: this.url})
        },
    },
}
</script>
