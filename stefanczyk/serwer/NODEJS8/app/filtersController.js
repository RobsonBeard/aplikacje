// * funkcje do pracy z aplikacją
// ---
//* modyfikacje zdjęć

const sharp = require('sharp') // metody stosowania na https://www.npmjs.com/package/sharp
const logger = require('tracer').colorConsole()

const jsonController = require('./jsonController')

const getMetadata = async (selectedID) => {
  const gotImageJSON = await jsonController.getone(selectedID)
  return new Promise((resolve, reject) => {
    try {
      if (gotImageJSON.success) {
        const selectedImage = gotImageJSON.result

        // const meta = await sharp(selectedImage.url)
        //   .metadata()

        // resolve({ success: true, message: 'test', result: meta }) //* probuje zrobic tak, zeby nie bylo asynca w srodku promisa, jeśli nie będzie działać, to wtedy nie robić promise, tylko na asynchronicznych funkcjach robić if/else

        sharp(selectedImage.url)
          .metadata()
          .then((data) => {
            resolve({ success: true, message: 'operacja powiodła się', result: data })
          })
      } else {
        resolve(gotImageJSON) // wtedy nie znalazł zdjęcia
      }
    } catch (error) {
      reject(error)
    }
  })
}

const makeFilteredImage = async (modificationData) => {
  const gotImageJSON = await jsonController.getone(modificationData.id)
  return new Promise((resolve, reject) => { // TODO: sprawdzac czy zmienne zostaly ustawione
    try {
      if (gotImageJSON.success) {
        const selectedImage = gotImageJSON.result

        const originalURL = selectedImage.url

        const splitURL = originalURL.split('.')
        const extension = splitURL.pop()
        const joinedURL = splitURL.join('.')
        const newURL = `${joinedURL}-${modificationData.status}.${extension}`
        let newFormatURL
        // TODO: to nie jest zrobione tak jak byc powinno. jak zrobie kilka razy tinta, to chyba powinno sie wygenerowac kilka kopii zdjecia i w updacie historii w jsonie powinny byc osobne urle do tego. np: robie tinta na czerwono, a potem znowu, tylko ze na zielono. oba linki beda prowadzic do zielonego zdjecia

        const updateImageHistory = () => {
          selectedImage.history.push({ status: modificationData.status, timestamp: new Date().getTime(), url: newURL })
          selectedImage.lastChange = modificationData.status
        } // mogłem to zrobić jsonController.update(), ale tam nie ma url'a

        const parameters = modificationData.params

        switch (modificationData.status) {
          case 'tint':
            if (parameters.red !== undefined && parameters.green !== undefined && parameters.blue !== undefined) {
              sharp(originalURL)
                .tint({ r: parameters.red, g: parameters.green, b: parameters.blue })
                .toFile(newURL)
                .then(() => {
                  updateImageHistory()
                  resolve({ success: true, message: `${modificationData.status} zakończono pomyślnie`, result: selectedImage })
                })
                .catch(error => logger.log(error))
            } else {
              resolve({ success: false, message: 'proszę wprowadzić odpowiednie dane' })
            }
            break
          case 'rotate':
            if (parameters.degrees !== undefined) {
              sharp(originalURL)
                .rotate(parameters.degrees)
                .toFile(newURL)
                .then(() => {
                  updateImageHistory()
                  resolve({ success: true, message: `${modificationData.status} zakończono pomyślnie`, result: selectedImage })
                })
                .catch(error => logger.log(error))
            } else {
              resolve({ success: false, message: 'proszę wprowadzić odpowiednie dane' })
            }
            break
          case 'resize':
            if (parameters.width !== undefined && parameters.height !== undefined) {
              sharp(originalURL)
                .resize({ width: parameters.width, height: parameters.height })
                .toFile(newURL)
                .then(() => {
                  updateImageHistory()
                  resolve({ success: true, message: `${modificationData.status} zakończono pomyślnie`, result: selectedImage })
                })
                .catch(error => logger.log(error))
            } else {
              resolve({ success: false, message: 'proszę wprowadzić odpowiednie dane' })
            }
            break
          case 'reformat':
            if (parameters.newFormat !== undefined) {
              newFormatURL = `${joinedURL}-${modificationData.status}.${parameters.newFormat}`
              sharp(originalURL)
                .toFormat(parameters.newFormat)
                .toFile(newFormatURL)
                .then(() => {
                  selectedImage.history.push({ status: modificationData.status, timestamp: new Date().getTime(), url: newFormatURL })
                  selectedImage.lastChange = modificationData.status // nie uzywam funkcji bo musze uzyc innego urla
                  resolve({ success: true, message: `${modificationData.status} zakończono pomyślnie`, result: selectedImage })
                })
                .catch(error => logger.log(error))
            } else {
              resolve({ success: false, message: 'proszę wprowadzić odpowiednie dane' })
            }
            break
          case 'crop':
            if (parameters.width !== undefined && parameters.height !== undefined && parameters.left !== undefined && parameters.top !== undefined) {
              sharp(originalURL)
                .extract({ width: parameters.width, height: parameters.height, left: parameters.left, top: parameters.top })
                .toFile(newURL)
                .then(() => {
                  updateImageHistory()
                  resolve({ success: true, message: `${modificationData.status} zakończono pomyślnie`, result: selectedImage })
                })
                .catch(error => logger.log(error))
            } else {
              resolve({ success: false, message: 'proszę wprowadzić odpowiednie dane' })
            }
            break
          case 'grayscale':
            sharp(originalURL)
              .grayscale()
              .toFile(newURL)
              .then(() => {
                updateImageHistory()
                resolve({ success: true, message: `${modificationData.status} zakończono pomyślnie`, result: selectedImage })
              })
              .catch(error => logger.log(error))
            break
          case 'flip':
            sharp(originalURL)
              .flip()
              .toFile(newURL)
              .then(() => {
                updateImageHistory()
                resolve({ success: true, message: `${modificationData.status} zakończono pomyślnie`, result: selectedImage })
              })
              .catch(error => logger.log(error))
            break
          case 'flop':
            sharp(originalURL)
              .flop()
              .toFile(newURL)
              .then(() => {
                updateImageHistory()
                resolve({ success: true, message: `${modificationData.status} zakończono pomyślnie`, result: selectedImage })
              })
              .catch(error => logger.log(error))
            break
          case 'negate':
            sharp(originalURL)
              .negate()
              .toFile(newURL)
              .then(() => {
                updateImageHistory()
                resolve({ success: true, message: `${modificationData.status} zakończono pomyślnie`, result: selectedImage })
              })
              .catch(error => logger.log(error))
            break
          default:
            resolve({ success: false, message: 'nie wybrano metody operacji na zdjęciu lub jest ona nieznana' })
        }
      } else {
        resolve(gotImageJSON) // wtedy nie znalazł zdjęcia
      }
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { getMetadata, makeFilteredImage }
