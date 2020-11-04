<template>
    <q-page class="q-pa-md">
        <div class="row q-px-md q-mb-md">
            <div class="text-h5 mo-grey">Facturacion</div>
            <!-- Restaurante Contacto Correo Plan Proxima facturacion Monto adeudado -->
        </div>
        <div class="row q-px-md">
            <q-table
                :data="data"
                :columns="columns"
                row-key="name"
                class="full-width"
                binary-state-sort
                :pagination="{rowsPerPage: 15}"
            >
                <template v-slot:body="props">
                    <q-tr :props="props">
                        <q-td key="restaurant" :props="props">{{
                            props.row.rest
                        }}</q-td>
                        <q-td key="contact" :props="props">{{
                            props.row.contact
                        }}</q-td>
                        <q-td key="email" :props="props">{{
                            props.row.email
                        }}</q-td>
                        <q-td key="plan" :props="props">{{
                            props.row.plan
                        }}</q-td>
                        <q-td key="status" :props="props">{{
                            props.row.isActive ? 'Activo' : 'Inactivo'
                        }}</q-td>
                        <q-td key="nextInvoice" :props="props">{{
                            props.row.nextInvoice
                        }}</q-td>
                        <q-td key="oweAmount" :props="props"
                            >$ {{ props.row.oweAmount.toFixed(2) }}</q-td
                        >
                    </q-tr>
                </template>
            </q-table>
        </div>
    </q-page>
</template>

<script>
export default {
    data() {
        return {
            data: [
                {
                    rest: 'test rest',
                    contact: 'pepe',
                    email: 'pepe@pepe.com',
                    plan: 'basico',
                    nextInvoice: '20-20-20',
                    oweAmount: 10,
                    isActive: true,
                },
            ],
            columns: [
                {
                    name: 'restaurant',
                    label: 'Restaurante',
                    align: 'left',
                    field: 'rest',
                    sortable: true,
                },
                {
                    name: 'contact',
                    label: 'Contacto',
                    align: 'left',
                    field: 'contact',
                    sortable: true,
                },
                {
                    name: 'email',
                    label: 'Correo',
                    align: 'left',
                    field: 'email',
                    sortable: true,
                },
                {
                    name: 'plan',
                    label: 'Plan',
                    align: 'left',
                    field: 'plan',
                    sortable: true,
                },
                {
                    name: 'status',
                    label: 'Estatus',
                    align: 'left',
                    field: 'isActive',
                },
                {
                    name: 'nextInvoice',
                    label: 'Proxima facturacion',
                    align: 'left',
                    field: 'nextInvoice',
                    sortable: true,
                },
                {
                    name: 'oweAmount',
                    label: 'Monto adeudado',
                    align: 'left',
                    field: 'oweAmount',
                    sortable: true,
                },
            ],
        }
    },
}
</script>
