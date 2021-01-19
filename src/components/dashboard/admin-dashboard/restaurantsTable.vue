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
                <q-td key="name" :props="props">{{
                    props.row.restaurantName
                }}</q-td>
                <q-td key="email" :props="props">{{ props.row.email }}</q-td>
                <q-td key="phone" :props="props">{{ props.row.phone }}</q-td>
                <q-td key="type" :props="props">{{ props.row.type }}</q-td>
                <q-td key="plan" :props="props">{{ props.row.plan }}</q-td>
                <q-td key="url" :props="props">/{{ props.row.url }}</q-td>
                <q-td>
                    <q-btn-group>
                        <q-btn
                            color="accent"
                            icon="menu_book"
                            size="sm"
                            flat
                            :to="
                                props.row.type === 'Whatsapp Pedidos'
                                    ? `/admin/restaurants/${props.row.id}`
                                    : `/menus/${props.row.id}`
                            "
                        />
                        <q-btn
                            :color="props.row.active ? 'red-7' : 'green-8'"
                            :icon="props.row.active ? 'pause' : 'play_arrow'"
                            size="sm"
                            flat
                            @click="
                                toggleActive(props.row.id, props.row.active)
                            "
                        />
                        <q-btn
                            color="yellow-8"
                            icon="qr_code"
                            size="sm"
                            flat
                            @click="$emit('showQrCode', props.row)"
                            :disable="props.row.type == 'Whatsapp Pedidos'"
                        />
                        <q-btn color="info" icon="edit" size="sm" flat />
                    </q-btn-group>
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
                    name: 'name',
                    required: true,
                    label: 'Nombre',
                    align: 'left',
                    field: 'name',
                    sortable: true,
                },
                {
                    name: 'email',
                    align: 'left',
                    label: 'Correo',
                    field: 'email',
                    sortable: true,
                },
                {
                    name: 'phone',
                    align: 'left',
                    label: 'Numero',
                    field: 'phone',
                    sortable: true,
                },
                {
                    name: 'type',
                    align: 'left',
                    label: 'Tipo',
                    field: 'type',
                    sortable: true,
                },
                {
                    name: 'plan',
                    align: 'left',
                    label: 'Plan',
                    field: 'plan',
                    sortable: true,
                },
                {
                    name: 'url',
                    align: 'left',
                    label: 'URL',
                    field: 'path',
                    sortable: true,
                },
                {
                    name: 'actions',
                    align: 'left',
                    label: 'Acciones',
                },
            ],
        }
    },
    methods: {
        toggleActive(id, active) {
            this.$emit('activeToggle', {id, active: !active})
        },
    },
}
</script>
