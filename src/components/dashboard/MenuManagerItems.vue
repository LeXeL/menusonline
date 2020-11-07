<template>
    <div>
        <div class="text-h6 q-mb-md">
            Items
        </div>
        <q-input label="Nuevo item" class="full-width q-mb-md" filled>
            <template v-slot:after>
                <q-btn round flat icon="send" color="accent" />
            </template>
        </q-input>
        <q-list bordered padding class="full-width q-mb-md">
            <div v-for="(item, i) in items" :key="i">
                <q-item>
                    <q-item-section>
                        <q-item-label>{{ item.title }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        <q-btn-group rounded flat>
                            <q-btn
                                flat
                                dense
                                round
                                :icon="item.active ? 'pause' : 'play_arrow'"
                                :color="item.active ? 'primary' : 'accent'"
                            />
                            <q-btn
                                flat
                                dense
                                round
                                icon="edit"
                                color="secundary"
                            />
                            <q-btn
                                flat
                                dense
                                round
                                icon="close"
                                color="red-7"
                            />
                        </q-btn-group>
                    </q-item-section>
                </q-item>
                <q-separator v-if="i + 1 < items.length" />
            </div>
        </q-list>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {
                    title: 'Hamburguesa clasica',
                    subtitle: 'Especial de la casa',
                    description:
                        'Deliciosa carne angus hecha a la parrilla, con cebolla, tomate, lechuga, salsa de la casa y pan artesanal.',
                    category: 'Hamburguesas',
                    pic: null,
                    availableDays: [5, 6],
                    price: 6.75,
                    active: true,
                },
                {
                    title: 'Hotdog Hawainano',
                    active: false,
                },
                {
                    title: 'Alitas',
                    active: true,
                },
            ],
        }
    },
}
</script>
