// * funkcje do pracy z aplikacją
// ---
//* profile

const logger = require('tracer').colorConsole()
const path = require('path')
const fs = require('fs')
const formidable = require('formidable')

const { modifyUserAccount, getFileID, setFileID, imagesArr } = require('./model')

const getProfileData = async (userData) => { // robic to po ID usera, a nie cookie
  return new Promise((resolve, reject) => {
    try {
      const returnedObj = {
        name: userData.name, // ? sprawdzać czy te zmienne istnieją?
        lastName: userData.lastName,
        email: userData.email
      }
      resolve({ success: true, message: 'Pomyślnie pobrano dane usera', result: returnedObj })
    } catch (error) {
      reject(error)
    }
  })
}

const updateProfileData = async (userData, updateData) => {
  return new Promise((resolve, reject) => {
    try {
      // ? sprawdzać czy zmienne istnieją? istnieje możliwość też wprowadzenia nowego hasła itp, ale to chyba za duzo roboty na tego jednego patcha

      // ! na razie można zmieniać tylko name i lastName

      const userAccount = modifyUserAccount({ id: userData.id, ...updateData })
      resolve({ success: true, message: 'Pomyślnie zaktualizowano dane usera', result: userAccount })
    } catch (error) {
      reject(error)
    }
  })
}

const addProfilePicture = async (req, userData) => {
  return new Promise((resolve, reject) => {
    try {
      const form = formidable({})
      form.multiples = true
      form.keepExtensions = true
      form.uploadDir = __dirname //* bez tego jest błąd polegający na tym, że nie da się robić rename pomiędzy dyskami

      form.parse(req, (error, fields, files) => {
        if (error) throw error
        const pathname = path.join(__dirname, '/profilepictures', `/${userData.id}`)
        const splitURL = files.file.path.split('\\')
        const filename = splitURL[splitURL.length - 1]

        const renameFile = () => {
          fs.rename(files.file.path, path.join(pathname, `/${filename}`), error => {
            if (error) throw error
            logger.log(`\nwstawiono zdjęcie profilowe o nazwie ${filename} w katalogu usera o ID ${userData.id}\n`)
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

        resolve({ success: true, message: 'stworzono plik', result: fileData })
      })
      //* uważać na asynchroniczność, ten form.parse sie dlugo robi
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { getProfileData, updateProfileData, addProfilePicture }
