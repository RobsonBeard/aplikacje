const express = require("express")
const path = require("path") // wazne!
const app = express()
const PORT = 3000;



app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/formularz.html"))

})

app.get("/handleForm", function (req, res) {
    console.log(req.query.color)
    res.send(req.query)
})

app.use(express.static('static'))

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

