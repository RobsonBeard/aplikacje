const http = require("http");
const PORT = 3000;
const fs = require("fs");
require("colors");
const logger = require('tracer').colorConsole();
const mime = require('mime-types');
const path = require("path");
const Datastore = require('nedb')

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

// function serverResponse(req, res) {
// 	let body = "";

// 	//kiedy przychodzą dane postem, w postaci pakietów
// 	//łącza się do jednej zmiennej "body"

// 	req.on("data", function (data) {
// 		console.log("data: " + data)
// 		body += data.toString();
// 	})

// 	//kiedy przyjdą już WSZYSTKIE dane, logujemy je, parsujemy je do obiektu
// 	//i odsyłamy do przeglądarki

// 	req.on("end", function (data) {

// 		console.log("body: ", body)

// 		const obj = JSON.parse(body)
// 		console.log("obj: ");
// 		console.log(obj);

// 		let finishObj = obj

// 		res.writeHead(200, { "Content-type": "application/json;charset=utf-8" });
// 		res.end(JSON.stringify(finishObj, null, 5));

// 	})

// }

//------

// const test = async () => {
// 	return new Promise(resolve => {
// 		resolve("zwracam komunikat o powodzeniu albo wynik długotrwałej operacji")
// 	})
// }


// const check = async () => {
// 	let info = await test()
// 	console.log(info);
// }

// check()

//-------

// const test = async (x) => {
// 	return new Promise(resolve => {
// 		setTimeout(() => {
// 			resolve("zwracam komunikat o powodzeniu dłuższej operacji po 2000ms")
// 		}, 2000);

// 	})
// }

// const check = async () => {
// 	let info = await test(0)
// 	console.log(info);
// }

// check()

//------

// const test = async () => {
// 	return new Promise((resolve, reject) => {
// 		try {
// 			resolve("powodzenie długiej operacji")
// 		}
// 		catch (ex) {
// 			reject(ex)
// 		}
// 	})
// }

// const check = async () => {
// 	let info = await test()
// 	console.log(info);
// }

// check()

//------

// const test = async () => {
// 	return new Promise((resolve, reject) => {
// 		try {
// 			fs.readFile("./file01.txt", (err, data) => {
// 				if (err)
// 					resolve(err.message)
// 				else
// 					resolve(data.toString())
// 			})
// 		}
// 		catch (ex) {
// 			reject(ex)
// 		}
// 	})
// }

// const check = async () => {
// 	let info = await test()
// 	console.log(info);
// }

// check()

// -----

// const test = async (z) => {
// 	return new Promise((resolve, reject) => {

// 		let y = z % 2

// 		try {
// 			if (y == 0) {
// 				resolve(`${z} dzieli się bez reszty`)
// 			}
// 			else {
// 				resolve(`${z} z resztą`)
// 			}

// 		} catch (error) {
// 			reject(error)
// 		}

// 	})
// }

// const check = async () => {
// 	let a = await test(3)
// 	console.log(a);
// 	let b = await test(5)
// 	console.log(b);
// 	let c = await test(6)
// 	console.log(c);
// }

// check()

// -----

// const test = async (x) => {
// 	return new Promise((resolve, reject) => {
// 		let interval
// 		let i = 0
// 		try {
// 			interval = setInterval(() => {
// 				console.log("liczę...")
// 				if (i < x) {
// 					i++
// 				}
// 				else {
// 					clearInterval(interval)
// 					resolve(x * x)
// 					console.log(`wynik = ${x * x}`)
// 				}

// 			}, 500);

// 		} catch (error) {
// 			reject(error)
// 		}

// 	})
// }

// check = async () => {
// 	const x = await test(4)
// 	const y = await test(3)
// 	const sum = `suma = ${x + y}`
// 	console.log(sum);
// }

// check()

// -----

// const waitForMe = (milisec, data) => {
// 	return new Promise((resolve, reject) => {
// 		try {
// 			setTimeout(() => { resolve(data) }, milisec);
// 		}
// 		catch (error) {
// 			reject(error)
// 		}
// 	})
// }

// const printuj = async () => {
// 	// a) for in object
// 	// let a = 0
// 	// const o = { a: 1, b: 2, c: 3, d: 4, e: 5 }
// 	// for (const i in o) {
// 	// 	a += await waitForMe(500, o[i]);
// 	// 	console.log("wynik pośredni: " + i + o[i]);
// 	// }
// 	// console.log("suma wartości w obiekcie: " + a);

// 	// b) for of array
// 	// let a = 0;
// 	// const t = [1, 2, 3, 4, 5]
// 	// for (const i of t) {
// 	// 	a += await waitForMe(500, i);
// 	// 	console.log("wynik pośredni: " + a);
// 	// }
// 	// console.log("suma: " + a);

// 	// c) foreach - nie działa porawnie, bo foreach nie
// 	// wykonuje się po kolei tylko równlegle
// 	// * to ciekawe
// 	// let a = 0;
// 	// const t = [1, 2, 3, 4, 5]
// 	// t.forEach(async (item) => {
// 	// 	a += await waitForMe(1000, item);
// 	// 	console.log("wynik pośredni: " + a);
// 	// });
// 	// console.log("suma: " + a);

// 	// d) zwykły for - poprawnie
// 	// for (let i = 0; i < 5; i++) {
// 	// 	console.log(await waitForMe(1000, i));
// 	// }
// 	// console.log("koniec printowania co 1000 ms- można działać dalej!");
// 	// for (let i = 0; i < 5; i++) {
// 	// 	console.log(await waitForMe(500, i));
// 	// }
// 	// console.log("koniec printowania co 500 ms- można działać dalej!");
// 	// for (let i = 0; i < 5; i++) {
// 	// 	console.log(await waitForMe(100, i));
// 	// }
// 	// console.log("koniec printowania co 100 ms!");
// }

// printuj();

// -----

const coll1 = new Datastore({
	filename: 'kolekcja.db',
	autoload: true
});

const getAll = async () => {
	return new Promise((resolve, reject) => {
		try {
			coll1.find({}, (err, docs) => {
				resolve(docs)
			});
		} catch (error) {
			reject(error.message)
		}
	})
}

const show = async () => {
	console.log("pobieram dane 1 raz");
	let x = await getAll()
	console.log(x);
	console.log("pobieram dane 2 raz");
	let y = await getAll()
	console.log(y);
}

show()


server.listen(PORT, () => {
	console.log(`serwer startuje na porcie ${PORT}`)
});
