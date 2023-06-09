// * funkcje do pracy z aplikacją
// ---
//* modyfikacje jsona opisującego stan plików

// const logger = require('tracer').colorConsole()

const { imagesArr, convertedTagsArr } = require('./model')

const getall = () => {
  return new Promise((resolve, reject) => {
    try {
      if (imagesArr.length === 0) {
        resolve({ success: false, message: 'nie zapisano żadnych zdjęć lub tablica danych jest pusta' })
      }
      resolve({ success: true, message: 'operacja powiodła się', result: imagesArr })
    } catch (error) {
      reject(error)
    }
  }
  )
}

const getone = (selectedID) => {
  return new Promise((resolve, reject) => {
    try {
      if (imagesArr.length === 0) {
        resolve({ success: false, message: 'nie zapisano żadnych zdjęć lub tablica danych jest pusta' })
      }
      const selectedImage = imagesArr.find((elem) => elem.id === selectedID)
      if (selectedImage === undefined) {
        resolve({ success: false, message: 'nie ma zdjęcia o podanym id' })
      }
      resolve({ success: true, message: 'operacja powiodła się', result: selectedImage[0] })
    } catch (error) {
      reject(error)
    }
  })
}

const update = async (modificationData) => {
  const gotImageJSON = await getone(modificationData.id)
  return new Promise((resolve, reject) => {
    try {
      if (!gotImageJSON.success) {
        resolve(gotImageJSON)
      }
      const selectedImage = gotImageJSON.result
      selectedImage.history.push({ status: modificationData.status, timestamp: new Date().getTime() })
      selectedImage.lastChange = modificationData.status

      resolve({ success: true, message: 'zaktualizowano wpis', result: selectedImage })
    } catch (error) {
      reject(error)
    }
  })
}

const addTag = async (modificationData) => {
  const gotImageJSON = await getone(modificationData.id)
  return new Promise((resolve, reject) => {
    try {
      if (!gotImageJSON.success) {
        resolve(gotImageJSON) // wtedy nie znalazł zdjęcia
      }
      const selectedTag = convertedTagsArr.find((elem) => elem.name === modificationData.tag.name)
      if (selectedTag === undefined) {
        resolve({ success: false, message: 'nie ma tagu o takiej nazwie' })
      }
      const selectedImage = gotImageJSON.result
      const findRepeatedTag = selectedImage.tags.find((elem) => elem.name === modificationData.tag.name)
      if (findRepeatedTag !== undefined) {
        resolve({ success: false, message: 'zdjęcie ma już tag o takiej nazwie' })
      }
      selectedImage.tags.push({ name: selectedTag.name, popularity: selectedTag.popularity })
      resolve({ success: true, message: 'dodano tag', result: selectedImage })
    } catch (error) {
      reject(error)
    }
  })
}

const addTagsArr = async (modificationData) => {
  const gotImageJSON = await getone(modificationData.id)
  return new Promise((resolve, reject) => {
    try {
      if (!gotImageJSON.success) {
        resolve(gotImageJSON) // wtedy nie znalazł zdjęcia
      }
      const selectedImage = gotImageJSON.result
      const tagsToAdd = []

      for (let i = 0; i < modificationData.tags.length; i++) {
        const selectedTag = convertedTagsArr.find((elem) => elem.name === modificationData.tags[i].name)
        const findRepeatedTag = selectedImage.tags.find((elem) => elem.name === modificationData.tags[i].name)

        if (selectedTag !== undefined && findRepeatedTag === undefined) {
          tagsToAdd.push({ name: selectedTag.name, popularity: selectedTag.popularity })
        }
      }
      const previousTags = selectedImage.tags
      selectedImage.tags = [...previousTags, ...tagsToAdd]

      resolve({ success: true, message: 'dodano kilka tagów (nie dodaje się tagów powtarzających się lub takich, które nie istnieją w tablicy)', result: selectedImage })
    } catch (error) {
      reject(error)
    }
  })
}

const getImgTags = async (selectedID) => {
  const gotImageJSON = await getone(selectedID)
  return new Promise((resolve, reject) => {
    try {
      if (!gotImageJSON.success) {
        resolve(gotImageJSON)
      }
      const selectedImage = gotImageJSON.result
      const finishObj = { id: selectedImage.id, tags: selectedImage.tags }
      resolve({ success: true, message: 'operacja powiodła się', result: finishObj })
    } catch (error) {
      reject(error)
    }
  })
}

const getallFromDirectory = async (selectedDirectoryName) => {
  const gotAllImagesJSON = await getall()
  return new Promise((resolve, reject) => {
    try {
      if (!gotAllImagesJSON.success) {
        resolve(gotAllImagesJSON)
      }
      const selectedImages = gotAllImagesJSON.result
      const imagesFromDirectory = selectedImages.filter(elem => elem.album === selectedDirectoryName) // wyjdzie tablica

      if (imagesFromDirectory.length === 0) {
        resolve({ success: false, message: 'w podanym albumie nie znajdują się żadne zdjęcia lub ścieżka jest zła' })
      }

      resolve({ success: true, message: 'operacja powiodła się', result: imagesFromDirectory })
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { getall, getone, update, addTag, addTagsArr, getImgTags, getallFromDirectory }
