//* dane dla aplikacji

class Animal {
    constructor(name = "koza", color = "zielona", id) {

        this.name = name;
        this.color = color;
        this.id = id

        if (this.name === "") {
            this.name = "koza"
        }
        if (this.color === "") {
            this.color = "zielona"
        }
    }

    //     ... inne potrzebne funkcje

}

let animalsArray = []

module.exports = { Animal, animalsArray };