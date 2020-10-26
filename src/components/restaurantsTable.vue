<template>
    <q-table
        :data="tableData"
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
                            icon="edit"
                            size="sm"
                            flat
                            :to="`/admin/restaurants/${props.row.uid}`"
                        />
                        <q-btn
                            :color="props.row.active ? 'red-7' : 'green-8'"
                            :icon="props.row.active ? 'pause' : 'play_arrow'"
                            size="sm"
                            flat
                        />
                        <q-btn
                            color="yellow-8"
                            icon="qr_code"
                            size="sm"
                            flat
                            @click="$emit('showQrCode', props.row)"
                            :disable="props.row.type == 'Whatsapp Pedidos'"
                        />
                    </q-btn-group>
                </q-td>
                <!-- <q-td key="qr" :props="props">
                    <q-btn
                        size="sm"
                        color="warning"
                        @click="$emit('showQrCode', props.row)"
                    >
                        <i class="fas fa-qrcode"></i>
                    </q-btn>
                </q-td> -->
                <!-- <q-td key="details" :props="props">
                    <q-btn
                        size="sm"
                        color="info"
                        :to="`/menus/${props.row.id}`"
                    >
                        <i class="fas fa-info"></i>
                    </q-btn>
                </q-td> -->
                <!-- <q-td key="delete" :props="props">
                    <q-btn
                        color="red-7"
                        size="xs"
                        label="Eliminar"
                        @click="$emit('delete', {id: props.row.id})"
                    />
                </q-td> -->
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
            tableData: [
                {
                    uid: 'rest-uid',
                    restaurantName: 'Panama Hotdog',
                    email: 'panamahotdogoficial@gmail.com',
                    phone: '65656565',
                    type: 'Whatsapp Pedidos',
                    plan: 'Avanzado',
                    url: 'panamahotdog',
                    active: true,
                },
                {
                    uid: 'rest-uid',
                    restaurantName: 'Angel',
                    email: 'rest_angel@gmail.com',
                    phone: '65656565',
                    type: 'Carta Digital',
                    plan: 'Carta Digital',
                    url: 'angel',
                    active: true,
                },
                {
                    uid: 'rest-uid',
                    restaurantName: 'Bigg Five Foods',
                    email: 'biggfive@gmail.com',
                    phone: '65656565',
                    type: 'Whatsapp Pedidos',
                    plan: 'Basico',
                    url: 'biggfive',
                    active: false,
                },
            ],
        }
    },
}
</script>
