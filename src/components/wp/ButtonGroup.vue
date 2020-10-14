<template>
    <div class="row q-mb-md">
        <div class="text-subtitle2 poppins-bold q-mb-sm">
            {{ label }}: <span v-if="isRequired">*</span>
        </div>
        <q-btn-toggle
            v-model="value"
            spread
            all-caps
            class="poppins-bold full-width"
            :toggle-color="accentColor"
            color="white"
            text-color="black"
            :options="options"
            
        />
    </div>
</template>

<script>
export default {
    props: ['label', 'options', 'isRequired', 'accentColor', 'index'],
    data() {
        return {
            value: ''
        }
    },
    watch: {
        value: function() {
            this.$emit('update-value', {value: this.value, index: this.index})
        }
    }
}
</script>