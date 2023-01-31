const express = require("express")
const app = express()
const PORT = 3000;
const path = require('path');
// const formidable = require('formidable');
const json = require("./data.json")

app.use(express.json());

app.get('/', function (req, res) {
    console.log(json);
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(json, null, 3))
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
    tabela.push(json[0])
    res.send(JSON.stringify(tabela, null, 3))
})

let tabela2 = []

app.get('/honda', function (req, res) {
    res.setHeader('content-type', 'application/json');
    for (let i = 0; i < json.length; i++) {
        if (json[i].car_name == "Honda") {
            // res.send(JSON.stringify(json[i], null, 3))
            tabela2.push(json[i])
        }
    }
    res.send(JSON.stringify(tabela2, null, 3))
})

app.use(express.static('static'))

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

