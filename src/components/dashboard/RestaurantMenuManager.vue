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
                                    <MenuManagerCategories />
                                </div>
                                <div class="col-lg-4 q-px-md">
                                    <MenuManagerOptions />
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
                                    <MenuManagerItems />
                                </div>
                                <div class="col q-px-md">
                                    <MenuManagerItemGeneralInfo />
                                </div>
                                <div class="col q-px-md">
                                    <div class="text-h6 q-mb-md">
                                        Opciones - Nivel 1
                                    </div>
                                    <MenuManagerItemOptionsLvs />
                                </div>
                                <div class="col q-px-md">
                                    <div class="text-h6 q-mb-md">
                                        Opciones - Nivel 2
                                    </div>
                                    <MenuManagerItemOptionsLvs />
                                </div>
                                <div class="col q-px-md">
                                    <div class="text-h6 q-mb-md">
                                        Opciones - Nivel 3
                                    </div>
                                    <MenuManagerItemOptionsLvs />
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
import MenuManagerCategories from '@/components/dashboard/MenuManagerCategories'
import MenuManagerOptions from '@/components/dashboard/MenuManagerOptions'
import MenuManagerItems from '@/components/dashboard/MenuManagerItems'
import MenuManagerItemGeneralInfo from '@/components/dashboard/MenuManagerItemGeneralInfo'
import MenuManagerItemOptionsLvs from '@/components/dashboard/MenuManagerItemOptionsLvs'

export default {
    props: ['display'],
    methods: {
        closeDialog() {
            this.$emit('close-dialog')
        },
    },
    components: {
        MenuManagerCategories,
        MenuManagerOptions,
        MenuManagerItems,
        MenuManagerItemGeneralInfo,
        MenuManagerItemOptionsLvs,
    },
}
</script>
