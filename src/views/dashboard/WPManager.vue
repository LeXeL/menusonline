<template>
    <q-page class="q-pa-md">
        <div class="row q-px-md">
            <div class="text-h5 mo-grey">Panama Hotdog</div>
        </div>
        <div class="row">
            <div class="col-lg-3 q-pa-md">
                <RestaurantGeneralInfo />
            </div>
            <div class="col-lg-6 q-pa-md">
                <RestaurantInputFields />
            </div>
            <div class="col-lg-3 q-pa-md">
                <iframe class="shadow-8 q-mb-md" src="/wp/panamahotdog" />
                <q-btn
                    label="Editar Menu"
                    color="accent"
                    class="full-width shadow-8"
                    @click="menuDialog = true"
                />
            </div>
        </div>
        <RestaurantMenuManager
            :display="menuDialog"
            @close-dialog="menuDialog = false"
        />
    </q-page>
</template>

<script>
import RestaurantGeneralInfo from '@/components/dashboard/wp-dashboard/RestaurantGeneralInfo'
import RestaurantInputFields from '@/components/dashboard/wp-dashboard/RestaurantInputFields'
import RestaurantMenuManager from '@/components/dashboard/wp-dashboard/RestaurantMenuManager'

export default {
    data() {
        return {
            menuDialog: false,
        }
    },
    components: {
        RestaurantGeneralInfo,
        RestaurantInputFields,
        RestaurantMenuManager,
    },
}
</script>

<style scoped>
iframe {
    border: solid 7px #2b2c31;
    border-radius: 20px;
    width: 100%;
    height: 720px;
}
</style>
