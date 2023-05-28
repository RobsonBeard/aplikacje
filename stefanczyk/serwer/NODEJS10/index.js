const logger = require('tracer').colorConsole()
const http = require('http')
const imageRouter = require('./app/imageRouter')
const tagsRouter = require('./app/tagsRouter')
const filtersRouter = require('./app/filtersRouter')
const getfileRouter = require('./app/getfileRouter')
const usersRouter = require('./app/userRouter')
const profilesRouter = require('./app/profilesRouter')
const logoutRouter = require('./app/logoutRouter')
require('dotenv').config() // teraz używam pliku .env

http
  .createServer(async (req, res) => {
    if (req.url.search('/api/photos') !== -1) { // images
      await imageRouter(req, res)
    } else if (req.url.search('/api/tags') !== -1) { // tags
      await tagsRouter(req, res)
    } else if (req.url.search('/api/filters') !== -1) { // filters
      await filtersRouter(req, res)
    } else if (req.url.search('/api/getfile') !== -1) { // getfile
      await getfileRouter(req, res)
    } else if (req.url.search('/api/user') !== -1) { // users
      await usersRouter(req, res)
    } else if (req.url.search('/api/profile') !== -1) { // profiles
      await profilesRouter(req, res)
    } else if (req.url.search('/api/logout') !== -1) { // logout
      await logoutRouter(req, res)
    }
  })

  .listen(process.env.APP_PORT, () => { logger.warn(`serwer startuje na porcie ${process.env.APP_PORT}`) })
