import Request from './request'

//Example
// export const getAllItems = () =>
//     Request.get('/allitems', {
//         'Content-Type': 'application/json',
//     })

//USERS
export const updateuserwithinfo = data =>
    Request.post('/updateUserWithInfo', data, {
        'Content-Type': 'application/json',
    })
export const createuserondatabase = data =>
    Request.post('/createUserOnDatabase', data, {
        'Content-Type': 'application/json',
    })
export const getuserinformationbyid = data =>
    Request.post('/getUserInformationById', data, {
        'Content-Type': 'application/json',
    })
export const updateuserinformation = data =>
    Request.post('/updateUserInformation', data, {
        'Content-Type': 'application/json',
    })
export const updateadmininformation = data =>
    Request.post('/updateAdminWithInfo', data, {
        'Content-Type': 'application/json',
    })

//Restaurantes
export const createRestaurantesOnDatabase = data =>
    Request.post('/createRestaurantesOnDatabase', data, {
        'Content-Type': 'application/json',
    })
export const updateRestaurantesInformation = data =>
    Request.post('/updateRestaurantesInformation', data, {
        'Content-Type': 'application/json',
    })
export const deleteRestaurantesInformation = data =>
    Request.post('/deleteRestaurantesInformation', data, {
        'Content-Type': 'application/json',
    })
export const returnRestaurantById = data =>
    Request.post('/returnRestaurantById', data, {
        'Content-Type': 'application/json',
    })
export const returRestaurantActiveMenu = data =>
    Request.post('/returRestaurantActiveMenu', data, {
        'Content-Type': 'application/json',
    })
export const addMenuToRestaurantes = data =>
    Request.post('/addMenuToRestaurantes', data, {
        'Content-Type': 'application/json',
    })
export const removeMenuToRestaurantes = data =>
    Request.post('/removeMenuToRestaurantes', data, {
        'Content-Type': 'application/json',
    })

//Menus
export const createMenusOnDatabase = data =>
    Request.post('/createMenusOnDatabase', data, {
        'Content-Type': 'application/json',
    })
export const updateMenusInformation = data =>
    Request.post('/updateMenusInformation', data, {
        'Content-Type': 'application/json',
    })
export const deleteMenusInformation = data =>
    Request.post('/deleteMenusInformation', data, {
        'Content-Type': 'application/json',
    })
export const returnMenuById = data =>
    Request.post('/returnMenuById', data, {
        'Content-Type': 'application/json',
    })
export const returnAllMenusByRestaurantId = data =>
    Request.post('/returnAllMenusByRestaurantId', data, {
        'Content-Type': 'application/json',
    })
