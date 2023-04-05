const http = require("http");
const PORT = 3000;
const fs = require("fs");
require("colors");
const logger = require('tracer').colorConsole();
const mime = require('mime-types');
const path = require("path");
const Datastore = require('nedb')
const os = require("os");
const { resolve } = require("path");
const { fileURLToPath } = require("url");

const coll1 = new Datastore({
	filename: 'kolekcja3.db',
	autoload: true
});

coll1.remove({}, { multi: true }, function (err, numRemoved) {
	console.log("usunięto wszystkie dokumenty: ", numRemoved)
});

let i = 0
let interval = null

const server = http.createServer((req, res) => {

	console.log(req.method)
	console.log(req.url);

	switch (req.method) {
		case "GET":
			//wyświetlenie strony html
			let mimeName = ''

			if (req.url === "/") {
				req.url = "/index01.html"
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
	let body = [];

	req.on("data", function (data) {
		console.log("data: " + data)
		body.push(data);
	})

	if (req.url === "/fetchData") {
		req.on("end", function (data) {
			// console.log("i: ", i); // dziala

			coll1.find({ id: { $gte: i - 20 } }, function (err, docs) {
				res.writeHead(200, { "Content-type": "application/json;charset=utf-8" });
				res.end(JSON.stringify(docs, null, 5));
			})
		})
	}
	else if (req.url === "/startRecordingData") {
		if (interval === null) {
			interval = setInterval(() => {
				let obj = {
					id: i,
					time: new Date().valueOf(),
					used: process.memoryUsage().heapUsed,
					total: process.memoryUsage().heapTotal
				}
				coll1.insert(obj, function (err, newDoc) {
					console.log(newDoc)
				});
				i++
			}, 1000);
		}

		res.writeHead(200, { "Content-type": "application/json;charset=utf-8" });
		res.end(JSON.stringify({ comment: "start zapisu powiodl sie" }, null, 5));
	}
}

server.listen(PORT, () => {
	console.log(`serwer startuje na porcie ${PORT}`)
});
