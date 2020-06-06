<template>
    <q-page class="q-pa-md">
        <q-btn
            class="q-mt-md q-mb-md"
            color="primary"
            label="Nuevo"
            @click="newRestaurantFormPrompt = true"
        />
        <div id="home">
            <!-- <input type="text" placeholder="Name" v-model="name" />
        <br />
        <input type="text" placeholder="Url" v-model="url" />
        <br />
        <button @click="Generate()">Generar</button>
        <div id="qrcode"></div>
        <div v-for="(element, index) in queue" :key="index">
            <pdfembeded :url="element.url"></pdfembeded>
            </div>-->
        </div>
        <div>
            <div class="row">
                <div class="col">
                    <div class="text-h6">Restaurante</div>
                </div>
                <div class="col">
                    <div class="text-h6">Ver QR</div>
                </div>
                <div class="col">
                    <div class="text-h6">Ver PDF</div>
                </div>
                <div class="col">
                    <div class="text-h6">Actualizar PDF</div>
                </div>
            </div>
            <div class="row q-mt-md" v-for="(rest, i) in subscribedRestaurants" :key="i">
                <div class="col">
                    <p>{{rest.restaurantName}}</p>
                </div>
                <div class="col">
                    <q-btn round color="purple" glossy @click="CreateQrCode(rest.id)">
                        <i class="fas fa-qrcode"></i>
                    </q-btn>
                    <div ref="qrcode"></div>
                </div>
                <div class="col">
                    <q-btn @click="openMenu(rest.menuUrl)" to round color="secondary" glossy>
                        <i class="fas fa-file-pdf"></i>
                    </q-btn>
                </div>
                <div class="col">
                    <q-btn round color="amber" glossy @click="openEditModel(rest.id)">
                        <i class="fas fa-edit"></i>
                    </q-btn>
                </div>
            </div>
        </div>
        <q-dialog v-model="newRestaurantFormPrompt">
            <q-card style="min-width: 350px">
                <q-card-section>
                    <div class="text-h6">Agregar restaurante</div>
                    <div class="text-h6">Actualizar menu</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-input
                        type="text"
                        label="Nombre"
                        class="q-mb-md"
                        autofocus
                        v-model="restaurantName"
                    />
                    <q-toggle v-model="qrLogo" label="Logo en QR" class="q-mb-md" />

                    <q-file
                        v-if="qrLogo"
                        outlined
                        v-model="logo"
                        label="Logo de restaurante"
                        class="q-mb-md"
                    >
                        <template v-slot:prepend>
                            <i class="fas fa-paperclip"></i>
                        </template>
                    </q-file>

                    <q-file outlined multiple v-model="files" label="Menu de restaurante">
                        <template v-slot:prepend>
                            <i class="fas fa-paperclip"></i>
                        </template>
                    </q-file>
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancel" v-close-popup />
                    <q-btn @click="Generate()" flat label="Guardar" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-dialog v-model="editRestaurantFormPrompt">
            <q-card style="min-width: 350px">
                <q-card-section>
                    <div class="text-h6">Editar Menu de restaurante</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-file outlined multiple v-model="files" label="Menu de restaurante">
                        <template v-slot:prepend>
                            <i class="fas fa-paperclip"></i>
                        </template>
                    </q-file>
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancel" v-close-popup />
                    <q-btn @click="editRestaurantPdf()" flat label="Guardar" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-dialog v-model="qrAlert">
            <q-card>
                <q-card-section>
                    <div class="text-h6">Nombre del restaurante</div>
                </q-card-section>

                <q-card-section class="q-pt-none"></q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="OK" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
// @ is an alias to /src
import QRCode from 'easyqrcodejs'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

export default {
    name: 'Home',

    data() {
        return {
            subscribedRestaurants: [],
            restaurantName: '',
            qrAlert: false,
            newRestaurantFormPrompt: false,
            editRestaurantFormPrompt: false,
            editId: '',
            logo: '',
            qrLogo: false,
            files: '',
        }
    },
    mounted() {
        let db = firebase.firestore()
        let restRef = db
            .collection('Restaurantes')
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    let obj = doc.data()
                    obj.id = doc.id
                    this.subscribedRestaurants.push(obj)
                })
            })
            .catch(err => {
                console.log('Error getting documents', err)
            })
    },
    methods: {
        openMenu(url) {
            window.open(url, '_blank')
            var storage = firebase.storage().ref('menus/' + this.menu.name)
        },
        CreateQrCode(id) {
            new QRCode(document.getElementById('home'), {
                text: `https://menusonline-f988f.web.app/menu/${id}`,
            })
        },
        openEditModel(id) {
            this.editRestaurantFormPrompt = true
            this.editId = id
        },
        uploadToFirebase(imageFile, fullDirectory, filename) {
            return new Promise(function(resolve, reject) {
                var storageRef = firebase
                    .storage()
                    .ref(fullDirectory + '/' + filename)

                //Upload file
                var task = storageRef.put(imageFile)

                //Update progress bar
                task.on(
                    'state_changed',
                    function(snapshot) {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        var progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100
                        console.log('Upload is ' + progress + '% done')
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED: // or 'paused'
                                console.log('Upload is paused')
                                break
                        }
                    },
                    function(error) {
                        // Handle unsuccessful uploads
                        console.log(`Error in uploadToFirebase: ${error}`)
                        reject(error)
                    },
                    function() {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        task.snapshot.ref
                            .getDownloadURL()
                            .then(function(downloadURL) {
                                console.log('File available at', downloadURL)
                                resolve(downloadURL)
                            })
                    }
                )
            })
        },
        editRestaurantPdf() {
            var storage = firebase.storage().ref('menus/' + this.menu)
            var upload = storage.put(this.menu)
            upload.on(
                firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                function(snapshot) {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    console.log('Upload is ' + progress + '% done')
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused')
                            break
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running')
                            break
                    }
                },
                async () => {
                    let db = firebase.firestore()
                    let menuUrl = await upload.snapshot.ref
                        .getDownloadURL()
                        .then(downloadURL => {
                            return downloadURL
                        })
                    db.collection('Restaurantes')
                        .doc(this.editId)
                        .update({
                            menuUrl: menuUrl,
                        })
                }
            )
        },
        async Generate() {
            let listOfUploadedFiles = []
            let db = firebase.firestore()
            for (const file of this.files) {
                await this.uploadToFirebase(
                    file,
                    `menus/${this.restaurantName}`,
                    file.name
                )
                    .then(filename => {
                        listOfUploadedFiles.push(filename)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            console.log(listOfUploadedFiles)
            db.collection('Restaurantes')
                .add({
                    restaurantName: this.restaurantName,
                    menus: listOfUploadedFiles,
                })
                .then(async ref => {
                    console.log('Added document with ID: ', ref.id)
                    // db.collection('Restaurantes')
                    //     .doc(ref.id)
                    //     .add({qrSrc: src})
                })
                .catch(error => {
                    console.log(`Error: ${error}`)
                })
        },
    },
}
</script>
