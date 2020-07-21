<template>
    <q-page class="q-pa-md">
        <loading-alert :display="displayLoading"></loading-alert>
        <brewthers-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
        ></brewthers-alert>
        <div class="row">
            <div class="text-h5">{{menuInfo ? menuInfo.menuName : ''}}</div>
        </div>
        <div class="row" v-if="Object.keys(menuInfo).length != 0">
            <div class="col-lg-9 q-pa-md">
                <q-carousel
                    v-model="slide"
                    transition-prev="slide-right"
                    transition-next="slide-left"
                    animated
                    control-color="primary"
                    navigation
                    padding
                    arrows
                    height="auto"
                    class="bg-grey-1 shadow-2 rounded-borders full-width"
                >
                    <q-carousel-slide
                        :name="index"
                        class="column no-wrap"
                        v-for="(images, index) in calculatePage(menuInfo.images)"
                        :key="index"
                    >
                        <div
                            class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
                            v-if="menuInfo.images.length > 1"
                        >
                            <div class="col-4" v-for="(image,index) in images" :key="index">
                                <q-img
                                    class="rounded-borders full-height"
                                    :src="
                                        image.url
                                    "
                                />
                                <div class="text-subtitle1 text-center q-mt-sm">{{image.name}}</div>
                            </div>
                        </div>
                        <div
                            class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
                            v-if="menuInfo.images.length === 0"
                        >
                            <div class="col-4" v-for="(image,index) in 3" :key="index">
                                <q-img
                                    class="rounded-borders full-height"
                                    :src="
                                        require('@/assets/empty-menu.jpg')
                                    "
                                />
                                <div class="text-subtitle1 text-center q-mt-sm">{{image.name}}</div>
                            </div>
                        </div>
                    </q-carousel-slide>
                </q-carousel>
            </div>
            <div class="col-lg-3 q-pa-md">
                <q-card class="q-mb-md">
                    <q-card-section>
                        <q-file multiple filled label="Seleccione imagen" v-model="files">
                            <template v-slot:after>
                                <q-btn round dense color="secondary" @click="uploadMenus">
                                    <i class="fas fa-paper-plane"></i>
                                </q-btn>
                            </template>
                        </q-file>
                    </q-card-section>
                </q-card>
                <draggable
                    class="list-group"
                    tag="ul"
                    v-model="list"
                    v-if="menuInfo.images"
                    v-bind="dragOptions"
                >
                    <transition-group type="transition" name="flip-list">
                        <li class="list-group-item" v-for="element in list" :key="element.order">
                            {{ element.name }}
                            <q-btn
                                color="red-7"
                                size="xs"
                                style="float:right"
                                @click="removeFromList(element.order)"
                            >
                                <i class="fas fa-times"></i>
                            </q-btn>
                        </li>
                    </transition-group>
                </draggable>
                <q-btn
                    color="secondary"
                    label="Guardar"
                    style="float: right"
                    @click="updateNewOrderList"
                ></q-btn>
            </div>
        </div>
        <div class="row q-pa-md"></div>
    </q-page>
</template>

<script>
import draggable from 'vuedraggable'
import * as api from '@/api/api'

import firebase from 'firebase/app'
import 'firebase/storage'

export default {
    components: {
        draggable,
    },
    data() {
        return {
            slide: 0,
            menuId: '',
            restaurantInfo: [],
            menuInfo: [],
            files: [],
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            list: '',
        }
    },
    computed: {
        dragOptions() {
            return {
                animation: 0,
                group: 'description',
                disabled: false,
                ghostClass: 'ghost',
            }
        },
    },
    methods: {
        clear() {
            this.files = []
        },
        removeFromList(order) {
            this.list.forEach((d, index) => {
                if (d.order === order) {
                    this.list.splice(index, 1)
                }
            })
        },
        updateNewOrderList() {
            this.displayLoading = true
            api.updateMenusInformation({
                id: this.menuId,
                Menus: {images: this.list},
            })
                .then(response => {
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage = 'Se ha subido con exito las imagenes'
                    this.alertType = 'success'
                    this.displayAlert = true
                })
                .catch(error => {
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage = error
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
        calculatePage(images) {
            let finalArray = []
            let tmp = []
            images.forEach((image, index) => {
                tmp.push(image)
                // console.log(`index: ${index} tiene ${JSON.stringify(tmp)}`)
                if (((index + 1) / 3) % 1 === 0) {
                    finalArray.push(tmp)
                    tmp = []
                }
            })
            if (tmp.length > 0) finalArray.push(tmp)
            if (finalArray.length === 0) finalArray.push([1, 2, 3])
            return finalArray
        },
        async uploadMenus() {
            this.displayLoading = true
            let listOfUploadedFiles = []
            let db = firebase.firestore()
            for (const file of this.files) {
                await this.uploadToFirebase(
                    file,
                    `menus/${this.restaurantInfo.restaurantName}`,
                    file.name
                )
                    .then(filename => {
                        listOfUploadedFiles.push({
                            url: filename,
                            name: file.name,
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            api.updateMenusInformation({
                id: this.menuId,
                Menus: {images: listOfUploadedFiles},
            })
                .then(response => {
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage = 'Se ha subido con exito las imagenes'
                    this.alertType = 'success'
                    this.displayAlert = true
                    this.clear()
                })
                .catch(error => {
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage = error
                    this.alertType = 'error'
                    this.displayAlert = true
                })
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
        addToData(id, data) {
            data.id = id
            this.menuInfo = data
        },
    },
    async mounted() {
        this.menuId = this.$route.params.id
        let db = firebase.firestore()
        await db
            .collection('Menus')
            .doc(this.menuId)
            .onSnapshot(
                {
                    includeMetadataChanges: true,
                },
                doc => {
                    api.returnRestaurantById({
                        id: doc.data().restaurant,
                    }).then(response => {
                        this.restaurantInfo = response.data.data
                    })
                    this.addToData(doc.id, doc.data())
                    this.list = this.menuInfo.images.map((name, index) => {
                        return {
                            name: name.name,
                            order: index + 1,
                            url: name.url,
                        }
                    })
                }
            )
    },
}
</script>

<style>
.button {
    margin-top: 35px;
}
.flip-list-move {
    transition: transform 0.5s;
}
.no-move {
    transition: transform 0s;
}
.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}
.list-group {
    min-height: 20px;
    padding-left: 0;
    border: solid 1px rgba(0, 0, 0, 0.12);
}
.list-group-item {
    cursor: move;
    padding: 15px;
    list-style-type: none;
}
</style>
