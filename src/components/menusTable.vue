<template>
    <q-table
        :data="data"
        :columns="columns"
        row-key="name"
        binary-state-sort
        :pagination="{rowsPerPage: 15}"
    >
        <template v-slot:body="props">
            <q-tr :props="props">
                <q-td key="menu" :props="props">{{ props.row.menuName }}</q-td>
                <q-td key="active" :props="props">
                    <q-badge color="secondary" class="q-py-xs" v-if="props.row.status === 'active'">
                        <i class="fas fa-check"></i>
                    </q-badge>
                </q-td>
                <q-td key="select" :props="props">
                    <q-btn
                        size="sm"
                        color="secondary"
                        @click="$emit('changeActive',{id:props.row.id})"
                    >Activar</q-btn>
                </q-td>
                <q-td key="ver" :props="props">
                    <q-btn size="sm" color="info" :to="`/menu-details/${props.row.id}`">
                        <i class="fas fa-info"></i>
                    </q-btn>
                </q-td>
                <q-td key="delete" :props="props">
                    <q-btn
                        color="red-7"
                        size="xs"
                        label="Eliminar"
                        @click="$emit('delete',{id:props.row.id})"
                    />
                </q-td>
            </q-tr>
        </template>
    </q-table>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            columns: [
                {
                    name: 'menu',
                    required: true,
                    label: 'Menu',
                    align: 'left',
                    field: 'menu',
                    sortable: true,
                },
                {
                    name: 'active',
                    align: 'left',
                    label: 'Activo',
                    field: 'active',
                    sortable: true,
                },
                {
                    name: 'select',
                    align: 'left',
                    label: 'Seleccionar',
                    field: 'select',
                    sortable: true,
                },
                {
                    name: 'ver',
                    align: 'left',
                    label: 'Ver',
                    field: 'ver',
                    sortable: true,
                },
                {
                    name: 'delete',
                    label: 'Eliminar',
                    align: 'left',
                    field: 'delete',
                },
            ],
        }
    },
}
</script>