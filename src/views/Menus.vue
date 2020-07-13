<template>
    <q-page class="q-pa-md">
        <div class="row q-px-md">
            <div class="text-h5 mo-grey">Nombre del restaurante</div>
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
                                <th class="text-left">Menu</th>
                                <th class="text-right">Activo</th>
                                <th class="text-right">Seleccionar</th>
                                <th class="text-right">Ver</th>
                                <th class="text-right">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(menu, i) in 5" :key="i">
                                <td class="text-left">Nombre del menu</td>
                                <td class="text-right">
                                    <q-badge color="secondary" v-if="i == 1" class="q-py-xs">
                                        <i class="fas fa-check"></i>
                                    </q-badge>
                                </td>
                                <td class="text-right">
                                    <q-btn size="sm" color="secondary">Activar</q-btn>
                                </td>
                                <td class="text-right">
                                    <q-btn size="sm" color="info" to="/menu-details">
                                        <i class="fas fa-info-circle"></i>
                                    </q-btn>
                                </td>
                                <td class="text-right">
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
                        <div class="text-h6">Crear nuevo menu</div>
                    </q-card-section>
                    <q-card-section>
                        <q-input
                            filled
                            v-model="name"
                            label="Nombre del menu *"
                            lazy-rules
                            :rules="[
                                val =>
                                    (val && val.length > 0) ||
                                    'Porfavor ingresa un nombre.',
                            ]"
                        />
                        <q-btn color="secondary" class="q-mt-sm">Crear</q-btn>
                    </q-card-section>
                </q-card>
                <q-card class="no-shadow mo-grey">
                    <q-card-section>
                        <div class="text-h6">Ver mi codigo QR</div>
                    </q-card-section>
                    <q-card-section>
                        <q-btn color="warning" @click="alert = true">Ver QR</q-btn>
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
                    <q-btn flat label="Descargar" color="primary" v-close-popup />
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
