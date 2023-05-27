//* funkcje pomocnicze
const logger = require('tracer').colorConsole()
const path = require('path')
const fs = require('fs')

const { convertedTagsArr, rawTagsArr, usersArr, getTagID, setTagID } = require('./model')

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
    setTagID(getTagID() + 1) // działa tak samo jak tagID++, tylko że w przeciwieństwie do tego właśnie działa
  }
  logger.info('zmieniono surowe tagi na obiekty')
}

// const clearUserData = () => {
//   usersArr.length = 0
// } // nie wiem czy to jest potrzebne, bo na start serwera i tak sie resetuja userzy

module.exports = { getRequestData, removeAllFiles, convertTagsToObjects }
