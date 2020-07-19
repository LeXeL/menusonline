<template>
    <q-page class="q-pa-md">
        <div class="row">
            <div class="text-h5">Nombre del menu</div>
        </div>
        <div class="row">
            <div class="col-lg-9 q-pa-md">
                <q-carousel
                    v-model="slide"
                    transition-prev="slide-right"
                    transition-next="slide-left"
                    animated
                    control-color="primary"
                    navigation
                    padding
                    arrows
                    height="auto"
                    class="bg-grey-1 shadow-2 rounded-borders full-width"
                >
                    <q-carousel-slide :name="1" class="column no-wrap">
                        <div
                            class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
                        >
                            <div class="col-4">
                                <q-img
                                    class="rounded-borders full-height"
                                    :src="
                                        require('@/assets/menu-pages/Sample Restarent and Bar Menu-1.jpg')
                                    "
                                />
                                <div class="text-subtitle1 text-center q-mt-sm">
                                    Pagina 1
                                </div>
                            </div>

                            <div class="col-4">
                                <q-img
                                    class="rounded-borders full-height"
                                    :src="
                                        require('@/assets/menu-pages/Sample Restarent and Bar Menu-2.jpg')
                                    "
                                />
                                <div class="text-subtitle1 text-center q-mt-sm">
                                    Pagina 2
                                </div>
                            </div>
                            <div class="col-4">
                                <q-img
                                    class="rounded-borders full-height"
                                    :src="
                                        require('@/assets/menu-pages/Sample Restarent and Bar Menu-3.jpg')
                                    "
                                />
                                <div class="text-subtitle1 text-center q-mt-sm">
                                    Pagina 3
                                </div>
                            </div>
                        </div>
                    </q-carousel-slide>

                    <q-carousel-slide :name="2" class="column no-wrap">
                        <div
                            class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
                        >
                            <div class="col-4">
                                <q-img
                                    class="rounded-borders full-height"
                                    :src="
                                        require('@/assets/menu-pages/Sample Restarent and Bar Menu-4.jpg')
                                    "
                                />
                                <div class="text-subtitle1 text-center q-mt-sm">
                                    Pagina 4
                                </div>
                            </div>
                            <div class="col-4">
                                <q-img
                                    class="rounded-borders full-height"
                                    :src="
                                        require('@/assets/menu-pages/Sample Restarent and Bar Menu-5.jpg')
                                    "
                                />
                                <div class="text-subtitle1 text-center q-mt-sm">
                                    Pagina 5
                                </div>
                            </div>
                            <div class="col-4">
                                <q-img
                                    class="rounded-borders full-height"
                                    :src="
                                        require('@/assets/menu-pages/Sample Restarent and Bar Menu-6.jpg')
                                    "
                                />
                                <div class="text-subtitle1 text-center q-mt-sm">
                                    Pagina 6
                                </div>
                            </div>
                        </div>
                    </q-carousel-slide>
                </q-carousel>
            </div>
            <div class="col-lg-3 q-pa-md">
                <q-card class="q-mb-md">
                    <q-card-section>
                        <q-file filled label="Seleccione imagen">
                            <template v-slot:after>
                                <q-btn round dense color="secondary">
                                    <i class="fas fa-paper-plane"></i>
                                </q-btn>
                            </template>
                        </q-file>
                    </q-card-section>
                </q-card>
                <q-list bordered padding>
                    <q-item-label header>Paginas</q-item-label>

                    <q-item v-ripple v-for="(page, i) in pages" :key="i">
                        <q-item-section>
                            <q-item-label>Pagina {{ i + 1 }}</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                            <q-btn color="red-7" size="xs">
                                <i class="fas fa-times"></i>
                            </q-btn>
                        </q-item-section>
                    </q-item>
                </q-list>
                <draggable
                    class="list-group"
                    tag="ul"
                    v-model="list"
                    v-bind="dragOptions"
                    @start="isDragging = true"
                    @end="isDragging = false"
                >
                    <transition-group type="transition" name="flip-list">
                        <li
                            class="list-group-item"
                            v-for="element in list"
                            :key="element.order"
                        >
                            {{ element.name }}

                            <q-btn color="red-7" size="xs" style="float:right">
                                <i class="fas fa-times"></i>
                            </q-btn>
                        </li>
                    </transition-group>
                </draggable>
                <q-btn color="secondary" label="Guardar" style="float: right">
                </q-btn>
            </div>
            <!-- <div class="col-lg-4 q-pa-md">
                <q-card>
                    <q-card-section>
                        <q-file filled label="Seleccione imagen" />
                    </q-card-section>
                </q-card>
            </div>-->
        </div>
        <div class="row q-pa-md"></div>
    </q-page>
</template>

<script>
import draggable from 'vuedraggable'
const message = [
    'vue.draggable',
    'draggable',
    'component',
    'for',
    'vue.js 2.0',
    'based',
    'on',
    'Sortablejs',
]

export default {
    order: 6,
    components: {
        draggable,
    },
    data() {
        return {
            pages: [
                'Sample Restarent and Bar Menu-1',
                'Sample Restarent and Bar Menu-2',
                'Sample Restarent and Bar Menu-3',
                'Sample Restarent and Bar Menu-4',
                'Sample Restarent and Bar Menu-5',
                'Sample Restarent and Bar Menu-6',
            ],
            slide: 1,
            enabled: true,
            list: message.map((name, index) => {
                return {name, order: index + 1}
            }),
        }
    },
    computed: {
        dragOptions() {
            return {
                animation: 0,
                group: 'description',
                disabled: false,
                ghostClass: 'ghost',
            }
        },
    },
    methods: {
        sort() {
            this.list = this.list.sort((a, b) => a.order - b.order)
        },
    },
}
</script>

<style>
.button {
    margin-top: 35px;
}
.flip-list-move {
    transition: transform 0.5s;
}
.no-move {
    transition: transform 0s;
}
.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}
.list-group {
    min-height: 20px;
    padding-left: 0;
    border: solid 1px rgba(0, 0, 0, 0.12);
}
.list-group-item {
    cursor: move;
    padding: 15px;
    list-style-type: none;
}
</style>
