<template>
    <q-layout view="hHh lpR lFr">
        <q-page-container>
            <router-view />
            <footer :style="displayFooter ? 'margin-bottom:67px':''">
                <div class="container">
                    <div class="row text-center">
                        <div class="col">
                            <q-img
                                :src="require('@/assets/landing/logo_grey.png')"
                                style="width: 150px;"
                                @click="$router.push('https://www.instagram.com/blueballoon.io/')"
                            />

                            <p>Powered By a BlueBalloon Inc.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </q-page-container>
    </q-layout>
</template>
<script>
export default {
    computed: {
        displayFooter() {
            return this.$store.getters.displayFooter
        },
    },
}
</script>
