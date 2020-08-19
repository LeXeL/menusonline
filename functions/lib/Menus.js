const admin = require('firebase-admin')
const db = admin.firestore()

async function createMenu(Menu, restaurant) {
    return db
        .collection('Menus')
        .doc()
        .set({
            menuName: Menu,
            restaurant: restaurant,
            images: [],
            status: 'inactive',
        })
        .then(() => {
            return 'Succesfull'
        })
        .catch(error => {
            return error
        })
}
async function updateMenus(id, Obj) {
    return db
        .collection('Menus')
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
async function deleteMenus(id) {
    return db
        .collection('Menus')
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
async function returnMenuById(id) {
    return db
        .collection('Menus')
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
async function returnAllMenusByRestaurantId(restaurantId) {
    let Menu = []
    await db
        .collection('Menus')
        .where('restaurant', '==', restaurantId)
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.')
                return
            }
            snapshot.forEach(doc => {
                Menu.push({...doc.data(), id: doc.id})
            })
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error)
        })
    return Menu
}

module.exports = {
    createMenu,
    updateMenus,
    deleteMenus,
    returnMenuById,
    returnAllMenusByRestaurantId,
}
