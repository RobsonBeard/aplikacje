const http = require("http");
const PORT = 3000;
const fs = require("fs");
require("colors");
const logger = require('tracer').colorConsole();
const mime = require('mime-types');
const path = require("path");

const server = http.createServer((req, res) => {

	console.log(req.method)
	console.log(req.url);

	switch (req.method) {
		case "GET":
			//wyświetlenie strony html
			let mimeName = ''

			if (req.url === "/") {
				req.url = "/index03.html"
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

	//kiedy przyjdą już WSZYSTKIE dane, logujemy je
	//i odsyłamy do przeglądarki

	req.on("end", function (data) {

		console.log("body: ", body)
		const params = new URLSearchParams(body)
		const obj = Object.fromEntries(params)
		let finishObj = {}
		let wynik
		let message
		let finishArr = []


		if (obj.dzialanie != "wszystko") {
			switch (obj.dzialanie) {
				case "suma":
					wynik = parseFloat(obj.a) + parseFloat(obj.b)
					message = "suma dwóch elementów"
					break;
				case "roznica":
					wynik = parseFloat(obj.a) - parseFloat(obj.b)
					message = "różnica dwóch elementów"
					break;
				case "iloczyn":
					wynik = parseFloat(obj.a) * parseFloat(obj.b)
					message = "iloczyn dwóch elementów"
					break;
				case "iloraz":
					wynik = parseFloat(obj.a) / parseFloat(obj.b)
					message = "iloraz dwóch elementów"
					break;
			}
			singleObj = {
				wynik: wynik,
				message: message
			}
			finishObj = singleObj

			console.log("finishObj: ");
			console.log(finishObj);
		}
		else {
			finishArr = [
				{
					wynik: parseFloat(obj.a) + parseFloat(obj.b),
					message: "suma dwóch elementów"
				},
				{
					wynik: parseFloat(obj.a) - parseFloat(obj.b),
					message: "różnica dwóch elementów"
				},
				{
					wynik: parseFloat(obj.a) * parseFloat(obj.b),
					message: "iloczyn dwóch elementów"
				},
				{
					wynik: parseFloat(obj.a) / parseFloat(obj.b),
					message: "iloraz dwóch elementów"
				}

			]
		}

		res.writeHead(200, { "Content-type": "application/json;charset=utf-8" });
		if (finishArr.length > 0) {
			res.end(JSON.stringify(finishArr, null, 5));
		}
		else {
			res.end(JSON.stringify(finishObj, null, 5));
		}

	})

}

server.listen(PORT, () => {
	console.log(`serwer startuje na porcie ${PORT}`)
});
