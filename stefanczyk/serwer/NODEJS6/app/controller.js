//* funkcje do pracy z aplikacją

const logger = require('tracer').colorConsole();
const path = require("path");
const fs = require("fs");

let taskID = 0

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
    add: (newTask, dirpath) => {
        return new Promise((resolve, reject) => {
            try {
                let nazwaPliku = `${newTask.title}_${taskID}_.txt`
                const filepath = path.join(dirpath, nazwaPliku)

                if (!fs.existsSync(filepath)) {
                    fs.writeFile(filepath, newTask.description, { encoding: 'utf-8' }, (err) => {
                        if (err) throw err;
                        logger.info(`stworzono plik o nazwie ${nazwaPliku}`);
                        resolve({ success: true, message: `stworzono plik o nazwie ${nazwaPliku}` })
                    });
                }
                else {
                    resolve({ success: false, message: "plik o takiej nazwie już istnieje" })
                }

                taskID++
            }
            catch (err) {
                reject(err)
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