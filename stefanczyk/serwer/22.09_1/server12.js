const express = require("express"); //stałe
const { read } = require("fs");
const app = express() //stałe
const PORT = 3000; //stałe
const path = require("path")


app.get("/", function (req, res) {

    // let id = req.params.id
    let losowe;
    let pom = ""
    for (i = 0; i < 51; i++) {
        losowe = Math.floor((Math.random()) * 99) + 1
        pom += `<a href="/products/${losowe}">product id = ${losowe}</a><br>`
    }
    res.send(pom)

})

app.get(`/products/:id`, function (req, res) {

    let id = req.params.id
    res.send(`podstrona z danymi produktu o id = ${id}`)

})

app.listen(PORT, function () {  //stałe
    console.log("start serwera na porcie " + PORT)  //stałe
})  //stałe, listen powinien być ostatnią linijką w kodzie

