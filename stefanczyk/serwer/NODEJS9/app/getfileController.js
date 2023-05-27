// * funkcje do pracy z aplikacją
// ---
//* wyświetlanie zdjęcia za pomocą id

const logger = require('tracer').colorConsole()

const jsonController = require('./jsonController')

const getImageByID = async (selectedID) => {
  const gotImageJSON = await jsonController.getone(selectedID)
  return new Promise((resolve, reject) => {
    try {
      if (gotImageJSON.success) {
        const selectedImage = gotImageJSON.result

        resolve({ success: true, message: 'operacja powiodła się', result: selectedImage.url })
      } else {
        resolve(gotImageJSON) // wtedy nie znalazł zdjęcia
      }
    } catch (error) {
      reject(error)
    }
  })
}

const getImageWithFilterByID = async (selectedID, selectedFilterName) => {
  const gotImageJSON = await jsonController.getone(selectedID)
  return new Promise((resolve, reject) => {
    try {
      if (gotImageJSON.success) {
        const selectedImage = gotImageJSON.result
        let filterData = selectedImage.history.filter((elem) => elem.status === selectedFilterName) // wyjdzie tablica
        if (filterData.length !== 0) {
          resolve({ success: true, message: 'operacja powiodła się', result: filterData[0].url }) //TODO: tu znowu zakładamy że jest tylko jedna wersja z danym filtrem, może przerobic w przyszlosci
        }
        else {
          resolve({ success: false, message: 'nie znaleziono wersji zdjęcia z takim filtrem' })
        }
      } else {
        resolve(gotImageJSON) // wtedy nie znalazł zdjęcia
      }
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { getImageByID, getImageWithFilterByID }