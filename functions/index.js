const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
})

const cors = require('cors')({
    origin: true,
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.returnRestaurantsNames = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        let data = []
        try {
            const db = admin.firestore()
            db.collection('Restaurantes')
                .get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        data.push(doc.data().restaurantName)
                    })
                })
                .catch(err => {
                    console.log('Error getting documents', err)
                })

            res.status(200).send({status: data})
        } catch (err) {
            console.log(err)
            res.status(400).send({err: err})
        }
    })
})
