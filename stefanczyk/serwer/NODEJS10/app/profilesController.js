// * funkcje do pracy z aplikacją
// ---
//* profile

const logger = require('tracer').colorConsole()
const path = require('path')
const fs = require('fs-extra')
const formidable = require('formidable')
const userdataController = require('./userdataController')

const { modifyUserAccount, getFileID, setFileID, imagesArr } = require('./model')

const getProfileData = async (userData) => { // robic to po ID usera, a nie cookie
  const user = userdataController.getOneUser(userData.id)
  return new Promise((resolve, reject) => {
    try {
      if (!user.success) {
        resolve(user)
      }
      const returnedObj = {
        name: user.result.name,
        lastName: user.result.lastName,
        email: user.result.email
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

const getProfilePicture = (selectedID) => {
  return new Promise((resolve, reject) => {
    try {
      const selectedImage = imagesArr.find((elem) => { return (elem.album === selectedID && elem.isProfilePicture) })
      // logger.log(selectedImage)
      if (selectedImage === undefined) {
        resolve({ success: false, message: 'nie znaleziono zdjęcia profilowego' })
      }
      resolve({ success: true, message: 'operacja powiodła się', result: selectedImage.url })
    } catch (error) {
      reject(error)
    }
  })
}

const deletePreviousProfilePicture = async (selectedID) => {
  return new Promise((resolve, reject) => {
    try {
      for (let i = 0; i < imagesArr.length; i++) {
        if (imagesArr[i].album === selectedID && imagesArr[i].isProfilePicture) {
          imagesArr.splice(i, 1)
        }
      }
      resolve({ success: true, message: 'usunięto json poprzedniego zdjęcia profilowego' })
    }
    catch (error) {
      reject(error)
    }
  })
}

const addProfilePicture = async (req, userData) => {
  let previousPfpErasedInfo = deletePreviousProfilePicture(userData.id)
  return new Promise((resolve, reject) => {
    try {
      if (!previousPfpErasedInfo.success) {
        resolve(previousPfpErasedInfo)
      }
      const form = formidable({})
      form.multiples = true
      form.keepExtensions = true
      form.uploadDir = __dirname //* bez tego jest błąd polegający na tym, że nie da się robić rename pomiędzy dyskami

      form.parse(req, (error, fields, files) => {
        if (error) throw error
        const pathname = path.join(__dirname, '/profilepictures', `/${userData.id}`)

        fs.emptyDirSync(pathname) // !

        logger.log(`usunięto poprzednie zdjęcie profilowe użytkownika o ID ${userData.id}`)

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
        } // to jest po to, żeby był dobry katalog w upload

        const fileData = {
          id: getFileID(),
          album: userData.id,
          originalname: files.file.name,
          url: path.join(pathname, `/${filename}`),
          lastChange: 'original',
          isProfilePicture: true,
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

module.exports = { getProfileData, updateProfileData, addProfilePicture, getProfilePicture }
