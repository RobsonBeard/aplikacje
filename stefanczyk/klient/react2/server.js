const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");

app.use(express.static("static"));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);

const data = require("./static/data/zones.json")

app.get("/", function (req, res) {
    // res.sendFile(path.join(__dirname + "/static/index09.html"))
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader("Content-Type", "application/json")
    res.send(JSON.stringify(data, null, 5))
})

// app.post("/fetch", function (req, res) {
//     res.setHeader("Content-Type", "application/json")
//     res.send(JSON.stringify(data, null, 5));
// })

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
});
