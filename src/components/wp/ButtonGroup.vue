<template>
    <div class="row q-mb-md">
        <div class="text-subtitle2 poppins-bold q-mb-sm">
            {{ label }}: <span v-if="isRequired">*</span>
        </div>
        <q-btn-toggle
            spread
            all-caps
            class="poppins-bold full-width"
            :toggle-color="accentColor"
            color="white"
            text-color="black"
            :options="paymentMethods"
            
        />
    </div>
</template>

<script>
export default {
    props: ['label', 'options', 'isRequired', 'accentColor'],
    data() {
        return {
            paymentMethods: [
                {label: 'Yappy', value: 'Yappy'},
                {label: 'Efectivo', value: 'Efectivo'},
                {label: 'Tarjeta', value: 'Tarjeta'},
            ]
        }
        
    }
}
</script>