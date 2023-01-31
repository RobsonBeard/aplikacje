const express = require("express")
const app = express()
const PORT = 3000;
const formidable = require('formidable');
const path = require('path');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/index03.html'))
})

app.post('/handleUpload', function (req, res) {

    let form = formidable({});

    form.uploadDir = __dirname + '/static/upload/'
    form.multiples = true //upload wielu plików

    form.parse(req, function (err, fields, files) {

        console.log("----- przesłane pola z formularza ------");

        console.log(fields);

        console.log("----- przesłane formularzem pliki ------");

        console.log(files);

        let danedoprzeslania = []
        danedoprzeslania.push(fields)
        danedoprzeslania.push(files)
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(danedoprzeslania, null, 3))

    });
});

app.use(express.static('static'))

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

