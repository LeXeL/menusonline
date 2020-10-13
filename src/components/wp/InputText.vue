<template>
    <div class="row q-mb-md">
        <div class="text-subtitle2 poppins-bold q-mb-sm">
            {{ label }}: <span v-if="isRequired">*</span>
        </div>
        <q-input
            v-model="value"
            filled
            dark
            type="text"
            class="full-width poppins-regular"
            :placeholder="placeholder"
            :color="accentColor"
            data-hj-allow
        />
    </div>
</template>

<script>
export default {
    props: ['label', 'placeholder', 'isRequired', 'accentColor', 'index'],
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