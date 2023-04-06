//* funkcje do pracy z aplikacją

const model = require("./model") 

let animalsArray = model.animalsArray
let animalID = 0

module.exports = {
    add: (animal, color) => {
        animalsArray.push(new model.Animal(animal, color, animalID))
        animalID++
    },
    delete: (selectedID) => {
        animalsArray = animalsArray.filter(elem => selectedID !== elem.id)
    },
    update: (selectedID) => {
        animalsArray = animalsArray.filter((elem) => {
            if (elem.id == selectedID) {
                elem.name = "ZYRAFA"
                elem.color = "POMARANCZOWO-CZARNA"
                return elem
            }
            else {
                return elem
            }
        })
    },
    getall: () => {
        return animalsArray
    }
}