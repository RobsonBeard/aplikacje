// * funkcje do pracy z aplikacją
//---
//* modyfikacje jsona opisującego stan tagów

const logger = require('tracer').colorConsole();

let { rawTagsArr, convertedTagsArr, tagID } = require('./model')

module.exports = {
    getallRaw: () => {
        return new Promise((resolve, reject) => {
            try {
                if (rawTagsArr.length != 0) {
                    resolve({ success: true, message: "operacja powiodła się", result: rawTagsArr })
                }
                else {
                    resolve({ success: false, message: "tablica tagów jest pusta" })
                }
            }
            catch (error) {
                reject(error)
            }
        })
    },
    getall: () => {
        return new Promise((resolve, reject) => {
            try {
                if (convertedTagsArr.length != 0) {
                    resolve({ success: true, message: "operacja powiodła się", result: convertedTagsArr })
                }
                else {
                    resolve({ success: false, message: "tablica tagów jest pusta" })
                }
            }
            catch (error) {
                reject(error)
            }
        })
    },
    getone: (selectedID) => {
        return new Promise((resolve, reject) => {
            try {
                if (convertedTagsArr.length != 0) {
                    let selectedTag = convertedTagsArr.filter((elem) => elem.id === selectedID) //* wyjdzie tablica
                    if (selectedTag.length === 1) {
                        resolve({ success: true, message: "operacja powiodła się", result: selectedTag[0] })
                    }
                    else {
                        if (selectedTag.length != 0) {
                            resolve({ success: false, message: "jest więcej niż 1 tag o danym ID" })
                        }
                        else {
                            resolve({ success: false, message: "nie ma taguo podanym id" })
                        }
                    }
                }
                else {
                    resolve({ success: false, message: "tablica tagów jest pusta" })
                }
            }
            catch (error) {
                reject(error)
            }
        })
    },
    add: (newTagData) => {
        return new Promise((resolve, reject) => {
            try {
                console.log(tagID);
            }
            catch (error) {
                reject(error)
            }
        })
    }
}