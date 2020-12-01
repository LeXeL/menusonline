<template>
    <q-layout view="hHh lpR lFr">
        <q-page-container class="bg-grey-4">
            <div class="row">
                <div class="col desktop-only"></div>
                <div class="col-lg-3 col-md-3 col-sm-4 shadow-10 full-width">
                    <router-view />
                    <footer :style="displayFooter ? 'margin-bottom:67px' : ''">
                        <div class="container">
                            <div class="row text-center">
                                <div class="col">
                                    <a
                                        href="https://www.instagram.com/blueballoon.io/"
                                    >
                                        <q-img
                                            :src="
                                                require('@/assets/landing/logo_grey.png')
                                            "
                                            style="width: 150px;"
                                        />
                                    </a>

                                    <p>Powered By a BlueBalloon Inc.</p>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
                <div class="col desktop-only"></div>
            </div>
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
