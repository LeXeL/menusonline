<template>
    <div>
        <div class="text-h6 q-mb-md">
            Informacion general
        </div>
        <q-input label="Nombre" filled class="q-mb-md" />
        <q-input label="Subtitulo" filled class="q-mb-md" />
        <q-input
            label="Descripcion"
            filled
            class="q-mb-md"
            type="textarea"
            rows="4"
        />
        <q-select
            filled
            label="Categoria"
            class="q-mb-md"
            v-model="selectedCategory"
            :options="['option 1', 'option 2', 'option 3']"
        />
        <q-input label="Precio" filled class="q-mb-md" type="number" />
        <q-file
            filled
            label="Foto (opcional)"
            class="q-mb-md"
            v-model="uploadItemPic"
        >
            <template v-slot:prepend>
                <q-icon name="attach_file" />
            </template>
        </q-file>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedCategory: null,
            uploadItemPic: null,
        }
    },
}
</script>
