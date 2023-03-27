const http = require("http");
const PORT = 3000;
const fs = require("fs");
require("colors");
const logger = require('tracer').colorConsole();
const mime = require('mime-types');
const path = require("path");
const Datastore = require('nedb')
const os = require("os")

const server = http.createServer((req, res) => {

})


// const coll1 = new Datastore({
// 	filename: 'kolekcja2.db',
// 	autoload: true
// });


// const save = async (sekundy) => {
// 	return new Promise((resolve, reject) => {
// 		let interval
// 		let i = 0
// 		let tablicaDodanych = []
// 		let tablicaMilisekund = []
// 		try {
// 			interval = setInterval(() => {
// 				if (i >= sekundy) {
// 					clearInterval(interval)
// 					for (let j = 0; j < tablicaDodanych.length; j++) {
// 						tablicaMilisekund.push(tablicaDodanych[j].m)
// 					}
// 					resolve(tablicaMilisekund)
// 				}
// 				else {
// 					let nowaData = new Date()
// 					let obj = {
// 						s: nowaData.getSeconds(),
// 						m: nowaData.getMilliseconds()
// 					}
// 					tablicaDodanych.push(obj)

// 					coll1.insert(obj, function (err, newDoc) {
// 						console.log(newDoc)
// 					});
// 					console.log(i);
// 					i++
// 				}

// 			}, 1000);
// 		}
// 		catch (err) {
// 			reject(err)
// 		}
// 	})
// }

// const go = async () => {
// 	const all = await save(10)
// 	console.log(all);
// }

// go()

// console.log(os.freemem());
// console.log(os.totalmem());

let interval

interval = setInterval(() => {
	let nowaData = new Date()
	let nazwaPliku = `log_${nowaData.getHours()}_${nowaData.getMinutes()}_${nowaData.getSeconds()}.log`
	const filepath = path.join(__dirname, 'logi', nazwaPliku)

	if (!fs.existsSync(filepath)) {
		fs.writeFile(filepath, "", err => {
			if (err) throw err;
			console.log(`stworzono plik o nazwie ${nazwaPliku}`);
		});
	}
}, 1000);

server.listen(PORT, () => {
	console.log(`serwer startuje na porcie ${PORT}`)
});
