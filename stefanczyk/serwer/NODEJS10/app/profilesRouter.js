//* router tylko do api profili

const profilesController = require('./profilesController')
const utils = require('./utils')
const fs = require('fs')
const mime = require('mime-types')
// const logger = require('tracer').colorConsole()

const profilesRouter = async (req, res, userData) => {
  if (req.url.match(/\/api\/profile\/getmypfp/) && req.method === 'GET') { // wyświetlenie swojego zdjęcia profilowego
    let statusCode = 200
    let returnedObj

    const getProfilePictureResponse = await profilesController.getProfilePicture(userData.id)

    if (getProfilePictureResponse.success) {
      const imageData = fs.readFileSync(getProfilePictureResponse.result)
      const mimename = mime.lookup(getProfilePictureResponse.result)

      res.writeHead(statusCode, { 'Content-Type': `${mimename};charset=utf-8` })
      res.end(imageData)
    } else {
      statusCode = 404
      returnedObj = {
        status: statusCode,
        message: getProfilePictureResponse.message
      }
      res.writeHead(statusCode, { 'Content-type': 'application/json;charset=utf-8' })
      res.end(JSON.stringify(returnedObj, null, 5))
    }
  } else if (req.url.match(/\/api\/profile\/getuserspfp\/([0-9]+)/) && req.method === 'GET') { // wyświetlenie zdjęcia profilowego innych userów
    let statusCode = 200
    let returnedObj

    const splitURL = req.url.split('/')
    const selectedID = parseInt(splitURL[splitURL.length - 1])

    const getOthersPfpResponse = await profilesController.getProfilePicture(selectedID)

    if (getOthersPfpResponse.success) {
      const imageData = fs.readFileSync(getOthersPfpResponse.result)
      const mimename = mime.lookup(getOthersPfpResponse.result)

      res.writeHead(statusCode, { 'Content-Type': `${mimename};charset=utf-8` })
      res.end(imageData)
    } else {
      statusCode = 404
      returnedObj = {
        status: statusCode,
        message: getOthersPfpResponse.message
      }
      res.writeHead(statusCode, { 'Content-type': 'application/json;charset=utf-8' })
      res.end(JSON.stringify(returnedObj, null, 5))
    }
  } else if (req.url === '/api/profile' && req.method === 'GET') { // pobranie jsona tablicy userow
    let statusCode = 200
    let returnedObj

    const getProfileDataResponse = await profilesController.getProfileData(userData)

    if (getProfileDataResponse.success) {
      returnedObj = {
        status: statusCode,
        message: getProfileDataResponse.message,
        result: getProfileDataResponse.result
      }
    } else {
      statusCode = 404
      returnedObj = {
        status: statusCode,
        message: getProfileDataResponse.message
      }
    }

    res.writeHead(statusCode, { 'Content-type': 'application/json;charset=utf-8' })
    res.end(JSON.stringify(returnedObj, null, 5))
  } else if (req.url === '/api/profile' && req.method === 'PATCH') { // aktualizacja danych usera
    let statusCode = 200
    let returnedObj

    const data = await utils.getRequestData(req)
    const parsedData = JSON.parse(data)

    const updateProfileDataResponse = await profilesController.updateProfileData(userData, parsedData)

    if (updateProfileDataResponse.success) {
      returnedObj = {
        status: statusCode,
        message: updateProfileDataResponse.message,
        result: updateProfileDataResponse.result
      }
    } else {
      statusCode = 404
      returnedObj = {
        status: statusCode,
        message: updateProfileDataResponse.message
      }
    }

    res.writeHead(statusCode, { 'Content-type': 'application/json;charset=utf-8' })
    res.end(JSON.stringify(returnedObj, null, 5))
  } else if (req.url === '/api/profile' && req.method === 'POST') { // wysłanie zdjęcia profilowego
    let statusCode = 201
    let returnedObj

    const addProfilePictureResponse = await profilesController.addProfilePicture(req, userData)

    if (addProfilePictureResponse.success) {
      returnedObj = {
        status: statusCode,
        message: addProfilePictureResponse.message,
        result: addProfilePictureResponse.result
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
  }
}

module.exports = profilesRouter
