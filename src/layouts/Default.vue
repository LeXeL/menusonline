<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated class="glossy">
            <q-toolbar>
                <q-toolbar-title>Menus Online</q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
export default {
    name: 'LayoutDefault',

    data() {
        return {
            leftDrawerOpen: false,
        }
    },
}
</script>
