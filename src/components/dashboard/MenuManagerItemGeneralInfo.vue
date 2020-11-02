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
        <div class="text-body2">
            Dias disponibles
        </div>
        <q-option-group
            :options="weekDays"
            type="checkbox"
            class="q-mb-md"
            v-model="selectedDays"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedCategory: null,
            uploadItemPic: null,
            weekDays: [
                {
                    label: 'Lunes',
                    value: 0,
                },
                {
                    label: 'Martes',
                    value: 1,
                },
                {
                    label: 'Miercoles',
                    value: 2,
                },
                {
                    label: 'Jueves',
                    value: 3,
                },
                {
                    label: 'Viernes',
                    value: 4,
                },
                {
                    label: 'Sabado',
                    value: 5,
                },
                {
                    label: 'Domingo',
                    value: 6,
                },
            ],
            selectedDays: [0, 1, 2, 3, 4, 5, 6],
        }
    },
}
</script>
