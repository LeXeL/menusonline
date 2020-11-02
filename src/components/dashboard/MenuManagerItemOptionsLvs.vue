<template>
    <div style="height: 700px; overflow-y: scroll">
        <q-card v-for="(option, i) in options" :key="i" class="q-mb-md">
            <q-card-section
                ><q-toggle
                    v-model="option.enabled"
                    checked-icon="check"
                    color="primary"
                    unchecked-icon="clear"
                    :label="option.title"
                    class="q-mb-sm"
                />
                <q-input
                    type="number"
                    label="Precio"
                    filled
                    v-model="option.price"
                    dense
                    :disable="!option.enabled"
                />
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            third: false,
            options: [
                {
                    title: 'Papas Fritas',
                    enabled: true,
                    price: '',
                },
                {
                    title: 'Aros de cebolla',
                    enabled: true,
                    price: '',
                },
                {
                    title: 'Salsa BBQ',
                    enabled: false,
                    price: '',
                },
                {
                    title: 'Salsa Buffalo',
                    enabled: false,
                    price: '',
                },
                {
                    title: 'Salsa Ranch',
                    enabled: false,
                    price: '',
                },
            ],
        }
    },
}
</script>
