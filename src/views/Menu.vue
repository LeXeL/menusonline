<template>
    <div id="menu"></div>
</template>

<script>
import PDFObject from 'pdfobject'
export default {
    mounted() {
        PDFObject.embed(this.url, '#menu')
    },
}
</script>

<style scoped>
.pdfobject-container {
    height: 30rem;
    border: 1rem solid rgba(0, 0, 0, 0.1);
}
</style>