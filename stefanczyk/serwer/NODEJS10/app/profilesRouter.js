//* router tylko do api profili

const profilesController = require('./profilesController')
// const utils = require('./utils')
// const logger = require('tracer').colorConsole()

const profilesRouter = async (req, res) => {
  if (req.url === '/api/profile' && req.method === 'GET') { // pobranie jsona tablicy userow
    let statusCode = 200
    let returnedObj

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      const token = req.headers.authorization.split(' ')[1]

      const getProfileDataResponse = await profilesController.getProfileData(token)

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
    } else {
      statusCode = 401
      returnedObj = {
        status: statusCode,
        message: 'Brak Tokena'
      }
      res.writeHead(statusCode, { 'Content-type': 'application/json;charset=utf-8' })
      res.end(JSON.stringify(returnedObj, null, 5))
    }
  }
}

module.exports = profilesRouter
