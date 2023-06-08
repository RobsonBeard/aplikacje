//* endpointy aplikacji get/post/patch/delete
//* router tylko do api imagów

// const logger = require('tracer').colorConsole()

const fileController = require('./fileController')
const jsonController = require('./jsonController')

const utils = require('./utils')

utils.removeAllFiles()

const imageRouter = async (req, res, userData) => {
  // get jsona wszystkich zdjęć
  if (req.url === '/api/photos' && req.method === 'GET') {
    let statusCode = 200
    let returnedObj

    const getallResponse = await jsonController.getall()

    if (getallResponse.success) {
      returnedObj = {
        status: statusCode,
        message: getallResponse.message,
        result: getallResponse.result
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

    const splitURL = req.url.split('/')
    const selectedID = parseInt(splitURL[splitURL.length - 1])

    const getoneResponse = await jsonController.getone(selectedID)

    if (getoneResponse.success) {
      returnedObj = {
        status: statusCode,
        message: getoneResponse.message,
        result: getoneResponse.result
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

    const addResponse = await fileController.addImg(req, userData)

    if (addResponse.success) {
      returnedObj = {
        status: statusCode,
        message: addResponse.message,
        result: addResponse.file
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

    const splitURL = req.url.split('/')
    const selectedID = parseInt(splitURL[splitURL.length - 1])

    const deleteResponse = await fileController.deleteImg(selectedID)

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
        result: updateResponse.result
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
        result: updateResponse.result
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
  } else if (req.url === '/api/photos/tags' && req.method === 'PATCH') { // aktualizacja danych zdjęcia o nowy tag
    let statusCode = 200
    let returnedObj

    const data = await utils.getRequestData(req)
    const parsedData = JSON.parse(data)

    const addTagResponse = await jsonController.addTag(parsedData)

    if (addTagResponse.success) {
      returnedObj = {
        status: statusCode,
        message: addTagResponse.message,
        result: addTagResponse.result
      }
    } else {
      statusCode = 404
      returnedObj = {
        status: statusCode,
        message: addTagResponse.message
      }
    }

    res.writeHead(statusCode, { 'Content-type': 'application/json;charset=utf-8' })
    res.end(JSON.stringify(returnedObj, null, 5))
  } else if (req.url === '/api/photos/tags/mass' && req.method === 'PATCH') { // aktualizacja danych zdjęcia o tablicę nowych tagów
    let statusCode = 200
    let returnedObj

    const data = await utils.getRequestData(req)
    const parsedData = JSON.parse(data)

    const addTagsArrResponse = await jsonController.addTagsArr(parsedData)

    if (addTagsArrResponse.success) {
      returnedObj = {
        status: statusCode,
        message: addTagsArrResponse.message,
        result: addTagsArrResponse.result
      }
    } else {
      statusCode = 404
      returnedObj = {
        status: statusCode,
        message: addTagsArrResponse.message
      }
    }

    res.writeHead(statusCode, { 'Content-type': 'application/json;charset=utf-8' })
    res.end(JSON.stringify(returnedObj, null, 5))
  } else if (req.url.match(/\/api\/photos\/tags\/([0-9]+)/) && req.method === 'GET') { // pobranie tagów danego zdjęcia
    let statusCode = 200
    let returnedObj

    const splitURL = req.url.split('/')
    const selectedID = parseInt(splitURL[splitURL.length - 1])

    const getImgTagsResponse = await jsonController.getImgTags(selectedID)

    if (getImgTagsResponse.success) {
      returnedObj = {
        status: statusCode,
        message: getImgTagsResponse.message,
        result: getImgTagsResponse.result
      }
    } else {
      statusCode = 404
      returnedObj = {
        status: statusCode,
        message: getImgTagsResponse.message
      }
    }

    res.writeHead(statusCode, { 'Content-type': 'application/json;charset=utf-8' })
    res.end(JSON.stringify(returnedObj, null, 5))
  } else if (req.url.match(/\/api\/photos\/\S+/) && req.method === 'GET') { // get jsonów zdjęć z wybranego folderu
    // regex przyjmuje wszystkie znaki oprocz białych znaków i "/"
    // req.url.match(/\/api\/photos\/([a-zA-Z0-9]+)/)
    // req.url.match(/\/api\/photos\/([^\s]+)/)

    let statusCode = 200
    let returnedObj

    const splitURL = req.url.split('/')
    const selectedDirectoryName = splitURL[splitURL.length - 1]

    const getallFromDirectoryResponse = await jsonController.getallFromDirectory(selectedDirectoryName)

    if (getallFromDirectoryResponse.success) {
      returnedObj = {
        status: statusCode,
        message: getallFromDirectoryResponse.message,
        result: getallFromDirectoryResponse.result
      }
    } else {
      statusCode = 404
      returnedObj = {
        status: statusCode,
        message: getallFromDirectoryResponse.message
      }
    }

    res.writeHead(statusCode, { 'Content-type': 'application/json;charset=utf-8' })
    res.end(JSON.stringify(returnedObj, null, 5))
  }
}

module.exports = imageRouter
