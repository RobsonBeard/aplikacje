//* router tylko do api userów

const userController = require('./userController')
const utils = require('./utils')

const usersRouter = async (req, res) => {
  if (req.url === '/api/user/register' && req.method === 'POST') { // register usera
    let statusCode = 201
    let returnedObj

    const data = await utils.getRequestData(req)
    const parsedData = JSON.parse(data)

    const registerResponse = await userController.register(parsedData)

    if (registerResponse.success) {
      returnedObj = {
        status: statusCode,
        message: registerResponse.message,
        result: registerResponse.result
      }
    } else {
      statusCode = 400
      returnedObj = {
        status: statusCode,
        message: registerResponse.message
      }
    }

    res.writeHead(statusCode, { 'Content-type': 'application/json;charset=utf-8' })
    res.end(JSON.stringify(returnedObj, null, 5))
  }
}

// ^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*) // jwt regex

module.exports = usersRouter