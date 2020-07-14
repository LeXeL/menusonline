const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
})

const cors = require('cors')({
    origin: true,
})

const Restaurantes = require('./lib/Restaurantes')

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
exports.returnAllRestaurantes = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        try {
            let response = await Restaurantes.returnAllRestaurantes()
            res.status(200).send({data: response})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
