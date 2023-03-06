const client = io();

window.addEventListener("load", function () {
    let nick = prompt("Proszę podać swój nick", "nickers")
    document.getElementById("zalogowany").innerText += ` ${nick}`

    let pierwszaWiadomosc = document.createElement("div")
    pierwszaWiadomosc.classList.add("polaczenieSiebie")
    pierwszaWiadomosc.innerText = "wchodzę na czat"
    document.getElementById("divWiadomosci").appendChild(pierwszaWiadomosc)

    client.emit("zalogowano", {
        nick: nick,
    })
})