//* router tylko do api logoutu

const logoutController = require('./logoutController')

const logoutRouter = async (req, res) => {
  if (req.url === '/api/logout' && req.method === 'GET') { // pobranie jsona tablicy userow
    let statusCode = 200
    let returnedObj

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      const token = req.headers.authorization.split(' ')[1]

      const logoutResponse = await logoutController.logout(token)

      if (logoutResponse.success) {
        returnedObj = {
          status: statusCode,
          message: logoutResponse.message
        }
      } else {
        statusCode = 404
        returnedObj = {
          status: statusCode,
          message: logoutResponse.message
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

module.exports = logoutRouter
