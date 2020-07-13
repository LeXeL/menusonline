<template>
    <q-page class="q-pa-md">
        <div class="row q-px-md">
            <div class="text-h5 mo-grey">Administrador de restaurantes</div>
        </div>
        <div class="row">
            <div class="col-lg-8 q-pa-md">
                <q-card class="no-shadow">
                    <q-card-section>
                        <div class="text-h6 mo-grey">Mis Menus</div>
                    </q-card-section>

                    <q-markup-table class="q-pb-md mo-grey">
                        <thead>
                            <tr>
                                <th class="text-left">Nombre</th>
                                <th class="text-left">Correo</th>
                                <th class="text-left">Numero</th>
                                <th class="text-left">Direccion</th>
                                <th class="text-left">QR</th>
                                <th class="text-left">Detalles</th>
                                <th class="text-left">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(menu, i) in 5" :key="i">
                                <td class="text-left">
                                    Nombre del restaurante
                                </td>
                                <td class="text-left">rest.email@gmail.com</td>
                                <td class="text-left">6565-6565</td>
                                <td class="text-left">/rest-path</td>
                                <td class="text-left">
                                    <q-btn
                                        size="sm"
                                        color="warning"
                                        @click="alert = true"
                                    >
                                        <i class="fas fa-qrcode"></i>
                                    </q-btn>
                                </td>
                                <td class="text-left">
                                    <q-btn size="sm" color="info" to="/menus">
                                        <i class="fas fa-info"></i>
                                    </q-btn>
                                </td>
                                <td class="text-left">
                                    <q-btn size="sm" color="red-7">
                                        <i class="fas fa-trash-alt"></i>
                                    </q-btn>
                                </td>
                            </tr>
                        </tbody>
                    </q-markup-table>
                </q-card>
            </div>
            <div class="col-lg-4 q-pa-md">
                <q-card class="q-mb-lg no-shadow mo-grey">
                    <q-card-section>
                        <div class="text-h6">Crear nuevo restaurante</div>
                    </q-card-section>
                    <q-card-section>
                        <q-input filled class="q-mb-md" label="Nombre" />
                        <q-input filled class="q-mb-md" label="Correo" />
                        <q-input filled class="q-mb-md" label="Numero" />
                        <q-input filled class="q-mb-md" label="/Path" />
                        <q-input filled class="q-mb-md" label="Correo" />
                        <q-file filled class="q-mb-md" label="Logo">
                            <template v-slot:prepend>
                                <i class="fas fa-paperclip"></i>
                            </template>
                        </q-file>
                        <q-input filled class="q-mb-md" label="Splash color">
                            <template v-slot:append>
                                <i
                                    class="fas fa-eye-dropper"
                                    style="cursor: pointer"
                                >
                                    <q-popup-proxy
                                        transition-show="scale"
                                        transition-hide="scale"
                                    >
                                        <q-color />
                                    </q-popup-proxy>
                                </i>
                            </template>
                        </q-input>
                        <q-input
                            filled
                            class="q-mb-md"
                            label="Splash button color"
                        >
                            <template v-slot:append>
                                <i
                                    class="fas fa-eye-dropper"
                                    style="cursor: pointer"
                                >
                                    <q-popup-proxy
                                        transition-show="scale"
                                        transition-hide="scale"
                                    >
                                        <q-color />
                                    </q-popup-proxy>
                                </i>
                            </template>
                        </q-input>
                        <q-input
                            filled
                            class="q-mb-md"
                            label="Menu Background color"
                        >
                            <template v-slot:append>
                                <i
                                    class="fas fa-eye-dropper"
                                    style="cursor: pointer"
                                >
                                    <q-popup-proxy
                                        transition-show="scale"
                                        transition-hide="scale"
                                    >
                                        <q-color />
                                    </q-popup-proxy>
                                </i>
                            </template>
                        </q-input>
                        <q-btn color="secondary" class="q-mt-sm">Crear</q-btn>
                    </q-card-section>
                </q-card>
            </div>
        </div>
        <q-dialog v-model="alert">
            <q-card>
                <q-card-section>
                    <q-img
                        src="https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market_full/generator/dist/generator/assets/images/websiteQRCode_noFrame.png"
                        style="width: 350px"
                    />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn
                        flat
                        label="Descargar"
                        color="primary"
                        v-close-popup
                    />
                    <q-btn flat label="Cerrar" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
export default {
    data() {
        return {
            left: false,
            alert: false,
        }
    },
}
</script>
