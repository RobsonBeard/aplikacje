const express = require("express") //stałe
const app = express() //stałe
const PORT = 3000; //stałe

app.use(express.static('static'))

app.listen(PORT, function () {  //stałe
    console.log("start serwera na porcie " + PORT)  //stałe
})  //stałe, listen powinien być ostatnią linijką w kodzie

