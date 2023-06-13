// * funkcje do pracy z aplikacją
// ---
//* wyświetlanie zdjęcia za pomocą id

const logger = require('tracer').colorConsole()

const jsonController = require('./jsonController')

const getImageByID = async (selectedID) => {
  const gotImageJSON = await jsonController.getone(selectedID)
  return new Promise((resolve, reject) => {
    try {
      if (!gotImageJSON.success) {
        resolve(gotImageJSON) // wtedy nie znalazł zdjęcia
      }
      const selectedImage = gotImageJSON.result
      logger.log(selectedImage)

      resolve({ success: true, message: 'operacja powiodła się', result: selectedImage.url })
    } catch (error) {
      reject(error)
    }
  })
}

const getImageWithFilterByID = async (selectedID, selectedFilterName) => {
  const gotImageJSON = await jsonController.getone(selectedID)
  return new Promise((resolve, reject) => {
    try {
      if (!gotImageJSON.success) {
        resolve(gotImageJSON) // wtedy nie znalazł zdjęcia
      }
      const selectedImage = gotImageJSON.result
      const filterData = selectedImage.history.filter((elem) => elem.status === selectedFilterName) // wyjdzie tablica, mozna zrobic findem, jesli zalozenia sie nie zmienia(todo ponizej)
      if (filterData.length === 0) {
        resolve({ success: false, message: 'nie znaleziono wersji zdjęcia z takim filtrem' })
      }
      resolve({ success: true, message: 'operacja powiodła się', result: filterData[0].url }) // TODO: tu znowu zakładamy że jest tylko jedna wersja z danym filtrem, może przerobic w przyszlosci
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { getImageByID, getImageWithFilterByID }
