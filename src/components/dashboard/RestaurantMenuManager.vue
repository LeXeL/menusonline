<template>
    <q-dialog
        v-model="display"
        persistent
        maximized
        transition-show="slide-up"
        transition-hide="slide-down"
    >
        <q-card class="bg-accent text-white">
            <q-bar>
                <q-space />
                <q-btn dense flat icon="close" @click="closeDialog">
                    <q-tooltip content-class="bg-white text-primary"
                        >Cerrar</q-tooltip
                    >
                </q-btn>
            </q-bar>

            <q-card-section>
                <div class="text-h4 q-px-md">Gestionar Menu</div>
            </q-card-section>

            <q-card-section>
                <div class="row">
                    <div class="col q-px-md">
                        <q-expansion-item
                            class="shadow-1 overflow-hidden"
                            expand-separator
                            icon="category"
                            label="Categorias y Opciones"
                            header-class="bg-secondary"
                            style="border-radius: 10px"
                            dark
                        >
                            <q-card class="text-black">
                                <q-card-section>
                                    <div class="row">
                                        <div class="col-lg-3">
                                            <div class="text-h6 q-mb-md">
                                                Categorias
                                            </div>
                                            <div class="row q-mb-md">
                                                <q-input
                                                    label="Nueva categoria"
                                                    class="full-width q-mb-md"
                                                    filled
                                                >
                                                    <template v-slot:after>
                                                        <q-btn
                                                            round
                                                            flat
                                                            icon="send"
                                                            color="accent"
                                                        />
                                                    </template>
                                                </q-input>
                                                <q-list
                                                    bordered
                                                    padding
                                                    class="full-width"
                                                >
                                                    <div
                                                        v-for="(category,
                                                        i) in categories"
                                                        :key="i"
                                                    >
                                                        <q-item>
                                                            <q-item-section>
                                                                <q-item-label>{{
                                                                    category
                                                                }}</q-item-label>
                                                            </q-item-section>
                                                            <q-item-section
                                                                side
                                                            >
                                                                <q-btn
                                                                    flat
                                                                    dense
                                                                    round
                                                                    icon="close"
                                                                    color="red-7"
                                                                />
                                                            </q-item-section>
                                                        </q-item>
                                                        <q-separator
                                                            v-if="
                                                                i + 1 <
                                                                    categories.length
                                                            "
                                                        />
                                                    </div>
                                                </q-list>
                                            </div>
                                        </div>
                                    </div>
                                </q-card-section>
                            </q-card>
                        </q-expansion-item>
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    props: ['display'],
    data() {
        return {
            categories: ['Entradas', 'Hamburguesas', 'Bebidas'],
        }
    },
    methods: {
        closeDialog() {
            this.$emit('close-dialog')
        },
    },
}
</script>
