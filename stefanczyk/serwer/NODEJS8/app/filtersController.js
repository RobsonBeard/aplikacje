// * funkcje do pracy z aplikacją
// ---
//* modyfikacje zdjęć

const sharp = require('sharp') // metody stosowania na https://www.npmjs.com/package/sharp
// const logger = require('tracer').colorConsole()

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
            resolve({ success: true, message: 'test', result: data })
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
  return new Promise((resolve, reject) => { // TODO: zrobic tak, zeby mozna bylo np. ustawic dowolny kolor, sprawdzac czy zmienne zostaly ustawione
    try {
      if (gotImageJSON.success) {
        const selectedImage = gotImageJSON.result

        const originalURL = selectedImage.url // TODO: chyba lepiej da się odciąć rozszerzenie

        let newURL = originalURL.split('.')
        const extension = newURL.pop()
        newURL = newURL.join('.')
        newURL = `${newURL}-${modificationData.status}.${extension}`

        // TODO: to nie jest zrobione tak jak byc powinno. jak zrobie kilka razy tinta, to chyba powinno sie wygenerowac kilka kopii zdjecia i w updacie historii w jsonie powinny byc osobne urle do tego. np: robie tinta na czerwono, a potem znowu, tylko ze na zielono. oba linki beda prowadzic do zielonego zdjecia

        const updateImageHistory = () => {
          selectedImage.history.push({ status: modificationData.status, timestamp: new Date().getTime(), url: newURL })
          selectedImage.lastChange = modificationData.status
        } // mogłem to zrobić jsonController.update(), ale tam nie ma url'a

        switch (modificationData.status) {
          case 'tint':
            sharp(originalURL)
              .tint({ r: modificationData.params.red, g: modificationData.params.green, b: modificationData.params.blue })
              .toFile(newURL)
              .then(async () => {
                updateImageHistory()
                resolve({ success: true, message: `${modificationData.status} zakończono pomyślnie`, result: selectedImage })
              })
            break
          // TODO: reszta operacji
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
