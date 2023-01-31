const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static('static'));
app.use(express.static('static/cwiczenia'))

app.get('/', function (req, res) {
    res.send(path.join(__dirname + '/static/cwiczenia/index.html'));
})

app.post('/cwiczenia', function (req, res) {
    fs.readdir(path.join(__dirname + '/static/cwiczenia'), function (err, files) {
        if (err) {
            return console.log(err);
        }
        console.log(files);
        res.send(JSON.stringify(files));
    });
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
})
