// * funkcje do pracy z aplikacją
// ---
//* modyfikacje samych plików (zapis/usunięcie/inne)

const path = require('path')
const fs = require('fs')
const logger = require('tracer').colorConsole()
const formidable = require('formidable')

const { imagesArr, getFileID, setFileID } = require('./model')
const jsonController = require('./jsonController')

const addImg = (req, userData) => {
  return new Promise((resolve, reject) => {
    try {
      const form = formidable({})
      form.multiples = true
      form.keepExtensions = true
      form.uploadDir = __dirname //* bez tego jest błąd polegający na tym, że nie da się robić rename pomiędzy dyskami

      form.parse(req, (error, fields, files) => {
        if (error) throw error
        const pathname = path.join(__dirname, '/upload', `/${userData.id}`)
        const splitURL = files.file.path.split('\\')
        const filename = splitURL[splitURL.length - 1]

        const renameFile = () => {
          fs.rename(files.file.path, path.join(pathname, `/${filename}`), error => {
            if (error) throw error
            logger.log(`\nstworzono plik o nazwie ${filename} w katalogu usera o id ${userData.id}\n`)
          })
        }

        if (!fs.existsSync(pathname)) {
          fs.mkdir(pathname, (error) => {
            if (error) throw error
            renameFile()
          })
        } else {
          renameFile()
        }

        const fileData = {
          id: getFileID(),
          album: userData.id,
          originalname: files.file.name,
          url: path.join(pathname, `/${filename}`),
          lastChange: 'original',
          history: [
            {
              status: 'original',
              timestamp: files.file.lastModifiedDate
            }
          ],
          tags: []
        }
        imagesArr.push(fileData)
        setFileID(getFileID() + 1)

        resolve({ success: true, message: 'stworzono plik', file: fileData })
      })
      //* uważać na asynchroniczność, ten form.parse sie dlugo robi
    } catch (error) {
      reject(error)
    }
  })
}

const deleteImg = async (selectedID) => {
  const gotImageJSON = await jsonController.getone(selectedID)
  return new Promise((resolve, reject) => {
    try {
      if (gotImageJSON.success) {
        const selectedImage = gotImageJSON.result

        fs.unlinkSync(selectedImage.url)
        const splitURL = selectedImage.url.split('\\')
        const filename = splitURL[splitURL.length - 1]
        logger.log(`\nusunięto plik o nazwie ${filename} z katalogu ${selectedImage.album}\n`)

        for (let i = 0; i < imagesArr.length; i++) {
          if (imagesArr[i].id === selectedID) {
            imagesArr.splice(i, 1)
          }
        }

        resolve({ success: true, message: 'usunięto plik' })
      } else {
        resolve(gotImageJSON)
      }
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { addImg, deleteImg }
