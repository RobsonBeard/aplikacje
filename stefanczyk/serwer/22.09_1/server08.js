const express = require("express") //stałe
const app = express() //stałe
const PORT = 3000; //stałe
const path = require("path")

app.use(express.static('static'))

app.get("/koty", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/strona1.html", "", ""))
    console.log(__dirname)
})

app.get("/auta", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/strona2.html"))
})

app.get("/drzewa", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/strona3.html"))
})


app.listen(PORT, function () {  //stałe
    console.log("start serwera na porcie " + PORT)  //stałe
})  //stałe, listen powinien być ostatnią linijką w kodzie
