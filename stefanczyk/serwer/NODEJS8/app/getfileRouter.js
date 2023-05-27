//* router tylko do api getfile

const logger = require('tracer').colorConsole()
const fs = require('fs')
const mime = require('mime-types');

const getfileController = require('./getfileController')

const getfileRouter = async (req, res) => {
    if (req.url.match(/\/api\/getfile\/([0-9]+)\/([a-z]+)/) && req.method === 'GET') { // wyświetlenie obrazka z filtrem po id
        let statusCode = 200
        let returnedObj

        let splitURL = req.url.split('/') //* zrobic tak w innych routerach
        const selectedID = parseInt(splitURL[splitURL.length - 2])
        const selectedFilterName = splitURL[splitURL.length - 1]

        const getImageWithFilterByIDResponse = await getfileController.getImageWithFilterByID(selectedID, selectedFilterName)

        if (getImageWithFilterByIDResponse.success) {
            const imageData = fs.readFileSync(getImageWithFilterByIDResponse.result)
            const mimename = mime.lookup(getImageWithFilterByIDResponse.result)

            res.writeHead(statusCode, { 'Content-Type': `${mimename};charset=utf-8` })
            res.end(imageData)
        } else {
            statusCode = 404
            returnedObj = {
                status: statusCode,
                message: getImageWithFilterByIDResponse.message
            }
            res.writeHead(statusCode, { 'Content-type': 'application/json;charset=utf-8' })
            res.end(JSON.stringify(returnedObj, null, 5))
        }
    } else if (req.url.match(/\/api\/getfile\/([0-9]+)/) && req.method === 'GET') { // wyświetlenie obrazka po id
        //! uważać na kolejność ifów, jest ważne, żeby bardziej złożony warunek był wyżej
        let statusCode = 200
        let returnedObj

        let splitURL = req.url.split('/')
        const selectedID = parseInt(splitURL[splitURL.length - 1])

        const getImageByIDResponse = await getfileController.getImageByID(selectedID)

        if (getImageByIDResponse.success) {
            const imageData = fs.readFileSync(getImageByIDResponse.result)
            const mimename = mime.lookup(getImageByIDResponse.result)

            res.writeHead(statusCode, { 'Content-Type': `${mimename};charset=utf-8` })
            res.end(imageData)
        } else {
            statusCode = 404
            returnedObj = {
                status: statusCode,
                message: getImageByIDResponse.message
            }
            res.writeHead(statusCode, { 'Content-type': 'application/json;charset=utf-8' })
            res.end(JSON.stringify(returnedObj, null, 5))
        }
    }
}

module.exports = getfileRouter