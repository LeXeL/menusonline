const admin = require('firebase-admin')
const db = admin.firestore()

async function createRestaurant(restaurant) {
    return db
        .collection('Restaurants')
        .doc()
        .set({
            restaurantName: restaurant.restaurantName,
            email: restaurant.email,
            phone: restaurant.phone,
            type: restaurant.type,
            url: restaurant.url,
            logo: restaurant.logo,
            active: true,
            // splashColor: restaurantes.splashColor,
            // splashButtonColor: restaurantes.splashButtonColor,
            // menuBackgroundColor: restaurantes.menuBackgroundColor,
            // activeMenu: '',
            //vmenus: [],
            // falta funcionalidad para pausar alguien que no paga
        })
        .then(() => {
            return 'Succesfull'
        })
        .catch(error => {
            return error
        })
}
async function updateRestaurant(id, Obj) {
    console.log(Obj)
    return db
        .collection('Restaurants')
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
async function deleteRestaurant(id) {
    return db
        .collection('Restaurants')
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
        .collection('Restaurants')
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
module.exports = {
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    returnRestaurantById,
}
