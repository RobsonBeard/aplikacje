//* funkcje do pracy z aplikacją

const model = require("./model")

let tasks = model.tasks
let taskID = tasks.sort((a, b) => { return b.id - a.id })[0].id + 1 // sortuje wstępną tablicę po ID i wybiera najwyższe, dodaje 1, żeby można było go użyć do następnego obiektu

// console.log(model.tasks); // nie wiem czemu, ale ta wstępna tablica już została posortowana 
tasks.sort((a, b) => { return a.id - b.id }) // więc to odwracam
// console.log(model.tasks);

module.exports = {
    add: (newTask) => {
        newTask.id = taskID
        taskID++
        tasks.push(newTask)
    },
    getID: () => {
        return taskID
    },
    delete: (selectedID) => {
        tasks = tasks.filter(elem => selectedID !== elem.id)
    },
    update: (newTask) => {
        let selectedTask = tasks.filter((elem) => elem.id === newTask.id)[0]

        if (selectedTask !== undefined) {
            tasks = tasks.map((elem) => {
                if (elem.id == newTask.id) {
                    return newTask
                }
                else {
                    return elem
                }
            })
            return newTask
        }
        else {
            return false
        }
    },
    getall: () => {
        return tasks
    }
}