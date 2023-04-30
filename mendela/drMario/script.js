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
        this.DLUGOSC = this.plansza.length; //16
        this.SZEROKOSC = this.plansza[0].length; //8
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
        this.zacznijGre = () => {
            this.kolor1 = this.getRndInteger(1, 3);
            this.kolor2 = this.getRndInteger(1, 3);
            ui.plansza[this.rzad1][this.kolumna1] = this.kolor1;
            ui.plansza[this.rzad2][this.kolumna2] = this.kolor2;
            this.koloruj();
            this.zacznijSpadac = setInterval(() => this.spadanie(this.kolor1, this.kolor2), 500);
            this.ruszanieKlawiszami = (e) => {
                // console.log(e.code);
                switch (e.code) {
                    case "KeyS":
                        // console.log("s");
                        // if (this.rzad1 < ui.DLUGOSC - 1) {
                        //     ui.plansza[this.rzad1][this.kolumna1] = 0
                        //     ui.plansza[this.rzad1][this.kolumna2] = 0
                        //     this.rzad1++
                        //     ui.plansza[this.rzad1][this.kolumna1] = 1
                        //     ui.plansza[this.rzad1][this.kolumna2] = 1
                        //     // console.log(this.rzad1);
                        // }
                        break;
                    case "KeyA": //TODO: licznik rotacji i obracanie, a potem lepszy warunek w spadaniu
                        if (this.kolumna1 > 0 && ui.plansza[this.rzad1][this.kolumna1 - 1] == 0) {
                            ui.plansza[this.rzad1][this.kolumna1] = 0;
                            ui.plansza[this.rzad2][this.kolumna2] = 0;
                            this.kolumna1--;
                            this.kolumna2--;
                            ui.plansza[this.rzad1][this.kolumna1] = this.kolor1;
                            ui.plansza[this.rzad2][this.kolumna2] = this.kolor2;
                            this.koloruj();
                        }
                        break;
                    case "KeyD":
                        if (this.kolumna2 < ui.SZEROKOSC - 1 && ui.plansza[this.rzad2][this.kolumna2 + 1] == 0) {
                            ui.plansza[this.rzad1][this.kolumna1] = 0;
                            ui.plansza[this.rzad2][this.kolumna2] = 0;
                            this.kolumna1++;
                            this.kolumna2++;
                            ui.plansza[this.rzad1][this.kolumna1] = this.kolor1;
                            ui.plansza[this.rzad2][this.kolumna2] = this.kolor2;
                            this.koloruj();
                        }
                        break;
                    case "KeyW":
                        this.licznikObrotu++;
                        if (this.licznikObrotu == 4) {
                            this.licznikObrotu = 0;
                        }
                        this.obracaj(this.licznikObrotu);
                        this.koloruj();
                        break;
                    default:
                        console.log("nie ma takiego przycisku");
                        break;
                }
            };
            document.addEventListener("keydown", this.ruszanieKlawiszami);
        };
        this.spadanie = (kolor1, kolor2) => {
            if (this.rzad1 < ui.DLUGOSC - 1 &&
                ui.plansza[this.rzad1 + 1][this.kolumna1] == 0
                && ui.plansza[this.rzad2 + 1][this.kolumna2] == 0) {
                ui.plansza[this.rzad1][this.kolumna1] = 0;
                ui.plansza[this.rzad2][this.kolumna2] = 0;
                this.rzad1++;
                this.rzad2++;
                ui.plansza[this.rzad1][this.kolumna1] = kolor1;
                ui.plansza[this.rzad2][this.kolumna2] = kolor2;
                this.koloruj();
            }
            else {
                document.removeEventListener("keydown", this.ruszanieKlawiszami);
                this.rzad1 = 0;
                this.rzad2 = 0;
                this.kolumna1 = 3;
                this.kolumna2 = 4;
                clearInterval(this.zacznijSpadac);
                this.zacznijGre();
            }
            // console.table(ui.plansza);
        };
        this.koloruj = () => {
            for (let i = 0; i < ui.DLUGOSC; i++) {
                for (let j = 0; j < ui.SZEROKOSC; j++) {
                    const divek = document.getElementById(`${i}_${j}`);
                    if (ui.plansza[i][j] === 1) {
                        divek.style.backgroundColor = "blue";
                    }
                    else if (ui.plansza[i][j] === 2) {
                        divek.style.backgroundColor = "yellow";
                    }
                    else if (ui.plansza[i][j] === 3) {
                        divek.style.backgroundColor = "brown";
                    }
                    else if (ui.plansza[i][j] === 0) {
                        divek.style.backgroundColor = "white";
                    }
                }
            }
        };
        this.obracaj = (licznikObrotu) => {
            if (licznikObrotu == 0) {
            }
            else if (licznikObrotu == 1) {
                ui.plansza[this.rzad1][this.kolumna1] = 0;
                ui.plansza[this.rzad2][this.kolumna2] = 0;
                this.rzad1++;
                this.kolumna2--;
                ui.plansza[this.rzad1][this.kolumna1] = this.kolor1;
                ui.plansza[this.rzad2][this.kolumna2] = this.kolor2;
            }
            else if (licznikObrotu == 2) {
            }
            else if (licznikObrotu == 3) {
            }
        };
        this.getRndInteger = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        this.rzad1 = 0;
        this.rzad2 = 0;
        this.kolumna1 = 3;
        this.kolumna2 = 4;
        this.rotacja = 1;
        this.licznikObrotu = 0;
        this.zacznijGre();
    }
}
const ui = new Ui();
const game = new Game();
