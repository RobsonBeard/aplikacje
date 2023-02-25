const express = require("express");
const app = express();
const PORT = 3000;
const hbs = require("express-handlebars");
const path = require("path");
const formidable = require("formidable");
const { parse } = require("path");
const fs = require("fs");

app.use(express.static("static"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

let nowyKontekst = {};

app.post("/handleUpload", function (req, res) {
  let form = formidable({});

  form.multiples = true;
  form.keepExtensions = true;

  form.on('field', function (field, value) {
    form.uploadDir = path.join(__dirname, 'pliki', value)
    // console.log(form.uploadDir)
  }) // kolejność inputów w hbsie ma znaczenie

  form.on('fileBegin', function (name, file) {
    file.path = form.uploadDir + '/' + file.name
    // console.log(file.path);
  })

  form.parse(req, function (err, fields, files) {
    res.redirect(`/filemanager?name=${fields.sciezka}`);
  });
});


let mamKatalogi = [];
let mamPliki = [];

app.get("/", function (req, res) {
  res.redirect("/filemanager");
})

app.get("/filemanager", function (req, res) {

  const filepath = (req.query.name) ? path.join(__dirname, "pliki", req.query.name) : path.join(__dirname, "pliki");
  // skrócony if

  // console.log(filepath);

  if (fs.existsSync(filepath)) {
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

      // console.log(req.query);

      nowyKontekst.sciezka = req.query.name
      nowyKontekst.katalogi = mamKatalogi;
      nowyKontekst.pliki = mamPliki;

      // console.log(nowyKontekst.sciezka);

      res.render("filemanager.hbs", nowyKontekst);
    });
  }
  else {
    res.redirect("/filemanager")
  }
  // console.log(nowyKontekst);
});

app.get("/nowyKatalog", function (req, res) {
  let daneKatalog = req.query;

  if (daneKatalog.nazwa !== "") {
    const filepath = path.join(__dirname, 'pliki', req.query.sciezka, req.query.nazwa)
    if (!fs.existsSync(filepath)) {
      fs.mkdir(filepath, err => {
        if (err) throw err;
        console.log(`stworzono katalog o nazwie ${daneKatalog.nazwa}`);
      });
      res.redirect(`/filemanager?name=${req.query.sciezka}`);
    } else {
      console.log(`katalog o nazwie ${daneKatalog.nazwa} juz istnieje`);
      res.redirect(`/filemanager?name=${req.query.sciezka}`);
    }
  } else {
    console.log(`podano pustą nazwę`);
    res.redirect(`/filemanager?name=${req.query.sciezka}`);
  }
});

app.get("/nowyPlik", function (req, res) {
  let danePliku = req.query;


  if (danePliku.nazwa !== "") {
    const filepath = path.join(__dirname, "pliki", req.query.sciezka, req.query.nazwa);
    if (!fs.existsSync(filepath)) {
      fs.writeFile(filepath, "", err => {
        if (err) throw err;
        console.log(`stworzono plik o nazwie ${danePliku.nazwa}.txt`);
      });

      res.redirect(`/filemanager?name=${req.query.sciezka}`);
    } else {
      console.log(`plik o nazwie ${danePliku.nazwa}.txt już istnieje`);
      res.redirect(`/filemanager?name=${req.query.sciezka}`);
    }
  } else {
    console.log(`podano pustą nazwę`);
    res.redirect(`/filemanager?name=${req.query.sciezka}`);
  }
});

app.get("/zmianaNazwy", function (req, res) {
  const new_dir = req.query.sciezka.substring(0, req.query.sciezka.lastIndexOf('/') + 1) + req.query.nazwa
  // substring robi: halo/malo -> halo/
  const new_path = path.join(__dirname, "pliki", new_dir)
  const old_path = path.join(__dirname, 'pliki', req.query.sciezka)

  // console.log(new_path);
  // console.log(old_path)

  if (!fs.existsSync(new_path)) {
    fs.rename(old_path, new_path, (err) => {
      if (err) console.log(err)
      else {
        res.redirect(`/filemanager?name=${new_dir}`)
      }
    })
  }
  else {
    res.redirect(`/filemanager?name=${req.query.sciezka}`)
  }

})

app.post("/usunKatalog", function (req, res) {
  const filepath = path.join(__dirname, "pliki", req.body.nazwa)
  if (fs.existsSync(filepath)) {
    fs.rmSync(filepath, {
      recursive: true,
      force: true
    })
    console.log(`usunięto katalog o nazwie ${req.body.nazwa}`);
    res.redirect(`/filemanager?name=${req.body.sciezka}`);

  }
});

app.post("/usunPlik", function (req, res) {
  const filepath = path.join(__dirname, "pliki", req.body.nazwa)
  if (fs.existsSync(filepath)) {
    fs.unlink(filepath, err => {
      console.log(`usunięto plik o nazwie ${req.body.nazwa}`);
      res.redirect(`/filemanager?name=${req.body.sciezka}`);
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
      },
      filePath: function (sciezka) {
        if (sciezka == undefined) {
          return `<a href="/">home</a>`
        }
        else {
          let arraySciezka = sciezka.split('/')
          arraySciezka[0] = 'home'
          let zliczacz
          for (let i = 0; i < arraySciezka.length; i++) {
            if (i == 0) {
              arraySciezka[i] = `<a href="/filemanager">${arraySciezka[i]}</a>`
              zliczacz = "/filemanager?name="
            }
            else {
              zliczacz += `/${arraySciezka[i]}`
              arraySciezka[i] = `<a href="${zliczacz}">${arraySciezka[i]}</a>`
            }
          }
          let stringSciezka = arraySciezka.join(`<p style="display: inline;"> > </p>`)
          return stringSciezka
        }
      }
    }
  })
);
app.set("view engine", "hbs");

app.listen(PORT, function () {
  console.log("start serwera na porcie " + PORT);
});
