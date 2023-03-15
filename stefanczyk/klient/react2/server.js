const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");

app.use(express.static("static"));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);

const data = require("./static/data/zones.json")
let tablicaKulek = []

app.get("/", function (req, res) {
    tablicaKulek = []
    res.sendFile(path.join(__dirname + "/static/index09a.html"))
})

app.get("/wybrane", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/index09b.html"))
})

app.post("/odbiorJsona", function (req, res) {
    // console.log(req.body);

    res.setHeader("Content-Type", "application/json")
    res.send(JSON.stringify(data, null, 5));
})

app.post("/dodawanieZaznaczonychKulek", function (req, res) {
    // console.log(req.body);
    tablicaKulek.push(req.body)
    console.log(tablicaKulek);

    res.setHeader("Content-Type", "application/json")
    res.send(JSON.stringify(data, null, 5));
})

app.post("/usuwanieZaznaczonychKulek", function (req, res) {
    // console.log(req.body);
    tablicaKulek = tablicaKulek.filter(elem => elem.id !== req.body.id)

    res.setHeader("Content-Type", "application/json")
    res.send(JSON.stringify(data, null, 5));
})

app.post("/wyswietlZaznaczoneKulki", function (req, res) {
    // console.log(req.body);

    res.setHeader("Content-Type", "application/json")
    res.send(JSON.stringify(tablicaKulek, null, 5));
})


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
});
