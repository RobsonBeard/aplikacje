const express = require("express")
const app = express()
const PORT = 3000;
const path = require('path');
const hbs = require('express-handlebars');


app.use(express.static('static'))

app.get("/index", function (req, res) {
    res.render('index01.hbs');   // nie podajemy ścieżki tylko nazwę pliku
    // res.render('index.hbs', { layout: "main.hbs" }); // opcjonalnie podajemy konkretny layout dla tego widoku
})

app.get("/login", function (req, res) {
    res.render('login.hbs');
})

app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

