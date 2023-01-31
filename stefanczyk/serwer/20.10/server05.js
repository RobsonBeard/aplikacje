const express = require("express")
const app = express()
const PORT = 3000;
const path = require('path');
const hbs = require('express-handlebars');
const { DH_CHECK_P_NOT_SAFE_PRIME } = require("constants");


app.use(express.static('static'))

const context = {
    subject: "ćwiczenie 5 - dane z tablicy obiektów, radios",
    fields: [
        { name: "title" },
        { name: "author" },
        { name: "lang" }
    ],
    books: [
        { title: "Lalka", author: "B Prus", lang: "PL" },
        { title: "Hamlet", author: "W Szekspir", lang: "ENG" },
        { title: "Pan Wołodyjowski", author: "H Sienkiewicz", lang: "PL" },
        { title: "Zamek", author: "F Kafka", lang: "CZ" }
    ]
}

app.get("/", function (req, res) {
    res.render('index05.hbs', context);

})

app.get('/radios', function (req, res) {
    let dane = req.query
    console.log(dane);

    let nowykontekst = {
        subject: context.subject,
        elementy: []
    }

    switch (dane.radiosy) {
        case 'title':
            for (i = 0; i < context.books.length; i++) {
                let testowyobiekt = { rzeczy: context.books[i].title }
                nowykontekst.elementy.push(testowyobiekt)
            }
            res.render('index041.hbs', nowykontekst);
            break
        case 'author':
            for (i = 0; i < context.books.length; i++) {
                let testowyobiekt = { rzeczy: context.books[i].author }
                nowykontekst.elementy.push(testowyobiekt)
            }
            res.render('index041.hbs', nowykontekst);
            break
        case 'lang':
            for (i = 0; i < context.books.length; i++) {
                let testowyobiekt = { rzeczy: context.books[i].lang }
                nowykontekst.elementy.push(testowyobiekt)
            }
            res.render('index041.hbs', nowykontekst);
            break
        default:
            let testowyobiekt = { rzeczy: 'nie wybrano opcji w radio' }
            nowykontekst.elementy.push(testowyobiekt)
            res.render('index041.hbs', nowykontekst);

    }

})

app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

