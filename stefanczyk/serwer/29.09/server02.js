const express = require("express")
const app = express()
const PORT = 3000;

app.use(express.urlencoded({
    extended: true
}));


app.use(express.static('static'))

// res.send(JSON.stringify({ a: 1 }, null, 5))

app.post("/handlePost", function (req, res) {
    console.log(req.body)
    let dane = req.body;
    let obiekt = {
        txt1: dane.txt1,
        txt2: dane.txt2,
        bt1: dane.bt1,
        suma: (parseFloat(dane.txt1) + parseFloat(dane.txt2)),
        iloczyn: (parseFloat(dane.txt1) * parseFloat(dane.txt2)),
    }
    res.setHeader("Content-Type", "application/json")
    res.send(JSON.stringify(obiekt, null, 5));
})


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})