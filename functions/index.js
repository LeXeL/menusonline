const functions = require('firebase-functions')
const admin = require('firebase-admin')

var serviceAccount = require('./credentials.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

const cors = require('cors')({
    origin: true,
})

const Restaurantes = require('./lib/Restaurantes')
const Menus = require('./lib/Menus')
// Admin Management
const Restaurants = require('./lib/Restaurants')

//Handle Restaurantes
exports.createRestaurantesOnDatabase = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                await Restaurantes.createRestaurantes(req.body.Restaurantes)
                res.status(200).send({status: 'Created'})
            } catch (err) {
                console.log(err)
                res.status(400).send({err: err})
            }
        })
    }
)
exports.updateRestaurantesInformation = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                let response = await Restaurantes.updateRestaurantes(
                    req.body.id,
                    req.body.Restaurantes
                )
                res.status(200).send({data: response})
            } catch (err) {
                console.log(err)
                res.status(400).send({err: err})
            }
        })
    }
)
exports.deleteRestaurantesInformation = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                let response = await Restaurantes.deleteRestaurantes(
                    req.body.id
                )
                res.status(200).send({data: response})
            } catch (err) {
                console.log(err)
                res.status(400).send({err: err})
            }
        })
    }
)
exports.returnRestaurantById = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await Restaurant.returnRestaurantById(req.body.id)
            res.status(200).send({data: response})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
exports.returRestaurantActiveMenu = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                let response = await Restaurantes.returRestaurantActiveMenu(
                    req.body.path
                )
                res.status(200).send({data: response})
            } catch (err) {
                console.log(err)
                res.status(400).send({err: err})
            }
        })
    }
)
exports.addMenuToRestaurantes = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await Restaurantes.addMenuToRestaurantes(
                req.body.uid,
                req.body.menu
            )
            res.status(200).send({data: response})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
exports.removeMenuToRestaurantes = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                let response = await Restaurantes.removeMenuToRestaurantes(
                    req.body.uid,
                    req.body.menu
                )
                res.status(200).send({data: response})
            } catch (err) {
                console.log(err)
                res.status(400).send({err: err})
            }
        })
    }
)

//Handle Menus
exports.createMenusOnDatabase = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            await Menus.createMenu(req.body.Menu, req.body.restaurant)
            res.status(200).send({status: 'Created'})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})

exports.updateMenusInformation = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await Menus.updateMenus(req.body.id, req.body.Menus)
            res.status(200).send({data: response})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
exports.deleteMenusInformation = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await Menus.deleteMenus(req.body.id)
            res.status(200).send({data: response})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
exports.returnMenuById = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await Menus.returnMenuById(req.body.id)
            res.status(200).send({data: response})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
exports.returnAllMenusByRestaurantId = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                let response = await Menus.returnAllMenusByRestaurantId(
                    req.body.restaurantId
                )
                res.status(200).send({data: response})
            } catch (err) {
                console.log(err)
                res.status(400).send({err: err})
            }
        })
    }
)

// handle Restaurants
// New Restaurant
exports.createNewAdminRestaurant = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                await Restaurants.createRestaurant(req.body.Restaurant)
                res.status(200).send({status: 'Created New Restaurant'})
            } catch (err) {
                console.log(err)
                res.status(400).send({err: err})
            }
        })
    }
)
// Update Restaurant
exports.updateAdminRestaurantInfo = functions.https.onRequest(
    async (req, res) => {
        cors(req, res, async () => {
            try {
                let response = await Restaurants.updateRestaurant(
                    req.body.id,
                    req.body.Restaurant
                )
                res.status(200).send({data: response})
            } catch (err) {
                console.log(err)
                res.status(400).send({err: err})
            }
        })
    }
)
// Delete Restaurant
exports.deleteAdminRestaurant = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await Restaurants.deleteRestaurant(req.body.id)
            res.status(200).send({data: response})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
