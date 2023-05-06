// * funkcje do pracy z aplikacją
// ---
//* modyfikacje jsona opisującego stan tagów

// const logger = require('tracer').colorConsole()

// let { rawTagsArr, convertedTagsArr, tagID } = require('./model')

const { rawTagsArr, convertedTagsArr, getTagID, setTagID } = require('./model')

module.exports = {
  getallRaw: () => {
    return new Promise((resolve, reject) => {
      try {
        if (rawTagsArr.length !== 0) {
          resolve({ success: true, message: 'operacja powiodła się', result: rawTagsArr })
        } else {
          resolve({ success: false, message: 'tablica tagów jest pusta' })
        }
      } catch (error) {
        reject(error)
      }
    })
  },
  getall: () => {
    return new Promise((resolve, reject) => {
      try {
        if (convertedTagsArr.length !== 0) {
          resolve({ success: true, message: 'operacja powiodła się', result: convertedTagsArr })
        } else {
          resolve({ success: false, message: 'tablica tagów jest pusta' })
        }
      } catch (error) {
        reject(error)
      }
    })
  },
  getone: (selectedID) => {
    return new Promise((resolve, reject) => {
      try {
        if (convertedTagsArr.length !== 0) {
          const selectedTag = convertedTagsArr.filter((elem) => elem.id === selectedID) //* wyjdzie tablica
          if (selectedTag.length === 1) {
            resolve({ success: true, message: 'operacja powiodła się', result: selectedTag[0] })
          } else {
            if (selectedTag.length !== 0) {
              resolve({ success: false, message: 'jest więcej niż 1 tag o danym ID' })
            } else {
              resolve({ success: false, message: 'nie ma taguo podanym id' })
            }
          }
        } else {
          resolve({ success: false, message: 'tablica tagów jest pusta' })
        }
      } catch (error) {
        reject(error)
      }
    })
  },
  add: (newTagData) => { // TODO: można też dodać warunek, że długość name>2 i popularity>0 i musi zaczynać się od #
    return new Promise((resolve, reject) => {
      try {
        if (rawTagsArr.find((elem) => elem === newTagData.name) === undefined) {
          rawTagsArr.push(newTagData.name)

          const newTag = {
            id: getTagID(),
            name: newTagData.name,
            popularity: newTagData.popularity
          }

          convertedTagsArr.push(newTag)
          setTagID(getTagID() + 1)

          resolve({ success: true, message: 'operacja powiodła się', result: newTag })
        } else {
          resolve({ success: false, message: 'tag o takiej nazwie już istnieje' })
        }
      } catch (error) {
        reject(error)
      }
    })
  }
}
