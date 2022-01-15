import {GoogleSpreadsheet} from 'google-spreadsheet'
const doc = new GoogleSpreadsheet(
    '1m1gqo1EFFHIznVAcEjLLu5KjlO-P2pV4D8sgg2Kg8-E'
)
const clientEmail =
    'la-salle-cafeteria@encoded-source-338118.iam.gserviceaccount.com'
const privateKey =
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC/WB7zpe57yJtY\nOQWEUbg5M7ihieqkHmd3dZs2j4NGfDZpLEhUKuWS7znHiBfP/JvjWYuXJhUiQvT6\nB+nuj8oQvT9ww48REjKoAcguch8FH2NBH76dmxnxBFAI2+2cexl0/BXo7KNCNTpP\nJdiHG1i5NDStHdaYOxYqrNt+I5zfYUwU4657lq2bKEp14dUcd3mA6/wWYbYmzqBR\nfSb3rBqhyzZqfanMaEVLb6Fd3yDKjy/cK5JFPWeFxe1KI5hx5B4m9bpYVauwzS+S\nJ3unU7JDr6mT+9btVT9Pyp3lu8We+PCd4+QpZ8xvcv59mlFD1n3/KQ+6gU7C6dWt\n0Xfl93HpAgMBAAECggEAF+n8xlFG7sgJ6DsKLjkjZ9zHtsK8pWHaZxL3ANjrXIAS\nMc9Tw9cvpY9J/p7K8RbeacnreQrMqeFJ6kTabxMf+zsXxnFefFD0rUw5t1pSd6qu\nVjmQMnTrx1RVZ2ILPpsg+Z6240tN9SyfWrx9ZRddHZqBeeBojVKXKOK9NPTg+obg\nUqiOCfrZS1BQ8BeZ/nJlS5d8ztsMi6Gz2LT96lHrx88EX+9xJuZLGY+nFCAUSQ29\nn/LsYqYIj8KMXE5/jSXJ/DCm7GxAG3KcElC1R7QZpGtB13akehv+zZwuOS9DvKjr\neW1ggmmMWgvBitE4gVOsR2n4l1vtMcfm/HRcRrIBjQKBgQDr7HEVhPs6i4TvZBqh\n1PNlv60Z9qKQiCA/IUT9/3hlU1VFrnFl4QDCegVlon7EE46TAxOmhk2bWWDIbWTA\ngTPllUQ2hmmRG3Z0QlCboZ9pWpBBecaqR/SLfZrF6jduGhuX/gEFNJa9cvAENfsN\nAoS7az9dBKbKqmv52U6yU3DiTQKBgQDPoIZEJwQ89jl668FmXR/N5p4UpPl+sLcZ\ntCabTixgN0ynp5Lue1WSHy1AO1QY80rCUQo4iVxau53cHRB8Q/DABycBgDuFce2d\nDUIJcgd5ZN0LbNKHROcnxd9+LRZf2cto2b5SCP9irwcWvCW27WsOuDEddWHa9Dmr\nB8AAHl3EDQKBgCoDjlPtvau8Yu0a359IRBwvmU0RXfvtMgjsDNRK5Y7t2zawjSM+\ngZsgjct+t6KFdRN7LcmvCy0KKrEmwhWCLNLK1T38i9o6kMq9cIt2qePiK+RtIlL6\nw3L/6Essnbhuz9Eue9IIfnu4d0PYtR+o/ig+Pid7h5R56wawi1I4h9bVAoGBAKjb\nITb+EDlP+nFYmMIaTEpVGw0pGmuJZm/2DkvSKM7bSnEzHJDtJyueRVvupDdibdNY\nuxo9xClaWkjwLj8RthNF/df/pOijPh6y8Jjj7uYwPIEVMKaoR+IVz+w62O59HyuX\nomvvO1vTgs1fmMCLl7yx2efeVgYPB3Nr6x9tks5lAoGAKNHwG8GhrwFpmwhEMAMM\nIGUUUpvJETIlI1HA3rslacm7o5MeD0jvQq8fXVlnbO0hdo9+eUmYw9KUFs/xi46w\ntVeIKUEXxAg/bZCLP/0j7SZISi5EB0wE2mEbM9JXboqrTe1Snw5mUldymisU1wda\nbmRjB7gHl+1oLEWYosHmBkI=\n-----END PRIVATE KEY-----\n'

export default {
    methods: {
        async getInventoryItems() {
            let inventory = []
            await doc.useServiceAccountAuth({
                private_key: privateKey,
                client_email: clientEmail,
            })
            await doc.loadInfo()
            const sheet = doc.sheetsByIndex[0]
            let rows = await sheet.getRows()
            rows.forEach(row => {
                inventory.push({
                    name: row.name,
                    price: parseFloat(row.price),
                    description: row.description,
                    day: parseInt(row.day),
                    img: row.img,
                })
            })
            return inventory
        },
        async updateInventoryAmount(id, variant, amount) {
            return new Promise(async (resolve, reject) => {
                if (!id) reject('No Item Id was specified')
                if (!amount) reject('No amount was specified')
                try {
                    await doc.useServiceAccountAuth({
                        private_key: privateKey,
                        client_email: clientEmail,
                    })
                    await doc.loadInfo()
                    const sheet = doc.sheetsByIndex[0]
                    await sheet.loadCells()
                    let inventory = await this.getInventoryItems()
                    let workingItem = inventory.find(
                        item => item.id === id && item.variant === variant
                    )
                    if (!workingItem) reject('No Item match was found!')
                    let row = inventory.indexOf(workingItem) + 1
                    let workingCell = await sheet.getCell(row, 4)
                    workingCell.value = amount
                    workingCell.save()
                    resolve()
                } catch (error) {
                    reject(error)
                }
            })
        },
    },
}
