//* funkcje do pracy z aplikacją

const logger = require('tracer').colorConsole();
const path = require("path");
const fs = require("fs");

let taskID = 0

module.exports = {
    add: (newTask, dirpath) => {
        let nazwaPliku = `${newTask.title}_${taskID}_.txt`
        const filepath = path.join(dirpath, nazwaPliku)

        if (!fs.existsSync(filepath)) {
            fs.writeFile(filepath, newTask.description, err => {
                if (err) throw err;
                logger.info(`stworzono plik o nazwie ${nazwaPliku}`);
            });
        }

        taskID++
    },
    // getID: () => {
    //     return taskID
    // },
    // delete: (selectedID) => {
    //     tasks = tasks.filter(elem => selectedID !== elem.id)
    // },
    update: (newTask, dirpath) => {
        return new Promise((resolve, reject) => {

            try {
                fs.readdir(dirpath, (err, files) => {
                    if (err) throw err
                    // logger.log(files)

                    if (files !== []) {
                        let filesWithIds = files.map((elem) => {
                            let splittedFilename = elem.split('_')
                            return { filename: elem, id: parseFloat(splittedFilename[splittedFilename.length - 2]) }
                        })

                        let selectedTaskname = filesWithIds.filter((elem) => elem.id === newTask.id)[0].filename

                        if (selectedTaskname !== undefined) {
                            const filepath = path.join(dirpath, selectedTaskname)
                            fs.writeFile(filepath, newTask.description, (err) => {
                                if (err) throw err
                                logger.info(`zaktualizowano plik o nazwie ${selectedTaskname}`)
                            })
                            resolve({ success: true, message: "aktualizacja pliku udana" })
                        }
                        else {
                            resolve({ success: false, message: "nie ma pliku o podanym id" })
                        }
                    }
                    else {
                        resolve({ success: false, message: "w folderze nie ma żadnych plików" })
                    }

                }) //TODO: pusta tablica plikow lub wczytanie takiego ktorego nie ma wywala calosc naprawic to
            }
            catch (err) {
                reject(err)
            }
        })

        // let selectedTask = tasks.filter((elem) => elem.id === newTask.id)[0]

        // if (selectedTask !== undefined) {
        //     tasks = tasks.map((elem) => {
        //         if (elem.id == newTask.id) {
        //             return newTask
        //         }
        //         else {
        //             return elem
        //         }
        //     })
        //     return newTask
        // }
        // else {
        //     return false
        // }
    },
    // getall: () => {
    //     return tasks
    // }
}