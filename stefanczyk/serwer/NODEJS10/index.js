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
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    } // wyjaśnienie: http://spec.pl.hostingasp.pl/ShowLesson.aspx?zEDFkMSfrDxYGTUQAhCDqAiJMZuRK1Y3WXSCbSDyJI2OyMUwkUZ1oGGIh0lxIsAJXSiiKHKKIzV6atP4Hjlp1ljB6ZSJqhmdktmP=5c9811b2-fb88-48f3-99f5-3e26abceaa3c#0
    // https://drive.google.com/drive/folders/1TSCti8Ak9cREyUab73ubvVvbIl80xF0K?usp=sharing

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
