//* router tylko do api profili

const profilesController = require('./profilesController')
const utils = require('./utils')
// const logger = require('tracer').colorConsole()

const profilesRouter = async (req, res, userData) => {
  if (req.url === '/api/profile' && req.method === 'GET') { // pobranie jsona tablicy userow
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
