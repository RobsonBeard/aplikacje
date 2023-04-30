// * funkcje do pracy z aplikacją
//---
//* modyfikacje samych plików (zapis/usunięcie/inne)

const path = require("path");
const fs = require("fs");
const logger = require('tracer').colorConsole();
const formidable = require("formidable");

const imagesArr = require("./model")

let fileID = 0

module.exports = {
    getall: (dirpath) => {
        return new Promise((resolve, reject) => {
            let result = []
            try {
                fs.readdir(dirpath, (err, files) => {
                    if (err) throw err

                    if (files.length !== 0) {
                        for (let i = 0; i < files.length; i++) {
                            let filepath = path.join(dirpath, files[i])
                            let filedata = fs.readFileSync(filepath, { encoding: 'utf-8' })
                            result.push({ title: files[i], description: filedata })
                        }
                        resolve({ success: true, message: "operacja powiodła się", result: result })
                    }
                    else {
                        resolve({ success: false, message: "w folderze nie ma żadnych plików" })
                    }
                })
            }
            catch (err) {
                reject(err)
            }

        })
    },
    getone: (selectedID, dirpath) => {
        return new Promise((resolve, reject) => {
            try {
                fs.readdir(dirpath, (err, files) => {
                    if (err) throw err

                    if (files.length !== 0) {
                        let filesWithIds = files.map((elem) => {
                            let splittedFilename = elem.split('_')
                            return { filename: elem, id: parseFloat(splittedFilename[splittedFilename.length - 2]) } // bo na tym miejscu w tablicy będzie ID
                        })

                        let selectedTask = filesWithIds.filter((elem) => elem.id === selectedID) //* wyjdzie tablica

                        if (selectedTask.length !== 0) {
                            let selectedTaskname = selectedTask[0].filename
                            const filepath = path.join(dirpath, selectedTaskname)
                            let filedata = fs.readFileSync(filepath, { encoding: 'utf-8' })
                            resolve({ success: true, message: `operacja powiodła się`, result: { title: selectedTaskname, description: filedata } })
                        }
                        else {
                            resolve({ success: false, message: "nie ma pliku o podanym id" })
                        }
                    }
                    else {
                        resolve({ success: false, message: "w folderze nie ma żadnych plików" })
                    }

                })
            }
            catch (err) {
                reject(err)
            }
        })
    },
    add: (req, newTask, dirpath) => {
        // return new Promise((resolve, reject) => {
        //     try {
        //         let nazwaPliku = `${newTask.title}_${taskID}_.txt`
        //         const filepath = path.join(dirpath, nazwaPliku)

        //         if (!fs.existsSync(filepath)) {
        //             fs.writeFile(filepath, newTask.description, { encoding: 'utf-8' }, (err) => {
        //                 if (err) throw err;
        //                 logger.info(`stworzono plik o nazwie ${nazwaPliku}`);
        //                 resolve({ success: true, message: `stworzono plik o nazwie ${nazwaPliku}` })
        //             });
        //         }
        //         else {
        //             resolve({ success: false, message: "plik o takiej nazwie już istnieje" })
        //         }

        //         taskID++
        //     }
        //     catch (err) {
        //         reject(err)
        //     }
        // })

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
                        logger.warn(`katalog ${fields.album} już istnieje`)
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

                    resolve({ success: true, message: "stworzono plik", file: fileData })
                });
                //* uważać na asynchroniczność, ten form.parse sie dlugo robi
            }
            catch (error) {
                reject(error)
            }
        })

    },
    delete: (selectedID, dirpath) => {
        return new Promise((resolve, reject) => {
            try {
                fs.readdir(dirpath, (err, files) => {
                    if (err) throw err

                    if (files.length !== 0) {
                        let filesWithIds = files.map((elem) => {
                            let splittedFilename = elem.split('_')
                            return { filename: elem, id: parseFloat(splittedFilename[splittedFilename.length - 2]) } // bo na tym miejscu w tablicy będzie ID
                        })

                        let selectedTask = filesWithIds.filter((elem) => elem.id === selectedID) //* wyjdzie tablica

                        if (selectedTask.length !== 0) {
                            let selectedTaskname = selectedTask[0].filename
                            const filepath = path.join(dirpath, selectedTaskname)
                            fs.unlink(filepath, (err) => {
                                if (err) throw err
                                logger.info(`usunięto plik o nazwie ${selectedTaskname}`)
                                resolve({ success: true, message: `usunięto plik o nazwie ${selectedTaskname}` })
                            })
                        }
                        else {
                            resolve({ success: false, message: "nie ma pliku o podanym id" })
                        }
                    }
                    else {
                        resolve({ success: false, message: "w folderze nie ma żadnych plików" })
                    }

                })
            }
            catch (err) {
                reject(err)
            }
        })
    },
    update: (newTask, dirpath) => {
        return new Promise((resolve, reject) => {
            try {
                fs.readdir(dirpath, (err, files) => {
                    if (err) throw err

                    if (files.length !== 0) {
                        let filesWithIds = files.map((elem) => {
                            let splittedFilename = elem.split('_')
                            return { filename: elem, id: parseFloat(splittedFilename[splittedFilename.length - 2]) } // bo na tym miejscu w tablicy będzie ID
                        })

                        let selectedTask = filesWithIds.filter((elem) => elem.id === newTask.id) //* wyjdzie tablica

                        if (selectedTask.length !== 0) {
                            let selectedTaskname = selectedTask[0].filename
                            const filepath = path.join(dirpath, selectedTaskname)
                            fs.writeFile(filepath, newTask.description, { encoding: 'utf-8' }, (err) => {
                                if (err) throw err
                                logger.info(`zaktualizowano plik o nazwie ${selectedTaskname}`)
                                resolve({ success: true, message: `zaktualizowano plik o nazwie ${selectedTaskname}` })
                            })
                        }
                        else {
                            resolve({ success: false, message: "nie ma pliku o podanym id" })
                        }
                    }
                    else {
                        resolve({ success: false, message: "w folderze nie ma żadnych plików" })
                    }

                })
            }
            catch (err) {
                reject(err)
            }
        })
    },

}
