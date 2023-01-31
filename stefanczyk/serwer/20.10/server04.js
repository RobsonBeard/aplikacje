const express = require("express")
const app = express()
const PORT = 3000;
const path = require('path');
const hbs = require('express-handlebars');
const { DH_CHECK_P_NOT_SAFE_PRIME } = require("constants");


app.use(express.static('static'))

const context = {
    subject: "ćwiczenie 4 - dane z tablicy, select",
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
    res.render('index04.hbs', context);
    // console.log("--------------- czytam dane z kontextu")
    // console.log("--- cały obiekt context")
    // console.log(context)
    // console.log("--- tablica fields z obiektu context")
    // console.log(context.fields)
    // console.log("--- tablica books z obiektu context")
    // console.log(context.books)
    // console.log("--- zerowy index z tablicy books")
    // console.log(context.books[0])
    // console.log("--- pole title z zerowego indeksu z tablicy books")
    // console.log(context.books[0].title)
    // console.log("--------------- koniec czytania kontextu")
})

app.get('/selektos', function (req, res) {
    let dane = req.query
    console.log(dane);

    let nowykontekst = {
        subject: context.subject,
        elementy: []
    }

    switch (dane.selekt) {
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
            let testowyobiekt = { rzeczy: 'nie wybrano opcji w select' }
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

