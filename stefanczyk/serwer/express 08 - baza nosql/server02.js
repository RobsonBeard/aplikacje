const express = require("express")
const app = express()
const PORT = 3000;
const hbs = require('express-handlebars');
// const context = require("./data/dane.json")
const path = require("path")
const Datastore = require('nedb')
const coll2 = new Datastore({
    filename: 'kolekcja2.db',
    autoload: true
});

app.use(express.static("static"));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);

const context = {
    title: "03: Zapis/Odczyt danych w bazie NEDB - edit/update",
    pola: [
        { name: "ubezpieczony" },
        { name: "benzyna" },
        { name: "uszkodzony" },
        { name: "naped 4x4" }
    ]
}

let nowykontekst = {
    title: context.title,
    pola: context.pola,
    nowatabelka: []
}

// let obj = {
//     a: 1,
//     b: 2,
//     c: 3
// }
// console.log(Object.keys(obj))
// console.log(Object.values(obj))
// for (let key in obj)
//     console.log(key, obj[key])

app.get("/", function (req, res) {
    // if (nowykontekst.nowatabelka.length == 0) {
    //     res.render('index.hbs', context);
    // }
    res.render('index.hbs', nowykontekst)
})

// res.setHeader(name, value) // jakis blad jest z headerami nie wiem czemu

let i = 0
coll2.remove({}, { multi: true }, function (err, numRemoved) {
    console.log("usunięto wszystkie dokumenty: ", numRemoved)
});

app.post('/formularz', function (req, res) {
    let obj = {
        _id: i,
        ubezpieczony: req.body.ubezpieczony == "on" ? "TAK" : "NIE",
        benzyna: req.body.benzyna == "on" ? "TAK" : "NIE",
        uszkodzony: req.body.uszkodzony == "on" ? "TAK" : "NIE",
        naped: req.body.naped == "on" ? "TAK" : "NIE",
    }
    coll2.insert(obj, function (err, newDoc) {
        console.log("dodano dokument");
        console.log(newDoc);

        // i++
    })

    coll2.findOne({ _id: i }, function (err, doc) {
        // console.log(i);

        nowykontekst.nowatabelka.push(doc)
        // console.log(nowykontekst);
        i++
        res.render('index.hbs', nowykontekst);
    }); // pobiera od razu to co dodałem



})

app.get('/delete', function (req, res) {

    // return confirm('czy usunąć?')
    // let bul = window.confirm('czy usunąć?') // moze ten alert jakos fetchem i po stronie klienta robic
    // console.log(bul);
    // document.querySelectorAll(".buttonDelete")

    console.log(req.query);
    let noweID = parseFloat(req.query.id)

    coll2.remove({ _id: noweID }, {}, function (err, numRemoved) {
        console.log(`usunięto dokument o id: ${noweID}`);
        console.log(`usunięto dokumentów: ${numRemoved}`);
    });
    coll2.find({}, function (err, docs) {
        // console.log(docs);
        // console.log("nowykontekst: ");
        // console.log(nowykontekst.nowatabelka);
        nowykontekst.nowatabelka = docs // to i render usuwa mi fizycznie z tabelki
        res.render('index.hbs', nowykontekst);
    })

})
//https://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client

app.get('/edit', function (req, res) {
    console.log(req.query);



    res.render('index.hbs', nowykontekst);
})

// app.post('/fetch', function (req, res) {
//     console.log(req.body);

//     res.setHeader('content-type', 'application/json');
//     res.send(JSON.stringify(req.body, null, 3))

// })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})