const express = require("express")
const app = express()
const PORT = 3000;
const path = require('path');
// const formidable = require('formidable');
const json = require("./data.json")

app.use(express.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/index06.html'))
})

app.get('/api', function (req, res) {
    console.log(req.body);

    res.setHeader('content-type', 'application/json'); // nagłówek
    res.send(JSON.stringify(json)); // odsyłamy dane do klienta w postaci stringa w formacie jsona

    // res.json({ a: 1 })
    // Uwaga: taką samą funkcjonalność jak powyżej zapewnia wbudowana w expressa funkcja res.json()

})

app.use(express.static('static'))

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

