const express = require("express")
const path = require("path") 
const app = express()
const PORT = 3000;
const bodyParser = require("body-parser") // !!!

app.use(bodyParser.urlencoded({ extended: true })); // nowe

// app.get("/", function (req, res) {
//     res.sendFile(path.join(__dirname + "/static/formularz.html"))

// })

// app.get("/handleForm", function (req, res) {
//     let kolor = req.query.color // trzeba to przypisać do zmiennej, bo req query pobiera dane tylko raz?
//     console.log(kolor);
//     res.send(`<body style="background-color: ${kolor}; display: flex; justify-content: center; margin: 0;"><p style="color: white; text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;font-size: 200px; margin: 0">${kolor}</body>`)
// })

app.get("/", function (req, res) {
    
    res.sendFile(path.join(__dirname + "/static/formularz2.html"))

})

app.post("/handleForm", function(req, res) {
    let jakiesdane = req.body
    let kolor = req.body.color
    console.log(jakiesdane)
    res.send(`<body style="background-color: ${kolor};"></body>`)
})

app.use(express.static('static'))

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

