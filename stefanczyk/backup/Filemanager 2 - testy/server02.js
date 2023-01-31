const express = require("express")
const app = express()
const PORT = 3000;
const hbs = require('express-handlebars');
const formidable = require('formidable');
const { parse } = require("path");
const path = require("path")
const fs = require("fs")

app.use(express.static('static'))

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/index.html"))
})

// fs.readFile("./files/file01.txt", (err, data) => {
//     if (err) throw err
//     console.log(data.toString());
// })

// ---

// fs.readFile("./files/file01.txt", "utf-8", (err, data) => {
//     if (err) throw err
//     console.log(data.toString());
// })

// ---

const filepath = path.join(__dirname, "files", "file01.txt") // przemyslec czy to bedzie na gorze

const filepath2 = path.join(__dirname, "files", "file02.txt") // przy okazji to może tworzyć nowy plik

// fs.writeFile(filepath2, "To jest tekst który pojawi się w pliku zamiast poprzedniego", (err) => {
//     if (err) throw err
//     console.log("plik file02.txt nadpisany");
// })

// ---

// fs.appendFile(filepath2, "\n\nTo jest tekst, który zostanie dopisany do pliku", (err) => {
//     if (err) throw err
//     console.log("Dopisano informacje do pliku file02.txt");
// })

// ---

// fs.unlink(filepath, (err) => {
//     if (err) throw err
//     console.log("czas usuwania: " + new Date().getMilliseconds() + " milisekund");
// })

// ---

// if (fs.existsSync(filepath)) {
//     console.log("plik istnieje");
// }
// else {
//     console.log("plik nie istnieje");
// }

// ---

// const filepath3 = path.join(__dirname, "files", "file03.txt")
// const filepath4 = path.join(__dirname, "files", "file04.txt")

// fs.writeFile(filepath3, "tekst do nadpisania", (err) => {
//     if (err) throw err
//     console.log("plik utworzony - czas 1: " + new Date().getMilliseconds() + " milisekund");

//     fs.appendFile(filepath3, "\n\ntekst do dopisania", (err) => {
//         if (err) throw err
//         console.log("plik zmodyfikowany - czas 2: " + new Date().getMilliseconds() + " milisekund");

//     })
// })




app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})