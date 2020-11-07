<template>
    <q-layout view="hHh lpR lFr">
        <q-header elevated>
            <q-toolbar class="bg-secondary text-white">
                <q-btn
                    flat
                    dense
                    round
                    @click="leftDrawerOpen = !leftDrawerOpen"
                    aria-label="Menu"
                    icon="menu"
                />
                <q-toolbar-title>MiMenuDigital</q-toolbar-title>
                <q-btn flat round dense icon="logout" @click="logout()" />
            </q-toolbar>
        </q-header>
        <q-drawer
            v-model="leftDrawerOpen"
            show-if-above
            bordered
            content-class="bg-primary text-white"
            elevated
        >
            <q-list>
                <q-item-label header class="text-white">Menu</q-item-label>
                <q-item
                    clickable
                    tag="a"
                    :to="link.link"
                    class="text-white"
                    v-for="(link, i) in drawerLinks"
                    :key="i"
                >
                    <q-item-section avatar>
                        <q-icon :name="link.icon" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{ link.text }}</q-item-label>
                        <q-item-label caption>{{ link.caption }}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-drawer>

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
            drawerLinks: [
                {
                    text: 'Inicio',
                    caption: '',
                    link: '/admin/home',
                    icon: 'home',
                },
                {
                    text: 'Restaurantes',
                    caption: '',
                    link: '/admin/restaurants',
                    icon: 'store',
                },
                {
                    text: 'Facturacion',
                    caption: '',
                    link: '/admin/invoicing',
                    icon: 'receipt_long',
                },
            ],
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
