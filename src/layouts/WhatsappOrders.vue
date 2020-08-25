<template>
    <q-layout view="hHh lpR lFr">
        <q-page-container>
            <router-view />
            <footer>
                <div class="container">
                    <div class="row text-center">
                        <div class="col">
                            <q-img
                                :src="require('@/assets/landing/logo_grey.png')"
                                style="width: 150px;"
                                @click="$router.push('/')"
                            />

                            <p>Powered By BlueBalloon Inc.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </q-page-container>
    </q-layout>
</template>