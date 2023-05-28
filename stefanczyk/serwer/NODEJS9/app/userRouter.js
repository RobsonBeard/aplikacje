//* router tylko do api userów

const userController = require('./userController')
const utils = require('./utils')
// const logger = require('tracer').colorConsole()

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
    // eslint-disable-next-line no-useless-escape
  } else if (req.url.match(/\/api\/user\/confirm\/([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/) && req.method === 'GET') { // user potwierdza rejestrację konta z użyciem tokena
    let statusCode = 200
    let returnedObj

    const splitURL = req.url.split('/')
    const token = splitURL[splitURL.length - 1]

    const confirmUserResponse = await userController.confirmUser(token)

    if (confirmUserResponse.success) {
      returnedObj = {
        status: statusCode,
        message: confirmUserResponse.message,
        result: confirmUserResponse.result
      }
    } else {
      statusCode = 404
      returnedObj = {
        status: statusCode,
        message: confirmUserResponse.message
      }
    }

    res.writeHead(statusCode, { 'Content-type': 'application/json;charset=utf-8' })
    res.end(JSON.stringify(returnedObj, null, 5))
  } else if (req.url === '/api/user/login' && req.method === 'POST') { // logowanie
    let statusCode = 200
    let returnedObj

    const data = await utils.getRequestData(req)
    const parsedData = JSON.parse(data)

    const loginResponse = await userController.login(parsedData)

    if (loginResponse.success) {
      returnedObj = {
        status: statusCode,
        message: loginResponse.message,
        result: loginResponse.result
      }
    } else {
      statusCode = 404
      returnedObj = {
        status: statusCode,
        message: loginResponse.message
      }
    }

    res.writeHead(statusCode, { 'Content-type': 'application/json;charset=utf-8' })
    res.end(JSON.stringify(returnedObj, null, 5))
  } else if (req.url === '/api/user' && req.method === 'GET') { // pobranie jsona tablicy userow
    let statusCode = 200
    let returnedObj

    const getUsersResponse = await userController.getUsers()

    if (getUsersResponse.success) {
      returnedObj = {
        status: statusCode,
        message: getUsersResponse.message,
        result: getUsersResponse.result
      }
    } else {
      statusCode = 404
      returnedObj = {
        status: statusCode,
        message: getUsersResponse.message
      }
    }

    res.writeHead(statusCode, { 'Content-type': 'application/json;charset=utf-8' })
    res.end(JSON.stringify(returnedObj, null, 5))
  }
}
// TODO: zrobic logowanie a potem zastosowac sie do proponowanych statusow ze speca
// ([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*) // jwt regex

module.exports = usersRouter
