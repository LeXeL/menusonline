<template>
    <q-card
        flat
        bordered
        class="bg-grey-1 absolute-center"
        style="width: 400px;"
    >
        <q-card-section>
            <div class="row">
                <div class="col">
                    <div class="text-h6">Login</div>
                </div>
            </div>
        </q-card-section>

        <q-card-section>
            <q-input filled v-model="email" label="Email" class="q-mb-md" />
            <q-input filled v-model="password" label="Password" />
        </q-card-section>

        <q-card-actions>
            <q-space />
            <q-btn flat>Iniciar sesion</q-btn>
        </q-card-actions>
    </q-card>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
        }
    },
}
</script>
