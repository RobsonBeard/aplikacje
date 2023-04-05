//* dane dla aplikacji

class Animal {
    constructor(name = "koza", color = "zielona") {

        this.name = name;
        this.color = color;

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