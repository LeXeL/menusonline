<template>
    <q-dialog v-model="display" persistent>
        <q-card>
            <q-card-section class="q-pb-none">
                <div class="text-h6 text-center">
                    Cargando...
                </div>
            </q-card-section>
            <q-card-section>
                <div class="row justify-center">
                    <q-img
                        :src="require('@/assets/loading.gif')"
                        width="300px"
                        class="justify-center"
                    />
                </div>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    props: ['display'],
}
</script>
