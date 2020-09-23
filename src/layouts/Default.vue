<template>
    <q-layout view="hHh lpR lFr">
        <q-header>
            <q-toolbar class="bg-white text-black">
                <q-toolbar-title>Menus Online</q-toolbar-title>
                <q-btn flat round dense icon="logout" @click="logout()" />
            </q-toolbar>
        </q-header>
        <!-- <q-drawer show-if-above :width="300" :breakpoint="400" class="mo-grey">
            <q-scroll-area style="height: calc(100% - 150px); ">
                <q-list padding>
                    <q-item clickable v-ripple to="/restaurants">
                        <q-item-section avatar>
                            <i class="fas fa-utensils"></i>
                        </q-item-section>
                        <q-item-section>Restaurantes</q-item-section>
                    </q-item>
                </q-list>
            </q-scroll-area>
        </q-drawer>-->

        <q-page-container class="bg-grey-11">
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
    name: 'LayoutDefault',

    data() {
        return {
            leftDrawerOpen: false,
        }
    },
    methods: {
        async logout() {
            firebase
                .auth()
                .signOut()
                .then(async () => {
                    await this.$store.dispatch('UserLogout')
                    this.$router.push('/login/login')
                })
                .catch(error => {
                    console.log(error)
                })
        },
    },
}
</script>

<style>
.mo-grey {
    color: #333;
}
</style>
