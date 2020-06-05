<template>
    <div class="home">
        <input type="text" placeholder="Name" v-model="name" />
        <br />
        <input type="text" placeholder="Url" v-model="url" />
        <br />
        <button @click="Generate()">Generar</button>
        <div id="qrcode"></div>
        <div v-for="(element, index) in queue" :key="index">
            <pdfembeded :url="element.url"></pdfembeded>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import pdfembeded from '@/components/pdfembeded.vue'
import QRCode from 'easyqrcodejs'

export default {
    name: 'Home',
    components: {
        pdfembeded,
    },
    data() {
        return {
            queue: [],
            url: 'http://demplays.com/Beginningchords.pdf',
            name: 'chrods',
        }
    },
    methods: {
        Generate() {
            var options = {
                text: this.url,
            }
            var qrcode = new QRCode(document.getElementById('qrcode'), options)

            this.queue.push({name: this.name, url: this.url})
        },
    },
}
</script>
