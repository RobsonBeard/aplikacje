const express = require("express")
const app = express()
const PORT = 3000;
const formidable = require('formidable');
const path = require('path');

app.use(express.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/index09.html'))
})

app.post('/api', function (req, res) {

    let form = formidable({});

    form.uploadDir = __dirname + '/static/upload/'
    form.multiples = true
    form.keepExtensions = true

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

// app.post('/api', function (req, res) {
//     console.log(req.body);

//     res.setHeader('content-type', 'application/json');
//     res.send(JSON.stringify(req.body));

// })

app.use(express.static('static'))

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

