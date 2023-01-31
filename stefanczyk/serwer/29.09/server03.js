const express = require("express")
const app = express()
const PORT = 3000;

app.use(express.static('static'))

app.use(express.json());

app.post("/post", function (req, res) {
    console.log(req.body)
    let dane = req.body;
    let obiekt = {
        txt1: dane.txt1,
        txt2: dane.txt2,
        suma: (parseFloat(dane.txt1) + parseFloat(dane.txt2)),
        iloczyn: (parseFloat(dane.txt1) * parseFloat(dane.txt2))
    }
    console.log(obiekt);
    console.log(JSON.stringify(obiekt, null, 5))
    res.setHeader("Content-Type", "application/json")
    res.send(JSON.stringify(obiekt, null, 5));
})


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})