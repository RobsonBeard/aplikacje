const express = require("express");
const app = express();
const PORT = 3000;

const path = require("path");

app.get("/", function (req, res) {
    console.log(Math.floor(5))
    let rand;
    let linki = "";
    for (let i = 0; i < 50; i++) {
        rand = Math.floor(Math.random() * 99 + 1);
        linki += `<a href=\"/product/${rand}\">Strona ${i + 1}.</a><br>`;
        console.log(rand);
        console.log(linki);
    }
    res.send(linki);
})

app.get("/product/:id", function (req, res) {
    let id = req.params.id;
    res.send(`Witamy na stronie ${id}!`);
})


app.listen(PORT, function () {
    console.log("serwer uruchomiony na porcie: " + PORT);
})