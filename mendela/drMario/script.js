// inny serwer do kompilowania scss: Live Sass Compiler
// dobra wtyczka: SCSS IntelliSense
class Ui {
    constructor() {
        this.plansza = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ];
        this.DLUGOSC = this.plansza.length;
        this.SZEROKOSC = this.plansza[0].length;
        this.stworzPlansze();
    }
    stworzPlansze() {
        var _a;
        for (let i = 0; i < this.DLUGOSC; i++) {
            for (let j = 0; j < this.SZEROKOSC; j++) {
                let malyDiv = document.createElement("div");
                malyDiv.setAttribute("id", `${i}_${j}`);
                malyDiv.classList.add("divPole");
                (_a = document.getElementById("divMain")) === null || _a === void 0 ? void 0 : _a.appendChild(malyDiv);
            }
        }
    }
}
class Game {
    constructor() {
        this.licznik = 0;
        this.zacznijInterval = setInterval(this.zacznijGre, 1000);
    }
    zacznijGre() {
        ui.plansza[this.licznik][3];
        this.licznik++;
    }
}
const ui = new Ui();
const game = new Game();
