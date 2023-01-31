const express = require("express") //stałe
const app = express() //stałe
const PORT = 3000; //stałe
const path = require("path")

app.use(express.static('static'))

app.get("/product_id/:id", function (req, res) {

    let id = req.params.id

    if (id == 1)
        res.sendFile(path.join(__dirname + "/static/products/product1.html"))
    else if (id == 2)
        res.sendFile(path.join(__dirname + "/static/products/product2.html"))
    else if (id == 3)
        res.sendFile(path.join(__dirname + "/static/products/product3.html"))
    else
        res.send("Nie ma strony o takim id :)")
})


app.listen(PORT, function () {  //stałe
    console.log("start serwera na porcie " + PORT)  //stałe
})  //stałe, listen powinien być ostatnią linijką w kodzie

