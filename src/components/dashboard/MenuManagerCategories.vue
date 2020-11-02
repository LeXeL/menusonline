<template>
    <div>
        <div class="text-h6 q-mb-md">
            Categorias
        </div>
        <q-input
            label="Nueva categoria (ej. Entradas, Platos fuertes, Bebidas, etc.)"
            class="full-width q-mb-md"
            filled
        >
            <template v-slot:after>
                <q-btn round flat icon="send" color="accent" />
            </template>
        </q-input>
        <q-list bordered padding class="full-width q-mb-md">
            <div v-for="(category, i) in categories" :key="i">
                <q-item>
                    <q-item-section>
                        <q-item-label>{{ category }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        <q-btn flat dense round icon="close" color="red-7" />
                    </q-item-section>
                </q-item>
                <q-separator v-if="i + 1 < categories.length" />
            </div>
        </q-list>
    </div>
</template>

<script>
export default {
    data() {
        return {
            categories: ['Entradas', 'Hamburguesas', 'Bebidas'],
        }
    },
}
</script>
