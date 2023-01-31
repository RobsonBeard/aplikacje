const express = require("express") //stałe
const app = express() //stałe
const PORT = 3000; //stałe

app.get('/', function (req, res) {
    console.log(req.query) // to jest obiekt z danymi pobranymi z paska adresu    
    console.log(req.query.p1) // to jest jedno pole (właściwość) tego obiektu   
    res.send(req.query) // odesłanie obiektu z danymi z powrotem do przeglądarki   
});

app.listen(PORT, function () {  //stałe
    console.log("start serwera na porcie " + PORT)  //stałe
})  //stałe

