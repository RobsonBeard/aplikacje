const express = require('express');
const app = express();
const http = require('http');
const PORT = 5000;
const path = require("path");
app.use(express.static('static'))
app.use(express.json())

const server = http.createServer(app); // tu zmiana
const { Server } = require("socket.io");
const socketio = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/static/index.html");
});

server.listen(PORT, () => {
    console.log('server listening on ' + PORT);
});

// app.listen(PORT, function () {
//     console.log("start serwera na porcie " + PORT)
// }) // tu jest zmiana

//---------------------

let array = []
let obiekt

// let y = [{ id: 1 }, { id: 2 }].filter(x => x.id == 1)
// console.log(y); // mądra metoda^

// moze wyszukac wszystkie ID, ktore sa inne niz to ID ktore chce usunac i podstawic te nowa tablice w miejsce starej

socketio.on('connection', (client) => {
    console.log("klient się podłączył z id = ", client.id)
    // client.id - unikalna nazwa klienta generowana przez socket.io

    array.push(client)

    let ids = []

    // console.log("----");
    array.forEach(elem => {
        ids.push(elem.id)
        // console.log(elem.id);
    });

    client.emit("onconnect", {
        clientId: client.id,

    })

    socketio.emit("tablica_id", {
        otherIds: obiekt = {
            ids: ids,
        },
    }) //!!!

    client.on("disconnect", (reason) => {
        console.log(`klient o ID: ${client.id} się rozłącza, reason: ${reason}`)
        array = array.filter(element => element.id !== client.id)

        console.log("pozostało IDków: " + ids.length);
        // console.log("ID: ");
        // console.log(ids);
    }) // cos dziwnie to caly czas dziala, sprobowac dokonczyc przesyl na klienta itp

    client.on("mouseposition", (data) => {
        // console.log(data)
        client.broadcast.emit("mouseposition", { posX: data.posX, posY: data.posY });
    })

});