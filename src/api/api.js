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

//BREWERY
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
export const returnAllRestaurantes = data =>
    Request.post('/returnAllRestaurantes', data, {
        'Content-Type': 'application/json',
    })
