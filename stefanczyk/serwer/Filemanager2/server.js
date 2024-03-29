const express = require("express");
const app = express();
const PORT = 3000;
const hbs = require("express-handlebars");
const path = require("path");
const formidable = require("formidable");
const { parse } = require("path");
const fs = require("fs");

// potrzebny express, handlebars, i formidable

app.use(express.static("static"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
); // !!!! to bylo wazne

let przechowujePliki = [];
let j = 0; // zliczanie ID
let nowyKontekst = {};
let testTab;
let sciezkaIkonki;

app.post("/handleUpload", function (req, res) {
  //możliwość zaznaczenia i uploadu jednego lub kilku plików
  let form = formidable({});

  form.multiples = true;
  form.keepExtensions = true;
  form.uploadDir = __dirname + "/pliki/";

  form.parse(req, function (err, fields, files) {
    console.log("----- przesłane formularzem pliki ------");

    console.log(files);

    // if (JSON.stringify(files.plik) === '{}') {

    // } //puste, ale dałem na inpucie, że wymagane jest przesłanie pliku, więc raczej nie może wystąpić
    // else
    if (Array.isArray(files.plik)) {
      for (let i = 0; i < files.plik.length; i++) {
        testTab = files.plik[i].type.split("/");
        // console.log(testTab);
        switch (testTab[1]) {
          case "javascript":
            // sciezkaIkonki = __dirname + '\\static\\ikonki\\js.png'
            sciezkaIkonki =
              "https://cdn-icons-png.flaticon.com/512/337/337941.png";
            break;
          case "jpeg":
            // sciezkaIkonki = __dirname + '\\static\\ikonki\\jpg.png'
            sciezkaIkonki =
              "https://cdn-icons-png.flaticon.com/512/337/337940.png";
            break;
          case "css":
            // sciezkaIkonki = __dirname + '\\static\\ikonki\\css.png'
            sciezkaIkonki =
              "https://cdn-icons-png.flaticon.com/512/337/337928.png";
            break;
          case "msword":
            // sciezkaIkonki = __dirname + '\\static\\ikonki\\doc.png'
            sciezkaIkonki =
              "https://cdn-icons-png.flaticon.com/512/337/337932.png";
            break;
          case "pdf":
            // sciezkaIkonki = __dirname + '\\static\\ikonki\\pdf.png'
            sciezkaIkonki =
              "https://cdn-icons-png.flaticon.com/512/337/337946.png";
            break;
          case "png":
            // sciezkaIkonki = __dirname + '\\static\\ikonki\\png.png'
            sciezkaIkonki =
              "https://cdn-icons-png.flaticon.com/512/337/337948.png";
            break;
          case "x-zip-compressed":
            // sciezkaIkonki = __dirname + '\\static\\ikonki\\zip.png'
            sciezkaIkonki =
              "https://cdn-icons-png.flaticon.com/512/337/337960.png";
            break;
          default:
            sciezkaIkonki =
              "https://cdn-icons-png.flaticon.com/512/4725/4725478.png";
          // sciezkaIkonki = __dirname + '\\static\\ikonki\\unknown.png'
        } // nie działają mi jakoś te lokalizacje nie wiem czemu
        // console.log(sciezkaIkonki);
        let pom = {
          id: j,
          name: files.plik[i].name,
          path: files.plik[i].path,
          size: files.plik[i].size,
          type: files.plik[i].type,
          savedate: new Date().getTime(),
          image: sciezkaIkonki
        };
        przechowujePliki.push(pom);
        j++;
      }
    } //tablica
    else {
      testTab = files.plik.type.split("/");
      switch (testTab[1]) {
        case "javascript":
          sciezkaIkonki =
            "https://cdn-icons-png.flaticon.com/512/337/337941.png";
          break;
        case "jpeg":
          sciezkaIkonki =
            "https://cdn-icons-png.flaticon.com/512/337/337940.png";
          break;
        case "css":
          sciezkaIkonki =
            "https://cdn-icons-png.flaticon.com/512/337/337928.png";
          break;
        case "msword":
          sciezkaIkonki =
            "https://cdn-icons-png.flaticon.com/512/337/337932.png";
          break;
        case "pdf":
          sciezkaIkonki =
            "https://cdn-icons-png.flaticon.com/512/337/337946.png";
          break;
        case "png":
          sciezkaIkonki =
            "https://cdn-icons-png.flaticon.com/512/337/337948.png";
          break;
        case "x-zip-compressed":
          sciezkaIkonki =
            "https://cdn-icons-png.flaticon.com/512/337/337960.png";
          break;
        default:
          sciezkaIkonki =
            "https://cdn-icons-png.flaticon.com/512/4725/4725478.png";
      }
      let pom = {
        id: j,
        name: files.plik.name,
        path: files.plik.path,
        size: files.plik.size,
        type: files.plik.type,
        savedate: new Date().getTime(),
        image: sciezkaIkonki
      };
      przechowujePliki.push(pom);
      j++;
    } //obiekt

    // console.log('----- tablica: ');
    // console.log(przechowujePliki);

    // res.setHeader('content-type', 'application/json');
    // res.send(JSON.stringify(files, null, 3));

    nowyKontekst.przechowane = przechowujePliki;
    console.log("----- kontekst: ");
    console.log(nowyKontekst);

    // res.render('index.hbs') // nie jestem pewien czy tu dawac nowyKontekst
    res.redirect("/");
  });
});

const filepath = path.join(__dirname, "pliki");
let mamKatalogi = [];
let mamPliki = [];

// app.get("/filemanager", function (req, res) {
// })

app.get("/", function (req, res) {
  fs.readdir(filepath, (err, files) => {
    // mozna readdirSync zobaczyc

    mamKatalogi = [];
    mamPliki = [];

    if (err) throw err;

    for (let i = 0; i < files.length; i++) {
      fs.lstat(path.join(filepath, files[i]), (err, stats) => {
        if (stats.isDirectory()) {
          let pom2 = {
            name: files[i]
          };
          mamKatalogi.push(pom2);
        } else {
          let rozszerzenie = files[i].split(".");
          //   console.log(rozszerzenie[rozszerzenie.length - 1]); // to stringi
          let obrazPliku;
          switch (rozszerzenie[rozszerzenie.length - 1]) {
            case "js":
              obrazPliku =
                "https://cdn-icons-png.flaticon.com/512/337/337941.png";
              break;
            case "jpeg":
            case "jpg":
              obrazPliku =
                "https://cdn-icons-png.flaticon.com/512/337/337940.png";
              break;
            case "css":
              obrazPliku =
                "https://cdn-icons-png.flaticon.com/512/337/337928.png";
              break;
            case "txt":
              obrazPliku =
                "https://cdn-icons-png.flaticon.com/512/337/337956.png";
              break;
            case "docx":
            case "doc":
              obrazPliku =
                "https://cdn-icons-png.flaticon.com/512/337/337932.png";
              break;
            case "pdf":
              obrazPliku =
                "https://cdn-icons-png.flaticon.com/512/337/337946.png";
              break;
            case "png":
              obrazPliku =
                "https://cdn-icons-png.flaticon.com/512/337/337948.png";
              break;
            case "php":
              obrazPliku =
                "https://cdn-icons-png.flaticon.com/512/337/337947.png";
              break;
            case "html":
              obrazPliku =
                "https://cdn-icons-png.flaticon.com/512/337/337937.png";
              break;
            case "zip":
              obrazPliku =
                "https://cdn-icons-png.flaticon.com/512/337/337960.png";
              break;
            default:
              obrazPliku =
                "https://cdn-icons-png.flaticon.com/512/4725/4725478.png";
          }
          let pom3 = {
            name: files[i],
            image: obrazPliku
          };
          mamPliki.push(pom3);
        }
      });
    }

    nowyKontekst.katalogi = mamKatalogi;
    nowyKontekst.pliki = mamPliki;

    // console.log(nowyKontekst);

    res.render("filemanager.hbs", nowyKontekst);
  });
  console.log(nowyKontekst);
}); // moze trzeba fetchem??

app.post("/fetch", function (req, res) {
  // console.log(req.body)

  res.setHeader("content-type", "application/json");
  res.send(JSON.stringify(req.body, null, 3));
});

app.post("/nowyKatalog", function (req, res) {
  let daneKatalog = req.body;

  if (daneKatalog.nazwa !== "") {
    if (!fs.existsSync(`./pliki/${daneKatalog.nazwa}`)) {
      fs.mkdir(`./pliki/${daneKatalog.nazwa}`, err => {
        if (err) throw err;
        console.log(`stworzono katalog o nazwie ${daneKatalog.nazwa}`);
      });
      res.redirect("/");
    } else {
      console.log(`katalog o nazwie ${daneKatalog.nazwa} juz istnieje`);
      res.redirect("/");
    }
  } else {
    console.log(`podano pustą nazwę (albo kliknieto cancel)`);
    res.redirect("/");
  }
});

app.post("/nowyPlik", function (req, res) {
  let danePliku = req.body;
  const filepath = path.join(__dirname, "pliki", `${danePliku.nazwa}.txt`);

  if (danePliku.nazwa !== "") {
    if (!fs.existsSync(filepath)) {
      fs.writeFile(filepath, "", err => {
        if (err) throw err;
        console.log(`stworzono plik o nazwie ${danePliku.nazwa}.txt`);
      });

      res.redirect("/");
    } else {
      console.log(`plik o nazwie ${danePliku.nazwa}.txt już istnieje`);
      res.redirect("/");
    }
  } else {
    console.log(`podano pustą nazwę (albo kliknieto cancel)`);
    res.redirect("/");
  }
});

app.post("/usunKatalog", function (req, res) {
  if (fs.existsSync(path.join(__dirname, "pliki", `${req.body.nazwa}`))) {
    fs.rmdir(path.join(__dirname, "pliki", `${req.body.nazwa}`), err => {
      console.log(`usunięto katalog o nazwie ${req.body.nazwa}`);
      res.redirect("/");
    });
  }
});

app.post("/usunPlik", function (req, res) {
  if (fs.existsSync(path.join(__dirname, "pliki", `${req.body.nazwa}`))) {
    fs.unlink(path.join(__dirname, "pliki", `${req.body.nazwa}`), err => {
      console.log(`usunięto plik o nazwie ${req.body.nazwa}`);
      res.redirect("/");
    });
  }
});

// app.get("/reset", function (req, res) {
//     console.log("usunięto " + przechowujePliki.length + " plików");
//     przechowujePliki = []
//     nowyKontekst.przechowane = przechowujePliki
//     // res.render('filemanager.hbs', nowyKontekst);
//     res.redirect('/filemanager')
// })

// app.get("/show", function (req, res) {
//     console.log(req.query);
//     for (let i = 0; i < przechowujePliki.length; i++) {
//         if (przechowujePliki[i].id == parseFloat(req.query.id)) {
//             res.sendFile(path.join(przechowujePliki[i].path))
//         }
//     }
// })

// let kontekstInfo = {}

// app.get("/info", function (req, res) {
//     console.log(req.query);
//     for (let i = 0; i < przechowujePliki.length; i++) {
//         if (przechowujePliki[i].id == parseFloat(req.query.id)) {
//             kontekstInfo = {
//                 id: przechowujePliki[i].id,
//                 name: przechowujePliki[i].name,
//                 path: przechowujePliki[i].path,
//                 size: przechowujePliki[i].size,
//                 type: przechowujePliki[i].type,
//                 savedate: przechowujePliki[i].savedate,
//             }
//         }
//     }
//     res.render('info.hbs', kontekstInfo);
// })

// app.get("/delete", function (req, res) {
//     console.log(req.query);
//     for (let i = 0; i < przechowujePliki.length; i++) {
//         if (przechowujePliki[i].id == parseFloat(req.query.id)) {
//             przechowujePliki.splice(i, 1)
//         }
//     }

//     nowyKontekst.przechowane = przechowujePliki
//     // res.render('filemanager.hbs', nowyKontekst);
//     res.redirect('/filemanager')
// }) // mondre

// app.get("/download", function (req, res) {
//     console.log(req.query);
//     for (let i = 0; i < przechowujePliki.length; i++) {
//         if (przechowujePliki[i].id == parseFloat(req.query.id)) {
//             res.download(path.join(przechowujePliki[i].path))
//         }
//     }

//     // res.redirect('/filemanager') //niepotrzebne
//     // res.render('filemanager.hbs', nowyKontekst);
// })

app.set("views", path.join(__dirname, "views"));
app.engine(
  "hbs",
  hbs({
    defaultLayout: "main.hbs",
    extname: ".hbs",
    partialsDir: "views/partials",
    helpers: {
      shortName: function (title) {
        let wynik;
        if (title.length > 20) {
          wynik =
            title.substring(0, 12) +
            "-...-" +
            title.substring(title.length - 5, title.length);
          return wynik;
        } else {
          return title;
        }
      }
    }
  })
);
app.set("view engine", "hbs");

app.listen(PORT, function () {
  console.log("start serwera na porcie " + PORT);
});
