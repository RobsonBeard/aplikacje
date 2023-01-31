const express = require("express")
const app = express()
const PORT = 3000;
const path = require('path');
const hbs = require('express-handlebars');

app.use(express.static('static'))

const context = require("./data/data07.json")
console.log(context)


app.get("/", function (req, res) {
    res.render('index07.hbs', context);   // nie podajemy ścieżki tylko nazwę pliku

})


app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));
app.set('view engine', 'hbs');

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

