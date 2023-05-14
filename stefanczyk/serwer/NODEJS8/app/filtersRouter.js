//* router tylko do api filtrów

const filtersController = require('./filtersController')
const utils = require('./utils')

const filtersRouter = async (req, res) => {
  if (req.url.match(/\/api\/filters\/metadata\/([0-9]+)/) && req.method === 'GET') { // pobranie metadaty obrazka
    let statusCode = 200
    let returnedObj

    let selectedID = req.url.split('/')
    selectedID = parseInt(selectedID[selectedID.length - 1])

    const getMedadataResponse = await filtersController.getMetadata(selectedID)

    if (getMedadataResponse.success) {
      returnedObj = {
        status: statusCode,
        message: getMedadataResponse.message,
        result: getMedadataResponse.result
      }
    } else {
      statusCode = 404
      returnedObj = {
        status: statusCode,
        message: getMedadataResponse.message
      }
    }

    res.writeHead(statusCode, { 'Content-type': 'application/json;charset=utf-8' })
    res.end(JSON.stringify(returnedObj, null, 5))
  } else if (req.url === '/api/filters' && req.method === 'PATCH') { // użycie filtra
    let statusCode = 200
    let returnedObj

    const data = await utils.getRequestData(req)
    const parsedData = JSON.parse(data)

    const makeFilteredImage = await filtersController.makeFilteredImage(parsedData)

    if (makeFilteredImage.success) {
      returnedObj = {
        status: statusCode,
        message: makeFilteredImage.message,
        result: makeFilteredImage.result
      }
    } else {
      statusCode = 400
      returnedObj = {
        status: statusCode,
        message: makeFilteredImage.message
      }
    }

    res.writeHead(statusCode, { 'Content-type': 'application/json;charset=utf-8' })
    res.end(JSON.stringify(returnedObj, null, 5))
  }
}

module.exports = filtersRouter
