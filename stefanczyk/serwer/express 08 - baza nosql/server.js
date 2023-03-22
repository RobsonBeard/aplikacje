const Datastore = require('nedb')

// kolekcja - tabela
const coll1 = new Datastore({
    filename: 'kolekcja.db',
    autoload: true
});



// dokument - rekord
// const doc = {
//     a: "a",
//     b: "b"
// };

// coll1.insert(doc, function (err, newDoc) { // INSERT - dodanie danych do kolekcji
//     console.log("dodano dokument (obiekt):")
//     console.log(newDoc)
//     console.log("losowe id dokumentu: " + newDoc._id)
// });
// id dodaje sie samo, jeśli go nie podamy

// --------------
// console.log("PRZED FOR: " + new Date().getMilliseconds())
// for (var i = 0; i < 3; i++) {
//     var doc = {
//         a: "a" + i,
//         b: "b" + i
//     };
//     coll1.insert(doc, function (err, newDoc) {
//         console.log("id dokumentu: " + newDoc._id, "DODANO: " + new Date().getMilliseconds())
//     });
// }
// console.log("PO FOR: " + new Date().getMilliseconds()) // zobacz kolejność wyświetlania milisekund // dodawanie jest asynchroniczne
// --------------

// let doc = {
//     a: "a",
//     b: "b",
//     _id: "HUIr4XfP2hQX9vfa"
// }

// coll1.insert(doc, function (err, newDoc) {
//     console.log("dodano dokument (obiekt):")
//     console.log(newDoc)
// });

// coll1.findOne({ _id: 'HUIr4XfP2hQX9vfa' }, function (err, doc) {
//     console.log("----- obiekt pobrany z bazy: ", doc)
//     console.log("----- formatowanie obiektu js na format JSON: ")
//     console.log(JSON.stringify(doc, null, 5))
// }); // pobranie jednego dokumentu z kolekcji
// --------------

for (let i = 0; i < 5; i++) {
    let doc = {
        a: "a" + i,
        b: "b" + i,
        _id: "adadadad" + i * 10
    }
    coll1.insert(doc, function (err, newDoc) {
        console.log("dodano dokument");
        console.log(newDoc);
    })
}

// coll1.find({}, function (err, docs) {
//     //zwracam dane w postaci JSON
//     console.log("----- tablica obiektów pobrana z bazy: \n")
//     console.log(docs)
//     console.log("----- sformatowany z wcięciami obiekt JSON: \n")
//     console.log(JSON.stringify({ "docsy": docs }, null, 5))
// }); // pobranie wszystkich dokumentów z kolekcji

// --------------

coll1.find({ a: "a1" }, function (err, docs) {
    console.log(JSON.stringify({ "docsy": docs }, null, 5))
}); // pobranie wielu dokumentów z warunkiem

// --------------

coll1.count({}, function (err, count) {
    console.log("dokumentów jest: ", count)
}); // pobranie liczby dokumentów

// --------------

coll1.count({ a: "a1" }, function (err, count) {
    console.log("dokumentów z a1 jest: ", count)
}); // pobranie liczby dokumentów z warunkiem

// --------------

coll1.remove({ a: "a2" }, {}, function (err, numRemoved) {
    console.log("usunięto dokumentów: ", numRemoved)
}); //usunięcie pierwszego napotkanego dokumentu spełniającego warunek

// --------------

coll1.remove({ a: "a1" }, { multi: true }, function (err, numRemoved) {
    console.log("usunięto dokumentów z a1: ", numRemoved)
}); //usunięcie wszystkich dokumentów spełniających warunek

// --------------

coll1.remove({}, { multi: true }, function (err, numRemoved) {
    console.log("usunięto wszystkie dokumenty: ", numRemoved)
}); //usunięcie wszystkich dokumentów z kolekcji