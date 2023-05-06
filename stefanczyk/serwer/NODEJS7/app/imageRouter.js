//* endpointy aplikacji get/post/patch/delete
//* router tylko do api imagów

// const logger = require('tracer').colorConsole()

const fileController = require('./fileController')
const jsonController = require('./jsonController')

const utils = require('./utils')

utils.removeAllFiles()

const imageRouter = async (req, res) => {
  // get jsona wszystkich zdjęć
  if (req.url === '/api/photos' && req.method === 'GET') {
    let statusCode = 200
    let returnedObj

    const getallResponse = await jsonController.getall()

    if (getallResponse.success) {
      returnedObj = {
        status: statusCode,
        message: getallResponse.message,
        files: getallResponse.result
      }
    } else {
      statusCode = 404
      returnedObj = {
        status: statusCode,
        message: getallResponse.message
      }
    }

    res.writeHead(statusCode, { 'Content-type': 'application/json;charset=utf-8' })
    res.end(JSON.stringify(returnedObj, null, 5))
  } else if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method === 'GET') { // get jsona jednego zdjęcia
    let statusCode = 200
    let returnedObj

    let selectedID = req.url.split('/')
    selectedID = parseInt(selectedID[selectedID.length - 1])

    const getoneResponse = await jsonController.getone(selectedID)

    if (getoneResponse.success) {
      returnedObj = {
        status: statusCode,
        message: getoneResponse.message,
        file: getoneResponse.result
      }
    } else {
      statusCode = 404
      returnedObj = {
        status: statusCode,
        message: getoneResponse.message
      }
    }

    res.writeHead(statusCode, { 'Content-type': 'application/json;charset=utf-8' })
    res.end(JSON.stringify(returnedObj, null, 5))
  } else if (req.url === '/api/photos' && req.method === 'POST') { // post image i nazwy albumu
    let statusCode = 201
    let returnedObj

    const addResponse = await fileController.add(req)

    if (addResponse.success) {
      returnedObj = {
        status: statusCode,
        message: addResponse.message,
        file: addResponse.file
      }
    } else {
      statusCode = 400
      returnedObj = {
        status: statusCode,
        message: 'nieoczekiwany błąd'
      }
    }

    res.writeHead(statusCode, { 'Content-type': 'application/json;charset=utf-8' })
    res.end(JSON.stringify(returnedObj, null, 5))
  } else if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method === 'DELETE') { // delete image i jsona
    let statusCode = 202
    let returnedObj

    let selectedID = req.url.split('/')
    selectedID = parseFloat(selectedID[selectedID.length - 1])

    const deleteResponse = await fileController.delete(selectedID)

    if (deleteResponse.success) {
      returnedObj = {
        status: statusCode,
        message: deleteResponse.message
      }
    } else {
      statusCode = 404
      returnedObj = {
        status: statusCode,
        message: deleteResponse.message
      }
    }

    res.writeHead(statusCode, { 'Content-type': 'application/json;charset=utf-8' })
    res.end(JSON.stringify(returnedObj, null, 5))
  } else if (req.url === '/api/photos' && req.method === 'PATCH') { // patch jsona - aktualizacja historii zdjęcia
    let statusCode = 200
    let returnedObj

    const data = await utils.getRequestData(req)
    const parsedData = JSON.parse(data)

    const updateResponse = await jsonController.update(parsedData)

    if (updateResponse.success) {
      returnedObj = {
        status: statusCode,
        message: updateResponse.message,
        file: updateResponse.result
      }
    } else {
      statusCode = 404
      returnedObj = {
        status: statusCode,
        message: updateResponse.message
      }
    }

    res.writeHead(statusCode, { 'Content-type': 'application/json;charset=utf-8' })
    res.end(JSON.stringify(returnedObj, null, 5))
  }
}

module.exports = imageRouter
