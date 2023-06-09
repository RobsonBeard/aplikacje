//* funkcje pomocnicze
const logger = require('tracer').colorConsole()
const path = require('path')
const fs = require('fs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { convertedTagsArr, rawTagsArr, tokenBlacklist, getTagID, setTagID } = require('./model')

// funkcja parsująca dane z posta
const getRequestData = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      let body = ''

      req.on('data', (part) => {
        body += part.toString()
      })

      req.on('end', () => {
        // mamy dane i zwracamy z promisa
        resolve(body)
      })
    } catch (error) {
      reject(error)
    }
  })
}

// funkcja usuwająca pliki i katalogi przy starcie serwera
const removeAllFiles = () => {
  const filepath = path.join(__dirname, 'upload')
  fs.readdir(filepath, (error, files) => {
    if (error) throw error

    files.forEach((file) => {
      fs.lstat(path.join(filepath, file), (error, stats) => {
        if (error) throw error
        if (stats.isDirectory()) {
          fs.readdir(path.join(filepath, file), (error, files2) => {
            if (error) throw error

            for (let i = 0; i < files2.length; i++) {
              fs.unlinkSync(path.join(filepath, file, files2[i]))
            }
            fs.rmdirSync(path.join(filepath, file)) //* moga byc z tym problemy
          })
        } else {
          fs.unlink(path.join(filepath, file), (error) => {
            if (error) throw error
          })
        }
      })
    })
    logger.info('usunięto pliki i katalogi')
  })
}

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const convertTagsToObjects = () => {
  // convertedTagsArr = [] //! przypisywanie wartości po prostu nie działa, wszystkie pushe itp są okej, ale to nie, tak samo filter z przypisaniem
  // zrobic length=0 opcjonalnie
  for (let i = 0; i < rawTagsArr.length; i++) {
    const newTag = {
      id: getTagID(),
      name: rawTagsArr[i],
      popularity: getRndInteger(1, 500)
    }
    convertedTagsArr.push(newTag)
    setTagID(getTagID() + 1)
  }
  logger.info('zmieniono surowe tagi na obiekty')
}
// na start serwera sie resetuja userzy

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      if (tokenBlacklist.find(elem => elem === token) !== undefined) {
        resolve({ success: false, message: 'Token is on the blacklist' })
      }
      resolve({ success: true, message: 'Token verified', result: decoded })
    } catch (error) {
      logger.log(error.message)
      resolve({ success: false, message: error.message })
      // reject(error) //* nie wiem czy to jest zgodne z założeniami promise'a, żeby nie było rejecta, ale ten resolve dziala jak reject w zasadzie
    }
  })
}

const decodeCookie = (req) => {
  const parsedCookie = {}
  if (req.headers.cookie) {
    req.headers.cookie.split('; ').forEach(elem => { // pomiędzy kilkoma cookies jest średnik i spacja
      const [cookieKey, cookieValue] = elem.split('=')
      parsedCookie[cookieKey] = cookieValue
    })
  }
  // logger.log(parsedCookie) // wychodzi obiekt, klucz to nazwa cookie, a wartosc to wartosc cookie
  return parsedCookie
}

module.exports = { getRequestData, removeAllFiles, convertTagsToObjects, verifyToken, decodeCookie }
