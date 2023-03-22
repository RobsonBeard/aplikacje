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

let commentId = 19 // bo ostatnie ID to 18, ale moze tylko rozrozniac ID w srodku watku

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
    let body = []; // nie wiem czy to poprawne, ale dziala

    req.on("data", function (data) {
        console.log("data: " + data)
        body.push(data)
    })

    if (req.url === "/odbiorDanych") {
        req.on("end", function (data) {

            res.writeHead(200, { "Content-type": "application/json;charset=utf-8" });
            res.end(JSON.stringify(daneKomentarze, null, 5));
        })
    }
    else if (req.url === "/nowyKomentarz") {
        req.on("end", function (data) {

            const przychodzacyObiekt = JSON.parse(body) //* to wazne jest i tez wazne zeby body zostalo

            for (let i = 0; i < daneKomentarze.array.length; i++) {
                if (przychodzacyObiekt.threadId === daneKomentarze.array[i].id) {
                    daneKomentarze.array[i].comments.push(
                        { id: commentId, text: przychodzacyObiekt.text, date: przychodzacyObiekt.date }
                    )
                    commentId++
                }
            }

            res.writeHead(200, { "Content-type": "application/json;charset=utf-8" });
            res.end(JSON.stringify(przychodzacyObiekt, null, 5));
        })
    }



}

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});
