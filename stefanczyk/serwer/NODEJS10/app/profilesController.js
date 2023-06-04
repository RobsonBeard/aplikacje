// * funkcje do pracy z aplikacją
// ---
//* profile

const logger = require('tracer').colorConsole()
const path = require('path')
const fs = require('fs')
const formidable = require('formidable')

const { modifyUserAccount, getFileID, setFileID, imagesArr } = require('./model')
const utils = require('./utils')

const getProfileData = async (token) => {
  const decoded = await utils.verifyToken(token)
  return new Promise((resolve, reject) => {
    try {
      if (decoded.success) {
        const userData = decoded.result

        const returnedObj = {
          name: userData.name, // ? sprawdzać czy te zmienne istnieją?
          lastName: userData.lastName,
          email: userData.email
        }

        resolve({ success: true, message: 'Pomyślnie pobrano dane usera', result: returnedObj })
      } else {
        resolve(decoded) // wtedy jest coś nie tak z tokenem
      }
    } catch (error) {
      reject(error)
    }
  })
}

const updateProfileData = async (token, updateData) => {
  const decoded = await utils.verifyToken(token)
  return new Promise((resolve, reject) => {
    try {
      if (decoded.success) {
        const userData = decoded.result
        // ? sprawdzać czy zmienne istnieją? istnieje możliwość też wprowadzenia nowego hasła itp, ale to chyba za duzo roboty na tego jednego patcha

        // logger.log(userData)

        // ! na razie można zmieniać tylko name i lastName

        const userAccount = modifyUserAccount({ id: userData.id, ...updateData })

        resolve({ success: true, message: 'Pomyślnie zaktualizowano dane usera', result: userAccount })
      } else {
        resolve(decoded) // wtedy jest coś nie tak z tokenem
      }
    } catch (error) {
      reject(error)
    }
  })
}

const addProfilePicture = async (req, token) => {
  const decoded = await utils.verifyToken(token) //* teraz można dodawać ile zdjęć się chce do swojego folderu
  return new Promise((resolve, reject) => {
    try {
      if (decoded.success) {
        const userData = decoded.result

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
              logger.log(`\nstworzono plik o nazwie ${filename} w katalogu usera o ID ${userData.id}\n`)
            })
          }
          if (!fs.existsSync(pathname)) {
            fs.mkdir(pathname, (error) => {
              if (error) throw error
              renameFile()
            })
          } else {
            renameFile()
            // logger.info(`katalog ${fields.album} już istnieje`)
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

          resolve({ success: true, message: 'stworzono plik', result: fileData })
        })
      } else {
        resolve(decoded)
      }
      //* uważać na asynchroniczność, ten form.parse sie dlugo robi
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { getProfileData, updateProfileData, addProfilePicture }
