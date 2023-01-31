const express = require("express")
const app = express()
const PORT = 3000;
const path = require('path');
// const formidable = require('formidable');

app.use(express.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/index05.html'))
})

app.post('/api', function (req, res) {
    console.log(req.body);

    res.setHeader('content-type', 'application/json'); // nagłówek
    res.send(JSON.stringify(req.body)); // odsyłamy dane do klienta w postaci stringa w formacie jsona

})

app.use(express.static('static'))

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

