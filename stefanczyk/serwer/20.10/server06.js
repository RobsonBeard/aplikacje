const express = require("express")
const app = express()
const PORT = 3000;
const path = require('path');
const hbs = require('express-handlebars');
const { DH_CHECK_P_NOT_SAFE_PRIME } = require("constants");
const { json } = require("express");


app.use(express.static('static'))

const context = {
    subject: "ćwiczenie 6 - dane z tablicy obiektów, checkboxes",
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
    res.render('index06.hbs', context);

})

app.get('/czekboks', function (req, res) {
    let dane = req.query
    console.log(dane);

    let nowykontekst = {
        subject: context.subject,
        elementy: []
    }

    if (JSON.stringify(dane) === '{}') {
        let testowyobiekt = { rzeczy1: 'nie wybrano opcji w checkboxie' }
        nowykontekst.elementy.push(testowyobiekt)
        res.render('index061.hbs', nowykontekst);
    }
    else if (Array.isArray(dane.checkboxy)) {
        for (i = 0; i < context.books.length; i++) {
            let testowyobiekt = { rzeczy1: '' }
            nowykontekst.elementy.push(testowyobiekt)

        }
        if (dane.checkboxy.includes(context.fields[0].name)) {
            for (i = 0; i < context.books.length; i++) {
                nowykontekst.elementy[i].rzeczy1 += context.books[i].title
                if (dane.checkboxy.includes(context.fields[1].name) || dane.checkboxy.includes(context.fields[2].name)) {
                    nowykontekst.elementy[i].rzeczy1 += ', '
                } // jeśli po tytułach będzie kolejny element, to daję przecinek (kolejny, czyli w tym przypadku drugi lub trzeci, nie wiem jak to zrobić uniwersalne XD)
            }
        }
        if (dane.checkboxy.includes(context.fields[1].name)) {
            for (i = 0; i < context.books.length; i++) {
                nowykontekst.elementy[i].rzeczy1 += context.books[i].author
                if (dane.checkboxy.includes(context.fields[2].name)) {
                    nowykontekst.elementy[i].rzeczy1 += ', '
                } // tutaj może być tylko jeden kolejny element, więc jest taki jeden krótszy warunek

            }
        }
        if (dane.checkboxy.includes(context.fields[2].name)) {
            for (i = 0; i < context.books.length; i++) {
                nowykontekst.elementy[i].rzeczy1 += context.books[i].lang
            } // a to zawsze będzie ostatnim elementem
        }
        console.log(nowykontekst.elementy);
        res.render('index061.hbs', nowykontekst);
    }
    else {
        switch (dane.checkboxy) {
            case 'title':
                for (i = 0; i < context.books.length; i++) {
                    let testowyobiekt = { rzeczy1: context.books[i].title }
                    nowykontekst.elementy.push(testowyobiekt)
                }
                res.render('index061.hbs', nowykontekst);
                break
            case 'author':
                for (i = 0; i < context.books.length; i++) {
                    let testowyobiekt = { rzeczy1: context.books[i].author }
                    nowykontekst.elementy.push(testowyobiekt)
                }
                res.render('index061.hbs', nowykontekst);
                break
            case 'lang':
                for (i = 0; i < context.books.length; i++) {
                    let testowyobiekt = { rzeczy1: context.books[i].lang }
                    nowykontekst.elementy.push(testowyobiekt)
                }
                res.render('index061.hbs', nowykontekst);
                break
        }
    }


})

app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

