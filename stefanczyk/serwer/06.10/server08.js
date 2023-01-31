const express = require("express")
const app = express()
const PORT = 3000;
const path = require('path');
// const formidable = require('formidable');
const json = require("./data.json")

app.use(express.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/cars.html'))
})

app.get('/all', function (req, res) {
    console.log(json);
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(json, null, 3)) // to samo co wyzej?
})

let tabela = []

app.get('/first', function (req, res) {
    console.log(json[0])
    res.setHeader('content-type', 'application/json');
    if (tabela.length == 0) {
        tabela.push(json[0])
    }
    res.send(JSON.stringify(tabela, null, 3))
})

let tabela2 = []
let pom = 0
for (let i = 0; i < json.length; i++) {

    if (json[i].car_name == "Honda") {
        pom++
    }
}
// console.log("liczba hond: ");
// console.log(pom);

app.get('/honda', function (req, res) {
    res.setHeader('content-type', 'application/json');
    for (let i = 0; i < json.length; i++) {
        if (json[i].car_name == "Honda") {
            if (tabela2.length < pom) {
                tabela2.push(json[i])
            }
        }
    }
    res.send(JSON.stringify(tabela2, null, 3))
})

app.use(express.static('static'))

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

