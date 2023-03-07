function zrobLadnaDate() {
    let data = new Date()
    data = data.toTimeString()
    let ladnaData = data.substring(0, 9)
    return ladnaData
}

function stworzSockety() {
    client.on("nowePolaczenie", data => {
        // console.log(data);
        let nowyUzytkownik = document.createElement("div")
        nowyUzytkownik.classList.add("polaczenieInnych")
        nowyUzytkownik.innerHTML = `<span class="spanUser">${data.nick}</span>&nbsp;:&nbsp;<span class="spanMessage">wchodzi na czat</span>&nbsp;:&nbsp;<span class="spanDate">${zrobLadnaDate()}</span>`
        let wiadomosc = document.createElement("div")
        wiadomosc.classList.add("wiadomosc")
        document.getElementById("divWiadomosci").appendChild(wiadomosc)
        wiadomosc.appendChild(nowyUzytkownik)
    })

    client.on("wyjscieZCzatu", data => {
        // console.log(data);
        let wyjscieUzytkownika = document.createElement("div")
        wyjscieUzytkownika.classList.add("polaczenieInnych")
        wyjscieUzytkownika.innerHTML = `<span class="spanUser">${data.wylogowanyNick}</span>&nbsp;:&nbsp;<span class="spanMessage">opuścił czat</span>&nbsp;:&nbsp;<span class="spanDate">${zrobLadnaDate()}</span>`
        let wiadomosc = document.createElement("div")
        wiadomosc.classList.add("wiadomosc")
        document.getElementById("divWiadomosci").appendChild(wiadomosc)
        wiadomosc.appendChild(wyjscieUzytkownika)
    })

    client.on("nowaWiadomosc", data => {
        console.log(data);
        let innaWiadomosc = document.createElement("div")
        innaWiadomosc.classList.add("innaWiadomosc")
        const MAX_DLUGOSC = 21
        let ileEnterow = Math.ceil(parseFloat(data.wiadomosc.length) / MAX_DLUGOSC)
        let tablicaStringow = []
        for (let i = 0; i < ileEnterow; i++) {
            let pomString = data.wiadomosc.slice(MAX_DLUGOSC * i, MAX_DLUGOSC * (i + 1))
            tablicaStringow.push(pomString)
        }
        let wynik = tablicaStringow.join("<br>")

        innaWiadomosc.innerHTML = `<span class="spanUser">${data.nick}</span>&nbsp;:&nbsp;<span class="spanMessage">${wynik}</span>&nbsp;:&nbsp;<span class="spanDate">${zrobLadnaDate()}</span>`
        let wiadomosc = document.createElement("div")
        wiadomosc.classList.add("wiadomosc")
        wiadomosc.style.height = `${ileEnterow * 40}px`
        document.getElementById("divWiadomosci").appendChild(wiadomosc)
        wiadomosc.appendChild(innaWiadomosc)
    })
}

const client = io();

let nick

window.addEventListener("load", () => {
    nick = prompt("Proszę podać swój nick (mniejszy niż 10 znaków, inaczej obetnę)", "nickers")
    if (nick.length >= 10) {
        nick = nick.substring(0, 9)
    }
    document.getElementById("zalogowany").innerText += ` ${nick}`

    let pierwszaWiadomosc = document.createElement("div")
    pierwszaWiadomosc.classList.add("polaczenieSiebie")
    pierwszaWiadomosc.innerHTML = `<span class="spanUser">me</span>&nbsp;:&nbsp;<span class="spanMessage">wchodzę na czat</span>&nbsp;:&nbsp;<span class="spanDate">${zrobLadnaDate()}</span>`
    let wiadomosc = document.createElement("div")
    wiadomosc.classList.add("wiadomosc")
    document.getElementById("divWiadomosci").appendChild(wiadomosc)
    wiadomosc.appendChild(pierwszaWiadomosc)

    client.emit("zalogowano", {
        nick: nick,
    })

    stworzSockety()

})

let inputWiadomosc = document.getElementById("inputWiadomosc")

function wyslijWiadomosc() {
    if (inputWiadomosc.value !== "") {
        let mojTekst = inputWiadomosc.value
        let mojaWiadomosc = document.createElement("div")
        mojaWiadomosc.classList.add("mojaWiadomosc")
        const MAX_DLUGOSC = 22
        let ileEnterow = Math.ceil(parseFloat(mojTekst.length) / MAX_DLUGOSC)

        let tablicaStringow = []
        for (let i = 0; i < ileEnterow; i++) {
            let pomString = mojTekst.slice(MAX_DLUGOSC * i, MAX_DLUGOSC * (i + 1))
            tablicaStringow.push(pomString)
        }
        let wynik = tablicaStringow.join("<br>")

        mojaWiadomosc.innerHTML = `<span class="spanUser">me</span>&nbsp;:&nbsp;<span class="spanMessage">${wynik}</span>&nbsp;:&nbsp;<span class="spanDate">${zrobLadnaDate()}</span>`
        let wiadomosc = document.createElement("div")
        wiadomosc.classList.add("wiadomosc")
        wiadomosc.classList.add("prawo")
        wiadomosc.style.height = `${ileEnterow * 40}px`
        document.getElementById("divWiadomosci").appendChild(wiadomosc)
        wiadomosc.appendChild(mojaWiadomosc)

        client.emit("wiadomosc", {
            wiadomosc: mojTekst,
            nick: nick
        })

        inputWiadomosc.value = ""
    }
}

document.getElementById("buttonWiadomosc").addEventListener("click", wyslijWiadomosc) // poprawic to gdy wiadomosc jest zbyt dluga

inputWiadomosc.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        wyslijWiadomosc()
    }
})
