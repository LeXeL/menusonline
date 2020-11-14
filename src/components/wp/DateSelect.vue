<template>
    <div class="row q-mb-md">
        <div class="text-subtitle2 poppins-bold q-mb-sm">
            {{ label }}: <span v-if="isRequired">*</span>
        </div>
        <q-btn icon="event" class="full-width" :label="date ? date : 'Seleccione'" :color="date ? accentColor : 'grey-2'" :text-color="date ? 'white' : 'grey-10'">
          <q-popup-proxy @before-show="updateProxy" transition-show="scale" transition-hide="scale">
            <q-date v-model="proxyDate" :color="accentColor">
              <div class="row items-center justify-end q-gutter-sm">
                <q-btn label="Cancelar" :color="accentColor" flat v-close-popup />
                <q-btn label="OK" :color="accentColor" flat @click="save" v-close-popup />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-btn>
    </div>
</template>

<script>
export default {
    props: ['label', 'isRequired', 'accentColor', 'index'],
    data() {
        return {
            date: '',
            proxyDate: ''
        }
    },
    methods: {
    updateProxy () {
      this.proxyDate = this.date
    },

    save () {
      this.date = this.proxyDate
    }
  },
    watch: {
        date: function() {
            this.$emit('update-value', {value: this.date, index: this.index})
        }
    }
}
</script>