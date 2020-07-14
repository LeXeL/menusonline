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
async function returnAllRestaurantes() {
    let Restaurantes = []
    await db
        .collection('Restaurantes')
        .where('status', '==', 'active')
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.')
                return
            }
            snapshot.forEach(doc => {
                Restaurantes.push({...doc.data(), id: doc.id})
            })
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error)
        })
    return Restaurantes
}

module.exports = {
    createRestaurantes,
    updateRestaurantes,
    deleteRestaurantes,
    returnAllRestaurantes,
}
