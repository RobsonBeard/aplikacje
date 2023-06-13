// * funkcje do pracy z aplikacją
// ---
//* modyfikacje jsona opisującego stan tagów

// const logger = require('tracer').colorConsole()

const { rawTagsArr, convertedTagsArr, getTagID, setTagID } = require('./model')

const getallRaw = () => {
  return new Promise((resolve, reject) => {
    try {
      if (rawTagsArr.length === 0) {
        resolve({ success: false, message: 'tablica tagów jest pusta' })
      }
      resolve({ success: true, message: 'operacja powiodła się', result: rawTagsArr })
    } catch (error) {
      reject(error)
    }
  })
}

const getall = () => {
  return new Promise((resolve, reject) => {
    try {
      if (convertedTagsArr.length === 0) {
        resolve({ success: false, message: 'tablica tagów jest pusta' })
      }
      resolve({ success: true, message: 'operacja powiodła się', result: convertedTagsArr })
    } catch (error) {
      reject(error)
    }
  })
}

const getone = (selectedID) => {
  return new Promise((resolve, reject) => {
    try {
      if (convertedTagsArr.length === 0) {
        resolve({ success: false, message: 'tablica tagów jest pusta' })
      }
      const selectedTag = convertedTagsArr.find((elem) => elem.id === selectedID)
      if (selectedTag === undefined) {
        resolve({ success: false, message: 'nie ma tagu o podanym id' })
      }
      resolve({ success: true, message: 'operacja powiodła się', result: selectedTag[0] })
    } catch (error) {
      reject(error)
    }
  })
}

const add = (newTagData) => { // TODO: można też dodać warunek, że długość name>2 i popularity>0 i musi zaczynać się od #
  return new Promise((resolve, reject) => {
    try {
      if (rawTagsArr.find((elem) => elem === newTagData.name) !== undefined) {
        resolve({ success: false, message: 'tag o takiej nazwie już istnieje' })
      }
      rawTagsArr.push(newTagData.name)

      const newTag = {
        id: getTagID(),
        name: newTagData.name,
        popularity: newTagData.popularity
      }

      convertedTagsArr.push(newTag)
      setTagID(getTagID() + 1)

      resolve({ success: true, message: 'dodano nowy tag', result: newTag })
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { getallRaw, getall, getone, add }
