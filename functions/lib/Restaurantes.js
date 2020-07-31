const admin = require('firebase-admin')
const db = admin.firestore()

async function createRestaurantes(restaurantes) {
    console.log('entra')
    return db
        .collection('Restaurantes')
        .doc()
        .set({
            restaurantName: restaurantes.name,
            email: restaurantes.email,
            phone: restaurantes.phone,
            url: restaurantes.url,
            logo: restaurantes.logo,
            splashColor: restaurantes.splashColor,
            splashButtonColor: restaurantes.splashButtonColor,
            menuBackgroundColor: restaurantes.menuBackgroundColor,
            activeMenu: '',
            menus: [],
        })
        .then(() => {
            return 'Succesfull'
        })
        .catch(error => {
            return error
        })
}
async function updateRestaurantes(id, Obj) {
    return db
        .collection('Restaurantes')
        .doc(id)
        .update(Obj)
        .then(() => {
            console.log('Document successfully written!')
            return 'Succesfull'
        })
        .catch(error => {
            console.error('Error writing document: ', error)
            return error
        })
}
async function deleteRestaurantes(id) {
    return db
        .collection('Restaurantes')
        .doc(id)
        .delete()
        .then(() => {
            console.log('Document successfully deleted!')
            return 'Succesfull'
        })
        .catch(error => {
            console.error('Error writing document: ', error)
            return error
        })
}
async function returnRestaurantById(id) {
    return db
        .collection('Restaurantes')
        .doc(id)
        .get()
        .then(doc => {
            return doc.data()
        })
        .catch(error => {
            console.error('Error writing document: ', error)
            return error
        })
}
async function returRestaurantActiveMenu(path) {
    let restaurantes = []
    let Menu = []
    await db
        .collection('Restaurantes')
        .where('url', '==', path)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                restaurantes.push(doc.data())
            })
        })
        .then(async () => {
            for (const restaurante of restaurantes) {
                await db
                    .collection('Menus')
                    .doc(restaurante.activeMenu)
                    .get()
                    .then(function(doc) {
                        Menu.push({
                            ...doc.data(),
                            id: doc.id,
                            restaurante: restaurante,
                        })
                    })
            }
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error)
        })
    return Menu
}
async function addMenuToRestaurantes(uid, itemObj) {
    return db
        .collection('Restaurantes')
        .doc(uid)
        .update({menus: admin.firestore.FieldValue.arrayUnion(itemObj)})
        .then(() => {
            console.log('Document successfully added!')
            return 'Succesfull'
        })
        .catch(error => {
            console.error('Error writing document: ', error)
            return error
        })
}
async function removeMenuToRestaurantes(uid, itemObj) {
    return db
        .collection('Restaurantes')
        .doc(uid)
        .update({menus: admin.firestore.FieldValue.arrayRemove(itemObj)})
        .then(() => {
            console.log('Document successfully removed!')
            return 'Succesfull'
        })
        .catch(error => {
            console.error('Error writing document: ', error)
            return error
        })
}

module.exports = {
    createRestaurantes,
    updateRestaurantes,
    deleteRestaurantes,
    returnRestaurantById,
    returRestaurantActiveMenu,
    addMenuToRestaurantes,
    removeMenuToRestaurantes,
}
