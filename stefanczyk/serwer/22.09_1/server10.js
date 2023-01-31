const { application } = require("express");
const express = require("express") //stałe
const app = express() //stałe
const PORT = 3000; //stałe

app.get('/', function (req, res) {

    let value = req.query.value;
    let torad = req.query.torad;
    let wynik;

    if (torad == "true") {
        wynik = value * Math.PI / 180;
        res.send(`${value} stopni to ${wynik}radianów`)

    }
    else if (torad == "false") {
        wynik = value * 180 / Math.PI;
        res.send(`${value} radianów to ${wynik}stopni`)

    }

});


app.listen(PORT, function () {  //stałe
    console.log("start serwera na porcie " + PORT)  //stałe
})  //stałe, listen powinien być ostatnią linijką w kodzie

