// * funkcje do pracy z aplikacją
// ---
//* modyfikacje zdjęć

const sharp = require('sharp')
const fs = require('fs')
const logger = require('tracer').colorConsole()

const jsonController = require('./jsonController')

const getMetadata = async (selectedID) => {
  const gotImageJSON = await jsonController.getone(selectedID)
  return new Promise(async (resolve, reject) => { //TODO: sprawdzic czy standard tego nie lubi, jak nie to https://www.npmjs.com/package/sharp i sprobowac inny sposob
    try {
      if (gotImageJSON.success) {
        const selectedImage = gotImageJSON.result

        const meta = await sharp(selectedImage.url)
          .metadata()

        resolve({ success: true, message: "test", result: meta })
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
  return new Promise(async (resolve, reject) => {
    try {
      if (gotImageJSON.success) { // TODO: trzeba użyć metody update z jsonControllera
        const selectedImage = gotImageJSON.result

        let originalURL = selectedImage.url // TODO: chyba lepiej da się odciąć rozszerzenie

        let newURL = originalURL.split(".")
        let extension = newURL.pop()
        newURL = newURL.join(".")
        newURL = `${newURL}-${modificationData.status}.${extension}`

        logger.log(newURL)
        // logger.log(extension)

        // const filteredImage = await sharp(originalURL)
        //   .tint({ r: 255, g: 0, b: 0 })
        //   .toFile("url");

        resolve({ success: true, message: "test", result: "filteredImage" })
      } else {
        resolve(gotImageJSON) // wtedy nie znalazł zdjęcia
      }
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { getMetadata, makeFilteredImage }