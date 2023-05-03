// * funkcje do pracy z aplikacją
//---
//* modyfikacje samych plików (zapis/usunięcie/inne)

const path = require("path");
const fs = require("fs");
const logger = require('tracer').colorConsole();
const formidable = require("formidable");

let imagesArr = require("./model")

//TODO: TE IMAGES ARR Z DWOCH CONTROLLEROW SIE NIE LACZA, METODY Z NICH ZE SOBA NIE WSPOLPRACUJA

let fileID = 0

module.exports = {
    add: (req) => {
        return new Promise((resolve, reject) => {
            try {
                let form = formidable({})
                form.multiples = true;
                form.keepExtensions = true;
                form.uploadDir = __dirname //* bez tego jest błąd polegający na tym, że nie da się robić rename pomiędzy dyskami

                form.parse(req, (err, fields, files) => {
                    if (err) throw err
                    const pathname = path.join(__dirname, "/upload", `/${fields.album}`)
                    let filename = files.file.path.split("\\")
                    filename = filename[filename.length - 1]

                    let renameFile = () => {
                        fs.rename(files.file.path, path.join(pathname, `/${filename}`), (err => {
                            if (err) throw err
                            logger.log(`\nstworzono plik o nazwie ${filename} w katalogu ${fields.album}\n`)
                        }))
                    }

                    if (!fs.existsSync(pathname)) {
                        fs.mkdir(pathname, (err) => {
                            if (err) throw err
                            renameFile()
                        })
                    }
                    else {
                        renameFile()
                        logger.info(`katalog ${fields.album} już istnieje`)
                    }

                    let fileData = {
                        id: fileID,
                        album: fields.album,
                        originalname: files.file.name,
                        url: path.join(pathname, `/${filename}`),
                        lastChange: "original",
                        history: [
                            {
                                status: "original",
                                timestamp: files.file.lastModifiedDate
                            }
                        ]
                    }
                    imagesArr.push(fileData)
                    fileID++
                    console.log(imagesArr);

                    resolve({ success: true, message: "stworzono plik", file: fileData })
                });
                //* uważać na asynchroniczność, ten form.parse sie dlugo robi
            }
            catch (error) {
                reject(error)
            }
        })
    },
    delete: (selectedID) => {
        return new Promise((resolve, reject) => {
            try {
                if (imagesArr.length != 0) {
                    let selectedImage = imagesArr.filter((elem) => elem.id === selectedID) //* wyjdzie tablica
                    if (selectedImage.length === 1) {

                        // logger.log(imagesArr)

                        fs.unlinkSync(selectedImage[0].url)
                        // let filename = selectedImage[0].url.split("\\")
                        // filename = filename[filename.length - 1]
                        // logger.log(`\nusunięto plik o nazwie ${filename} z katalogu ${selectedImage[0].album}\n`)

                        imagesArr = imagesArr.filter((elem) => elem.id !== selectedID)

                        // logger.log(imagesArr)

                        resolve({ success: true, message: "usunięto plik", files: imagesArr })
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
