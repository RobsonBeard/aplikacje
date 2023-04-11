//* funkcje do pracy z aplikacją

const path = require("path");
const fs = require("fs");

let taskID = 0

module.exports = {
    add: (newTask, dirpath) => {
        let nazwaPliku = `${newTask.title}_${taskID}.txt`
        const filepath = path.join(dirpath, nazwaPliku)

        if (!fs.existsSync(filepath)) {
            fs.writeFile(filepath, newTask.description, err => {
                if (err) throw err;
                console.log(`stworzono plik o nazwie ${nazwaPliku}`);
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
    // update: (newTask) => {
    //     let selectedTask = tasks.filter((elem) => elem.id === newTask.id)[0]

    //     if (selectedTask !== undefined) {
    //         tasks = tasks.map((elem) => {
    //             if (elem.id == newTask.id) {
    //                 return newTask
    //             }
    //             else {
    //                 return elem
    //             }
    //         })
    //         return newTask
    //     }
    //     else {
    //         return false
    //     }
    // },
    // getall: () => {
    //     return tasks
    // }
}