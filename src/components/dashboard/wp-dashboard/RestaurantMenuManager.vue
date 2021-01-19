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
                <q-expansion-item
                    class="shadow-1 overflow-hidden q-mb-md"
                    expand-separator
                    default-opened
                    icon="category"
                    label="Categorias y Opciones"
                    header-class="bg-secondary"
                    style="border-radius: 10px"
                    dark
                >
                    <q-card class="text-black">
                        <q-card-section>
                            <div class="row">
                                <div class="col-lg-4 q-px-md">
                                    <Categories />
                                </div>
                                <div class="col-lg-4 q-px-md">
                                    <Options />
                                </div>
                            </div>
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
                <q-expansion-item
                    class="shadow-1 overflow-hidden q-mb-md"
                    expand-separator
                    default-opened
                    icon="menu_book"
                    label="Items de Menu"
                    header-class="bg-secondary"
                    style="border-radius: 10px"
                    dark
                >
                    <q-card class="text-black">
                        <q-card-section>
                            <div class="row">
                                <div class="col q-px-md">
                                    <Items />
                                </div>
                                <div class="col q-px-md">
                                    <ItemGeneralInfo />
                                </div>
                                <div class="col q-px-md">
                                    <div class="text-h6 q-mb-md">
                                        Opciones - Nivel 1
                                    </div>
                                    <ItemOptionsLvs />
                                </div>
                                <div class="col q-px-md">
                                    <div class="text-h6 q-mb-md">
                                        Opciones - Nivel 2
                                    </div>
                                    <ItemOptionsLvs />
                                </div>
                                <div class="col q-px-md">
                                    <div class="text-h6 q-mb-md">
                                        Opciones - Nivel 3
                                    </div>
                                    <ItemOptionsLvs />
                                </div>
                            </div>
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script>
import Categories from '@/components/dashboard/wp-dashboard/menu-manager/Categories'
import Options from '@/components/dashboard/wp-dashboard/menu-manager/Options'
import Items from '@/components/dashboard/wp-dashboard/menu-manager/Items'
import ItemGeneralInfo from '@/components/dashboard/wp-dashboard/menu-manager/ItemGeneralInfo'
import ItemOptionsLvs from '@/components/dashboard/wp-dashboard/menu-manager/ItemOptionsLvs'

export default {
    props: ['display'],
    methods: {
        closeDialog() {
            this.$emit('close-dialog')
        },
    },
    components: {
        Categories,
        Options,
        Items,
        ItemGeneralInfo,
        ItemOptionsLvs,
    },
}
</script>
