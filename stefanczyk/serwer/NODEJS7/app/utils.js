//* funkcje pomocnicze
const logger = require('tracer').colorConsole()
const path = require('path')
const fs = require('fs')

// let { convertedTagsArr, rawTagsArr, tagID } = require("./model");
const { convertedTagsArr, rawTagsArr, getTagID, setTagID } = require('./model')

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
  fs.readdir(filepath, (err, files) => {
    if (err) throw err

    files.forEach((file) => {
      fs.lstat(path.join(filepath, file), (err, stats) => {
        if (err) throw err
        if (stats.isDirectory()) {
          fs.readdir(path.join(filepath, file), (err, files2) => {
            if (err) throw err

            for (let i = 0; i < files2.length; i++) {
              fs.unlinkSync(path.join(filepath, file, files2[i]))
            }
            fs.rmdirSync(path.join(filepath, file)) //* moga byc z tym problemy
          })
        } else {
          fs.unlink(path.join(filepath, file), (err) => {
            if (err) throw err
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
    setTagID(getTagID() + 1) // działa tak samo jak tagID++, tylko że w przeciwieństwie do tego właśnie działa
  }
  logger.info('zmieniono surowe tagi na obiekty')
}

module.exports = { getRequestData, removeAllFiles, convertTagsToObjects }
