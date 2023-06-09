const logger = require('tracer').colorConsole()
const http = require('http')
const imageRouter = require('./app/imageRouter')
const tagsRouter = require('./app/tagsRouter')
const filtersRouter = require('./app/filtersRouter')
const getfileRouter = require('./app/getfileRouter')
const usersRouter = require('./app/userRouter')
const profilesRouter = require('./app/profilesRouter')
const userdataRouter = require('./app/userdataRouter')
const utils = require('./app/utils')
require('dotenv').config()

// TODO: poprawić nesting w projekcie, szczególnie controllery: przykład dobrego poprawienia jest w usercontroller
// TODO: komunikaty przetłumaczyć na angielski
// TODO: profilówki w osobnym folderze? żeby nie pojawiały się na home page'u

http
  .createServer(async (req, res) => {
    const origin = req.headers.origin ? req.headers.origin : '*'

    res.setHeader('Access-Control-Allow-Origin', origin) // origin || '*', bez origin wywala CORS nie wiem czemu
    res.setHeader('Access-Control-Request-Method', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', '*') // X-Requested-With,content-type
    res.setHeader('Access-Control-Allow-Credentials', true)

    // logger.log(req.headers)

    if (req.method === 'OPTIONS') {
      res.writeHead(200)
      res.end()
      return
    } // wyjaśnienie: http://spec.pl.hostingasp.pl/ShowLesson.aspx?zEDFkMSfrDxYGTUQAhCDqAiJMZuRK1Y3WXSCbSDyJI2OyMUwkUZ1oGGIh0lxIsAJXSiiKHKKIzV6atP4Hjlp1ljB6ZSJqhmdktmP=5c9811b2-fb88-48f3-99f5-3e26abceaa3c#0
    // https://drive.google.com/drive/folders/1TSCti8Ak9cREyUab73ubvVvbIl80xF0K?usp=sharing

    const { token } = utils.decodeCookie(req) // z cookiesów wybieramy ten z tokenem

    if (!token) { // jeśli nie ma tokena, to albo zwróci komunikat o jego braku, albo przejdzie do wykonywania funkcji, ktore go nie wymagaja
      if (req.url.search('/api/user') !== -1) { // users
        await usersRouter(req, res) // funkcje nie będą potrzebować tokena
      } else {
        const statusCode = 401
        const returnedObj = {
          status: statusCode,
          message: 'No token'
        }
        res.writeHead(statusCode, { 'Content-type': 'application/json;charset=utf-8' })
        res.end(JSON.stringify(returnedObj, null, 5))
      }
    } else {
      const decodedToken = await utils.verifyToken(token)

      if (!decodedToken.success) {
        const statusCode = 401
        const returnedObj = {
          status: statusCode,
          message: decodedToken.message
        }
        res.writeHead(statusCode, { 'Content-type': 'application/json;charset=utf-8' })
        res.end(JSON.stringify(returnedObj, null, 5))
      } else {
        // nie potrzebuje danych usera tam, gdzie ich nie używam, więc przekazuję zmienną tylko do wybranych ruterów, a potem controllerów
        if (req.url.search('/api/photos') !== -1) { // images
          await imageRouter(req, res, decodedToken.result)
        } else if (req.url.search('/api/tags') !== -1) { // tags
          await tagsRouter(req, res)
        } else if (req.url.search('/api/filters') !== -1) { // filters
          await filtersRouter(req, res)
        } else if (req.url.search('/api/getfile') !== -1) { // getfile
          await getfileRouter(req, res)
        } else if (req.url.search('/api/profile') !== -1) { // profiles
          await profilesRouter(req, res, decodedToken.result)
        } else if (req.url.search('/api/userdata') !== -1) { // userdata
          await userdataRouter(req, res)
        } else {
          res.writeHead(404, { 'Content-type': 'text/plain;charset=utf-8' })
          res.end('url not found')
        }
      }
    }
  })

  .listen(process.env.APP_PORT, () => { logger.warn(`serwer startuje na porcie ${process.env.APP_PORT}`) })
