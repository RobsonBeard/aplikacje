//* funkcje do pracy z aplikacją

const model = require("./model") // załącz klasę Animal i tablicę zwierząt

let animalsArray = model.animalsArray

module.exports = {
    add: (animal, color) => {
        // utwórz obiekt klasy Animal
        // dodaj do animalsArray
        animalsArray.push(new model.Animal(animal, color))
        // console.log(animalsArray);
    },
    delete: (id) => {
        // usuwanie po id z animalsArray
    },
    update: (id) => {
        // update po id elementu animalsArray
    },
    getall: () => {
        return animalsArray
    }
}