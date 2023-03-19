const http = require("http");
const PORT = 3000;
const fs = require("fs");
require("colors");
const logger = require('tracer').colorConsole();
const mime = require('mime-types');
const path = require("path");

const daneKomentarze = {
    array: [
        {
            id: 123,
            thread: "thread 1",
            comments: [
                { id: 1, text: "aaa", date: "1999" },
                { id: 2, text: "bbb", date: "2000" },

            ]
        },
        {
            id: 247,
            thread: "thread 2",
            comments: [
                { id: 5, text: "ddd", date: "1999" },
                { id: 13, text: "eee", date: "2000" },
                { id: 15, text: "fff", date: "2001" }
            ]
        },
        {
            id: 350,
            thread: "thread 3",
            comments: [
                { id: 6, text: "ggg", date: "1999" },
                { id: 7, text: "hhh", date: "2000" },
                { id: 18, text: "iii", date: "2001" },
            ]
        },
    ]
}

const server = http.createServer((req, res) => {

    console.log(req.method)
    console.log(req.url);

    switch (req.method) {
        case "GET":
            //wyświetlenie strony html
            let mimeName = ''

            if (req.url === "/") {
                req.url = "/index06.html"
            }

            let filepath = path.join(__dirname, "static", req.url)
            filepath = decodeURIComponent(filepath)

            if (fs.existsSync(filepath)) {
                mimeName = mime.lookup(filepath)
                fs.readFile(filepath, function (error, data) {
                    res.writeHead(200, { 'Content-Type': `${mimeName};charset=utf-8` });
                    res.write(data);
                    res.end();
                })
            }
            else {
                res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
                res.write("<h1>404 - brak strony</h1>");
                res.end();
            }
            break;

        case "POST":
            // odbiór posta
            serverResponse(req, res)

            break;
    }
})

function serverResponse(req, res) {
    let body = "";

    //kiedy przychodzą dane postem, w postaci pakietów
    //łącza się do jednej zmiennej "body"

    req.on("data", function (data) {
        console.log("data: " + data)
        body += data.toString();
    })

    //kiedy przyjdą już WSZYSTKIE dane, logujemy je, parsujemy je do obiektu
    //i odsyłamy do przeglądarki

    if (req.url === "/odbiorDanych") {
        req.on("end", function (data) {

            console.log("body: ", body)

            // const obj = JSON.parse(body)
            // console.log("obj: ");
            // console.log(obj);

            // let finishObj = obj

            res.writeHead(200, { "Content-type": "application/json;charset=utf-8" });
            res.end(JSON.stringify(daneKomentarze, null, 5));

        })
    }



}

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});
