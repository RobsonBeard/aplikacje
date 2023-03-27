const express = require("express")
const app = express()
const PORT = 3000;
const hbs = require('express-handlebars');
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

let i = 0

coll2.remove({}, { multi: true }, function (err, numRemoved) {
    console.log("usunięto wszystkie dokumenty: ", numRemoved)
});

app.get("/", function (req, res) {
    res.render('index.hbs', nowykontekst)
})

app.post('/dodajDokument', function (req, res) {
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
        nowykontekst.nowatabelka.push(newDoc)
        i++
        res.redirect('/');
    })
})

app.get('/delete', function (req, res) {

    console.log(req.query);
    let noweId = parseFloat(req.query.id)

    coll2.remove({ _id: noweId }, {}, function (err, numRemoved) {
        console.log(`usunięto dokument o id: ${noweId}`);
        console.log(`usunięto dokumentów: ${numRemoved}`);
    });
    coll2.find({}, function (err, docs) {
        nowykontekst.nowatabelka = docs // to i render usuwa mi fizycznie z tabelki
        res.redirect('/');
    })

})

app.post('/fetchEdit', function (req, res) {

    let obj = {
        _id: parseFloat(req.body.id),
        ubezpieczony: req.body.ubezpieczony,
        benzyna: req.body.benzyna,
        uszkodzony: req.body.uszkodzony,
        naped: req.body.naped,
    }

    coll2.update({ _id: obj._id }, { $set: obj }, {}, function (err, numUpdated) {
        console.log("zaktualizowano " + numUpdated)

        for (let i = 0; i < nowykontekst.nowatabelka.length; i++) {
            if (nowykontekst.nowatabelka[i]._id === obj._id) {
                nowykontekst.nowatabelka[i] = obj
            }
        }
    });

    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(req.body, null, 5));
})

app.set("views", path.join(__dirname, "views"));
app.engine(
    "hbs",
    hbs({
        defaultLayout: "main.hbs",
        extname: ".hbs",
        partialsDir: "views/partials",
        helpers: {
            shortName: function (title) {
                // ...
            },
        }
    })
);
app.set("view engine", "hbs");

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})