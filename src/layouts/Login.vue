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
            <q-input
                filled
                v-model="password"
                label="Password"
                type="password"
            />
        </q-card-section>

        <q-card-actions>
            <q-space />
            <q-btn flat @click="login">Iniciar sesion</q-btn>
        </q-card-actions>

        <q-card-section v-if="dismissCountDown > 0">
            <q-banner inline-actions rounded class="bg-red text-white">
                {{ errorMessage }}
                <template v-slot:action>
                    <q-btn flat @click="dismissCountDown = 0">
                        <i class="fas fa-times"></i>
                    </q-btn>
                </template>
            </q-banner>
        </q-card-section>
    </q-card>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
    name: 'Login',
    computed: {
        user() {
            return this.$store.getters.user
        },
        uid() {
            return this.$store.getters.uid
        },
    },
    data() {
        return {
            email: '',
            password: '',
            dismissSecs: 15,
            dismissCountDown: 0,
            errorMessage: '',
        }
    },
    methods: {
        async login() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(async () => {
                    let user = await firebase.auth().currentUser
                    await this.$store.dispatch('setCurrentUser', user)
                    this.$router.push('/admin/home')
                })
                .catch(error => {
                    this.dismissCountDown = this.dismissSecs
                    switch (error.code) {
                        case 'auth/user-disabled':
                            this.errorMessage =
                                'La cuenta esta deshabilitada por favor comunicarse con un administrador.'
                            break
                        case 'auth/user-not-found':
                            this.errorMessage =
                                'No se ha encontrado ese correo en nuestra base de datos por favor crea una cuenta.'
                            break
                        case 'auth/wrong-password':
                            this.errorMessage =
                                'El usuario o la contraseña está equivocado por favor revisar.'
                            break
                        case 'auth/invalid-email':
                            this.errorMessage =
                                'El usuario o la contraseña está equivocado por favor revisar.'
                            break
                        default:
                            this.errorMessage = error.message
                            break
                    }
                })
        },
    },
    mounted() {
        if (this.uid) this.$router.push('/admin/home')
    },
}
</script>

<style></style>
