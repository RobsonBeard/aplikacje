class Plansza {
    constructor() {

        this.tworzPlansze()
        this.robTor()
        this.glownaGra()
    }
    tworzPlansze() {

        this.divFlex = document.getElementById("divFlex")

        this.canvas = document.createElement("canvas")
        this.canvas.setAttribute("width", "600")
        this.canvas.setAttribute("height", "300")
        this.divFlex.appendChild(this.canvas)

        this.ctx = this.canvas.getContext("2d")

        this.ustawienia = document.getElementById("divUstawienia")
        this.divFlex.appendChild(this.ustawienia)

        this.naglowki = {}
        this.naglowki.naglowek1 = document.getElementById("naglowek1")
        this.naglowki.naglowek1.innerText = `Kierowca czerwony steruje za pomocą ArrowUp i ArrowDown`

        this.naglowki.naglowek2 = document.getElementById("naglowek2")
        this.naglowki.naglowek2.innerText = `Kierowca niebieski steruje za pomocą W i S`

        this.naglowki.naglowek3 = document.getElementById("naglowek3")
        this.naglowki.naglowek3.innerText = `Kierowca zielony steruje za pomocą U i J`

        this.naglowki.naglowek4 = document.getElementById("naglowek4")
        this.naglowki.naglowek4.innerText = `Kierowca żółty steruje za pomocą Num8 i Num5 lub 8 i 5`

    }
    robTor() {

        this.ctx.lineWidth = 3
        this.ctx.fillStyle = "rgba(255,255,255,1)" // white
        this.ctx.beginPath()
        this.ctx.arc(150, 150, 150, 0.5 * Math.PI, 1.5 * Math.PI) // lewe duze kolko
        this.ctx.stroke()
        this.ctx.fill()
        this.ctx.beginPath()
        this.ctx.moveTo(150, 0);
        this.ctx.lineTo(450, 0);
        this.ctx.stroke()
        this.ctx.moveTo(150, 300);
        this.ctx.lineTo(450, 300);
        this.ctx.stroke()
        this.ctx.beginPath()
        this.ctx.rect(150, 0, 300, 300)
        this.ctx.fill()
        this.ctx.beginPath()
        this.ctx.arc(450, 150, 150, 1.5 * Math.PI, 0.5 * Math.PI) // prawe duze kolko
        this.ctx.stroke()
        this.ctx.fill()

        this.ctx.save()

        this.ctx.beginPath()
        this.ctx.arc(150, 150, 50, 0.5 * Math.PI, 1.5 * Math.PI) // lewe male kolko
        this.ctx.clip()
        this.ctx.clearRect(0, 0, 600, 300)

        this.ctx.restore()
        this.ctx.save()

        this.ctx.beginPath()
        this.ctx.clearRect(150, 100, 300, 100)

        this.ctx.restore()
        this.ctx.save()

        this.ctx.beginPath()
        this.ctx.arc(450, 150, 50, 1.5 * Math.PI, 0.5 * Math.PI) // prawe male kolko
        this.ctx.clip()
        this.ctx.clearRect(0, 0, 600, 300)
        this.ctx.restore()
        this.ctx.save()

        this.meta = new Image()
        this.meta.src = './img/meta.jpg'
        this.ctx.drawImage(this.meta, 150, 200, 50, 100)

        this.ctx.restore()
        this.ctx.save()
    }

    glownaGra() {
        this.ctx.restore()

        this.radius = 10 // nie zmieniać bo jest zrobione na chama
        this.ctx.lineWidth = 2

        let przegralesGre = () => {
            this.przegrana = document.createElement("h1")
            this.przegrana.innerText = "Przegrałeś"
            document.body.appendChild(this.przegrana)
            clearInterval(this.gra)
            // clearInterval(this.czyscMape)
        }

        // this.czyscMape = setInterval(() => {
        //     this.ctx.clearRect(0, 0, 600, 300)
        //     this.ctx.strokeStyle = "black"
        //     this.robTor()
        //     this.ctx.strokeStyle = "red"
        // }, 100) // powiedzmy, ze czysci mi juz mape w grze tego 1 gracza


        this.motor = new Image()
        this.motor.src = './img/red-motocycle.png'

        this.angle = 0

        // sprobuje potem zrobic getModifierState i tym keyup i keypress, moze bedzie plynniej z intervalem do tego
        window.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowUp":
                    this.angle -= 15 * Math.PI / 180
                    // console.log(this.angle);
                    break;
                case "ArrowDown":
                    this.angle += 15 * Math.PI / 180
                    // console.log(this.angle);
                    break;
                default:
                    console.log(e.key);
            }
        })


        this.xPocz = 200
        this.yPocz = 250

        this.dx = this.radius * Math.cos(this.angle)
        this.dy = this.radius * Math.sin(this.angle)

        this.xKonc = this.xPocz + this.dx
        this.yKonc = this.yPocz + this.dy


        this.leweDuzeKolko = new Path2D()
        this.leweDuzeKolko.arc(150, 150, 150, 0.5 * Math.PI, 1.5 * Math.PI)

        this.praweDuzeKolko = new Path2D()
        this.praweDuzeKolko.arc(450, 150, 150, 1.5 * Math.PI, 0.5 * Math.PI)

        this.duzyProstokat = new Path2D()
        this.duzyProstokat.rect(150, 0, 300, 300)


        this.leweMaleKolko = new Path2D()
        this.leweMaleKolko.arc(150, 150, 50, 0.5 * Math.PI, 1.5 * Math.PI)

        this.praweMaleKolko = new Path2D()
        this.praweMaleKolko.arc(450, 150, 50, 1.5 * Math.PI, 0.5 * Math.PI)

        this.malyProstokat = new Path2D()
        this.malyProstokat.rect(150, 100, 300, 100)

        this.tablicaOdcinkow = []

        this.gra = setInterval(() => {

            this.ctx.clearRect(0, 0, 600, 300)
            this.ctx.strokeStyle = "black"
            this.robTor()
            this.ctx.strokeStyle = "red"

            this.dx = this.radius * Math.cos(this.angle)
            this.dy = this.radius * Math.sin(this.angle)

            this.xPocz = this.xKonc
            this.yPocz = this.yKonc

            this.xKonc = this.xPocz + this.dx
            this.yKonc = this.yPocz + this.dy

            if (this.ctx.isPointInPath(this.leweDuzeKolko, this.xKonc, this.yKonc) || this.ctx.isPointInPath(this.praweDuzeKolko, this.xKonc, this.yKonc) || this.ctx.isPointInPath(this.duzyProstokat, this.xKonc, this.yKonc)) {
                if (this.ctx.isPointInPath(this.leweMaleKolko, this.xKonc, this.yKonc) || this.ctx.isPointInPath(this.praweMaleKolko, this.xKonc, this.yKonc) || this.ctx.isPointInPath(this.malyProstokat, this.xKonc, this.yKonc)) {
                    przegralesGre()
                    this.przegrana.style.color = "red"
                }
            }
            else {
                przegralesGre()
                this.przegrana.style.color = "red"
            }

            // this.ctx.beginPath()
            // this.ctx.moveTo(this.xPocz, this.yPocz)
            // this.ctx.lineTo(this.xKonc, this.yKonc)
            // this.ctx.stroke() // to w sumie nie jest potrzebne jak rysuje sie tam w forze na dole

            this.malyObiekt = {
                xPocz: this.xPocz,
                xKonc: this.xKonc,
                yPocz: this.yPocz,
                yKonc: this.yKonc,
            }

            this.tablicaOdcinkow.unshift(this.malyObiekt)
            if (this.tablicaOdcinkow.length > 10) {
                this.tablicaOdcinkow.pop()
            }
            for (let i = 0; i < this.tablicaOdcinkow.length; i++) {
                this.ctx.beginPath()
                this.ctx.moveTo(this.tablicaOdcinkow[i].xPocz, this.tablicaOdcinkow[i].yPocz);
                this.ctx.lineTo(this.tablicaOdcinkow[i].xKonc, this.tablicaOdcinkow[i].yKonc);
                this.ctx.strokeStyle = `rgba(255,0,0,${1 - i / 10})`
                if (i > 2) {
                    this.ctx.stroke()
                } // mozna usunąć jeśli się chce

            }

            if (this.tablicaOdcinkow.length >= 3) {
                this.ctx.save()
                this.ctx.translate(this.tablicaOdcinkow[2].xPocz, this.tablicaOdcinkow[2].yPocz)
                this.ctx.rotate(this.angle)
                this.ctx.translate(0, 0)
                this.ctx.drawImage(this.motor, -5 * Math.cos(2), -5 * Math.sin(2), 30, 10) // tu są sin i cos dlatego, że obrazek był nierówno
                this.ctx.restore()
            }

            // console.log(this.tablicaOdcinkow);

        }, 100);


    }
}