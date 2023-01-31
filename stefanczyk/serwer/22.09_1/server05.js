const express = require("express") //stałe
const app = express() //stałe
const PORT = 3000; //stałe

app.get('/user/:id', function (req, res) {

    let id = req.params.id
    if (id == 2)
        res.send("odsyłam stronę usera z id = 2")
    else
        res.send("taki user nie istnieje")
});

app.listen(PORT, function () {  //stałe
    console.log("start serwera na porcie " + PORT)  //stałe
})  //stałe
