let interval
let offsetX
let offsetY


let zadanie = {
    random: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    zadanie1: {
        tworz: function () {
            let canvas = document.getElementById("canvas1")
            canvas.setAttribute("width", "200")
            canvas.setAttribute("height", "200")
            let ctx = canvas.getContext("2d");
            // ctx.rect(0, 0, 300, 300);
            // ctx.stroke();
            // console.log(this);

        },
        linie: function () {
            let intervalLinie = setInterval(function () {
                let canvas = document.getElementById("canvas1")
                let ctx = canvas.getContext("2d");
                let x = zadanie.random(0, 200)
                let y = zadanie.random(0, 200)
                let red = zadanie.random(0, 255)
                let green = zadanie.random(0, 255)
                let blue = zadanie.random(0, 255)
                // console.log(zadanie1.random(10, 30));
                // console.log(this);
                ctx.beginPath();
                ctx.moveTo(100, 100)
                ctx.lineTo(x, y)
                ctx.strokeStyle = `rgba(${red},${green},${blue}, 0.7)`
                ctx.stroke()

            }, 10)
        }

    },
    zadanie2: {
        tworz: function () {
            let canvas2 = document.getElementById("canvas2")
            canvas2.setAttribute("width", "200")
            canvas2.setAttribute("height", "200")
            let ctx2 = canvas2.getContext("2d");
        },
        listener1: function () {
            canvas2.addEventListener("mouseenter", function (e) {
                interval = setInterval(zadanie.zadanie2.tworzLuki, 10)
            })
        },
        listener2: function () {
            canvas2.addEventListener("mouseleave", function (e) {
                clearInterval(interval)
            })
        },
        listener3: function () {
            canvas2.addEventListener("mousemove", function (e) {
                offsetX = e.offsetX
                offsetY = e.offsetY
            })
        },
        tworzLuki: function () {

            // console.log(e.offsetX);
            ctx2 = canvas2.getContext("2d")
            ctx2.beginPath();

            let startLuku = Math.random() * 2 * Math.PI
            let koniecLuku = startLuku + 0.25 * Math.PI
            ctx2.arc(offsetX, offsetY, 20, startLuku, koniecLuku)
            // console.log(startLuku);
            ctx2.strokeStyle = `rgba(0,0,255, 0.1)`
            ctx2.lineWidth = 3
            ctx2.stroke();
        }
    },
    zadanie3: {
        tworz: function () {
            let canvas3 = document.getElementById("canvas3")
            canvas3.setAttribute("width", "250")
            canvas3.setAttribute("height", "150")
            let ctx3 = canvas3.getContext("2d");


            let minX = 0
            let maxX = 230 // będę animować obrazek pomiędzy min i max, ta wartosc to jest szerokosc canvasa-szerokosc obrazka
            let minY = 0
            let maxY = 120

            let x = zadanie.random(minX, maxX)
            let y = zadanie.random(minX, maxY) // szerokosc i wysokosc ma byc losowana
            let randomSpeed = zadanie.random(1, 3)
            let speedX = randomSpeed
            let speedY = randomSpeed // predkosc ma byc losowana od 1 do 3

            let bul1 = zadanie.random(0, 1)
            let bul2 = zadanie.random(0, 1)
            // console.log(bul1, bul2);

            let kierunek = {
                x: 1,
                y: -1
            }

            if (bul1 == 0) {
                kierunek.x = 1
            }
            else {
                kierunek.x = -1
            }
            if (bul2 == 0) {
                kierunek.y = 1
            }
            else {
                kierunek.y = -1
            }

            let img = new Image()
            let randomImage = zadanie.random(1, 3)
            if (randomImage == 1) {
                img.src = "./img/dolar1.jpg" // ma byc losowany 1 z 3 grafik!
            }
            else if (randomImage == 2) {
                img.src = "./img/dolar2.jpeg"
            }
            else {
                img.src = "./img/dolar3.png"
            }

            let imgWidth = 20
            let imgHeight = 30

            img.addEventListener("load", function () {
                requestAnimationFrame(animacja);
            })

            function animacja() {
                ctx3.clearRect(0, 0, 250, 150); // czysci mi canvasa

                ctx3.drawImage(img, x, y, imgWidth, imgHeight); // rysuje mi obrazek

                x += speedX * kierunek.x; // szybkosc razy kierunek, czyli updatuje mi pozycje dolarka
                y += speedY * kierunek.y

                if (x < minX) {
                    x = minX;
                    kierunek.x *= -1;
                }
                if (x > maxX) {
                    x = maxX;
                    kierunek.x *= -1;
                } // trzyma mi x pomiędzy min i max

                if (y < minY) {
                    y = minY
                    kierunek.y *= -1
                }
                if (y > maxY) {
                    y = maxY
                    kierunek.y *= -1
                }

                requestAnimationFrame(animacja);
            }
        },

    }
}

zadanie.zadanie1.tworz()
zadanie.zadanie1.linie()
zadanie.zadanie2.tworz()
zadanie.zadanie2.listener1()
zadanie.zadanie2.listener2()
zadanie.zadanie2.listener3()
zadanie.zadanie3.tworz()



