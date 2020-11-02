<template>
    <div>
        <div class="text-h6 q-mb-md">
            Opciones
        </div>
        <q-input
            label="Nueva opcion (ej. Papas fritas, Aros de cebolla, etc.)"
            class="full-width q-mb-md"
            filled
        >
            <template v-slot:after>
                <q-btn round flat icon="send" color="accent" />
            </template>
        </q-input>
        <q-list bordered padding class="full-width q-mb-md">
            <div v-for="(option, i) in options" :key="i">
                <q-item>
                    <q-item-section>
                        <q-item-label>{{ option.title }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        <q-btn-group rounded flat>
                            <q-btn
                                flat
                                dense
                                round
                                :icon="option.active ? 'pause' : 'play_arrow'"
                                :color="option.active ? 'primary' : 'accent'"
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
                <q-separator v-if="i + 1 < options.length" />
            </div>
        </q-list>
    </div>
</template>

<script>
export default {
    data() {
        return {
            options: [
                {
                    title: 'Papas fritas',
                    active: true,
                },
                {
                    title: 'Aros de cebolla',
                    active: false,
                },
                {
                    title: 'Salsa Ranch',
                    active: true,
                },
            ],
        }
    },
}
</script>
