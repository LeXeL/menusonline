<template>
    <q-dialog v-model="alert">
        <q-card>
            <q-card-section>
                <i
                    class="fas fa-check full-width text-center"
                    style="font-size: 30px; color: #26a69a"
                    v-if="type == 'success'"
                ></i>
                <i
                    class="fas fa-times full-width text-center"
                    style="font-size: 50px; color: #e53935"
                    v-else-if="type == 'error'"
                ></i>
            </q-card-section>
            <q-card-section class="q-pt-none">
                <div class="text-h6 text-center">{{ title }}</div>
            </q-card-section>

            <q-card-section class="q-pt-none text-center">{{
                message
            }}</q-card-section>

            <q-card-section align="right">
                <q-btn flat @click="$emit('accept')" v-close-popup>
                    Aceptar</q-btn
                >
            </q-card-section>
            <!-- <q-card-section align="right">
                <q-btn flat label="Aceptar" style="width: auto" />
            </q-card-section> -->
        </q-card>
    </q-dialog>
</template>
<script>
export default {
    props: {
        display: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
        },
        message: {
            type: String,
        },
        type: {
            type: String,
        },
    },
    data() {
        return {
            alert: false,
        }
    },
    watch: {
        display: function() {
            this.alert = true
        },
    },
}
</script>
