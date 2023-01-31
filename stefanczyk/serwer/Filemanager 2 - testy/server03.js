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

// funkcja tworzy i nie zdąży usunąć katalogu newdir - !!!niepoprawna!!! kolejność działań

// if (!fs.existsSync("./newdir")) {
//     fs.mkdir("./newdir", (err) => {
//         if (err) throw err
//         console.log("jest");
//     })
// }

// if (fs.existsSync("./newdir")) {
//     fs.rmdir("./newdir", (err) => {
//         if (err) throw err
//         console.log("nie ma ");
//     })
// }

// ---

// funkcja tworzy i usuwa katalog - poprawna kolejność callbacków

// if (!fs.existsSync("./newdir")) {
//     fs.mkdir("./newdir", (err) => {
//         if (err) throw err
//         console.log("jest");
//         if (fs.existsSync("./newdir")) {
//             fs.rmdir("./newdir", (err) => {
//                 if (err) throw err
//                 console.log("nie ma ");
//             })
//         }
//     })
// }

// ---

// przykład pobiera zawartość katalogu głównego aplikacji czyli __dirname

// fs.readdir(__dirname, (err, files) => {
//     if (err) throw err
//     console.log("lista", files);
// })

// ---

// listowanie i dodanie nowego katalogu - niepoprawna kolejność callbacków

// fs.readdir(__dirname, (err, files) => {
//         if (err) throw err
//         console.log("lista 1  - ", files);
//     })

//     fs.mkdir("./newdir", (err) => {
//         if (err) throw err
//         console.log("jest");
//     })

//     fs.readdir(__dirname, (err, files) => {
//         if (err) throw err
//         console.log("lista 2  - ", files);
//     })


// listowanie i dodanie nowego katalogu - poprawnie, trzeba zwracać uwagę na zagnieżdżenie

// fs.readdir(__dirname, (err, files) => {
//     if (err) throw err
//     console.log("lista 1  - ", files);

//     fs.mkdir("./newdir", (err) => {
//         if (err) throw err
//         console.log("dodany");

//         fs.readdir(__dirname, (err, files) => {
//             if (err) throw err
//             console.log("lista 2  - ", files);
//         })
//     })
// })

// ---

// sprawdzenie czy to plik czy katalog

const filepath = path.join(__dirname, "newdir")

// nie wiem czemu, jak zamienię ścieżkę na filepath, to robi się stats undefined!!!!! czemu
fs.readdir(filepath, (err, files) => {
    if (err) throw err

    // foreach
    // files to lista tych plików i katalogów w całym dirname // popatrz na console.log
    // file to pojedynczy plik/katalog w tej liście, odwołuję sie do niego i pokazuje czy jest katalogiem // popatrz na console.log

    // console.log(files);

    // files.forEach((file) => {
    //     fs.lstat(path.join(filepath, file), (err, stats) => { // jak tu dam filepath, to bedzie ciagle true, bo filepath to katalog
    //         console.log(file, stats.isDirectory());
    //     })
    //     // console.log(filepath);
    //     // console.log(file);
    //     // console.log(filepath + file); // tutaj nie ma /
    //     // path.join(filepath, file)

    // }) // w miejsce "path to file here!!!" powinno być path.join(filepath, file)

    // lub for of

    // for (const f of files) {
    //     fs.lstat(path.join(filepath, f), (err, stats) => {
    //         console.log(f, stats.isDirectory());
    //     })
    //     
    //     // console.log(f);
    // }

    // lub mój for

    for (let i = 0; i < files.length; i++) {
        fs.lstat(path.join(filepath, files[i]), (err, stats) => {
            console.log(files[i], stats.isDirectory());
        })
    }


})


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})