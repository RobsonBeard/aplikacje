// * funkcje do pracy z aplikacją
//---
//* modyfikacje jsona opisującego stan plików

const logger = require('tracer').colorConsole();

let imagesArr = require('./model')

module.exports = {
    getall: () => {
        return new Promise((resolve, reject) => {
            try {
                if (imagesArr.length != 0) {
                    resolve({ success: true, message: "operacja powiodła się", result: imagesArr })
                }
                else {
                    resolve({ success: false, message: "nie zapisano żadnych plików lub tablica danych jest pusta" })
                }
            }
            catch (err) {
                reject(err)
            }
        }
        )
    },
    getone: (selectedID) => {
        return new Promise((resolve, reject) => {
            try {
                if (imagesArr.length != 0) {
                    let selectedImage = imagesArr.filter((elem) => elem.id === selectedID) //* wyjdzie tablica
                    if (selectedImage.length === 1) {
                        resolve({ success: true, message: "operacja powiodła się", result: selectedImage[0] })
                    }
                    else {
                        if (selectedImage.length != 0) {
                            resolve({ success: false, message: "jest więcej niż 1 plik o danym ID" })
                        }
                        else {
                            resolve({ success: false, message: "nie ma pliku o podanym id" })
                        }
                    }
                }
                else {
                    resolve({ success: false, message: "nie zapisano żadnych plików lub tablica danych jest pusta" })
                }
            }
            catch (error) {
                reject(error)
            }
        })
    },
    update: (modificationData) => {
        return new Promise((resolve, reject) => {
            try {
                if (imagesArr.length != 0) {
                    let selectedImage = imagesArr.filter((elem) => elem.id === modificationData.id) //* wyjdzie tablica
                    if (selectedImage.length === 1) {
                        selectedImage[0].history.push({ status: modificationData.status, timestamp: new Date().getTime() })
                        selectedImage[0].lastChange = modificationData.status

                        resolve({ success: true, message: "zaktualizowano wpis", result: selectedImage[0] })
                    }
                    else {
                        if (selectedImage.length != 0) {
                            resolve({ success: false, message: "jest więcej niż 1 plik o danym ID" })
                        }
                        else {
                            resolve({ success: false, message: "nie ma pliku o podanym id" })
                        }
                    }
                }
                else {
                    resolve({ success: false, message: "nie zapisano żadnych plików lub tablica danych jest pusta" })
                }
            }
            catch (err) {
                reject(err)
            }
        })
    },
}