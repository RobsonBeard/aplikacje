//* router tylko do api pobierania danych userów

const userdataController = require('./userdataController')

const userdataRouter = async (req, res) => {
  if (req.url.match(/\/api\/userdata\/([0-9]+)/) && req.method === 'GET') { // get jsona jednego usera
    let statusCode = 200
    let returnedObj

    const splitURL = req.url.split('/')
    const selectedID = parseInt(splitURL[splitURL.length - 1])

    const getOneUserResponse = await userdataController.getOneUser(selectedID)

    if (getOneUserResponse.success) {
      returnedObj = {
        status: statusCode,
        message: getOneUserResponse.message,
        result: getOneUserResponse.result
      }
    } else {
      statusCode = 404
      returnedObj = {
        status: statusCode,
        message: getOneUserResponse.message
      }
    }

    res.writeHead(statusCode, { 'Content-type': 'application/json;charset=utf-8' })
    res.end(JSON.stringify(returnedObj, null, 5))
  } else if (req.url === '/api/userdata' && req.method === 'GET') { // pobranie jsona tablicy userow
    let statusCode = 200
    let returnedObj

    const getUsersResponse = await userdataController.getUsers()

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

module.exports = userdataRouter
