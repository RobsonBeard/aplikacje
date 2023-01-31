const express = require("express") //stałe
const app = express() //stałe
const PORT = 3000; //stałe


app.get('/', function (req, res) {

    let count = req.query.count;
    let bg = req.query.bg;
    let pom = ""

    for (let i = 0; i < count; i++) {
        pom += `<div style="background-color: ${bg}; width: 100px; height: 100px; color: white; font-size: 30px; text-align: center; display: inline-block; margin: 10px;">${i + 1}</div>`
    }

    res.send(pom)

});

app.listen(PORT, function () {  //stałe
    console.log("start serwera na porcie " + PORT)  //stałe
})  //stałe, listen powinien być ostatnią linijką w kodzie

