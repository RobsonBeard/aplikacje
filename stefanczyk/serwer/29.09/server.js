const express = require("express")
const app = express()
const PORT = 3000;

app.use(express.static('static'))

app.use(express.urlencoded({
    extended: true
}));

app.post("/handlePost", function (req, res) {
    console.log(req.body)
    res.setHeader("content-type", "text/plain") //text/html albo application/json testowac
    res.send(req.body)

})



app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})