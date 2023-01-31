const express = require("express")
const app = express()
const PORT = 3000;
const path = require('path');
const hbs = require('express-handlebars');

app.use(express.static('static'))

const context = require("./data/data10.json");
const { dirname } = require("path");
console.log(context)


app.get("/", function (req, res) {
    let dane = req.query
    let tekst = dane.text
    console.log(tekst);

    res.render('index10.hbs', context);
})


app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({
    defaultLayout: 'main.hbs',
    helpers: {
        shortTitle: function (tekst) {
            console.log(tekst);
            return tekst.substring(0, 10) + "...";
        },
        duzeLitery: function (title) {
            let x = title.split(" ")
            let tabelaKoncowa = []
            for (let i = 0; i < x.length; i++) {
                let pom = `${(x[i].substr(0, 1)).toUpperCase()}` + `${x[i].substr(1, (x[i].length + 1))}`

                tabelaKoncowa[i] = pom
            }
            wynik = (tabelaKoncowa.join()).replaceAll(",", " ")
            return wynik
        },
        myslniki: function (title) {
            let x = title.split(" ")
            for (let i = 0; i < x.length; i++) {
                let y = x[i].split("")
                x[i] = y.join("-")
            }
            wynik = x.join(" ")

            return wynik;
        }
    }
}));
app.set('view engine', 'hbs');

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

