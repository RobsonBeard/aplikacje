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

const server = http.createServer((req, res) => {

})

const save = async (sekundy) => {
	return new Promise((resolve, reject) => {
		let interval
		let i = 0
		let tablicaFilepathow = []
		try {
			interval = setInterval(() => {
				if (i >= sekundy) {
					clearInterval(interval)
					resolve(tablicaFilepathow)
				} else {
					let nowaData = new Date()
					let nazwaPliku = `log_${nowaData.getHours()}_${nowaData.getMinutes()}_${nowaData.getSeconds()}.log`

					const filepath = path.join(__dirname, 'logi', nazwaPliku)
					let zawartoscPliku = { totalmem: os.totalmem(), freemem: os.freemem() }
					tablicaFilepathow.push(filepath)

					if (!fs.existsSync(filepath)) {
						fs.writeFile(filepath, JSON.stringify(zawartoscPliku), err => {
							if (err) throw err;
							console.log(`stworzono plik o nazwie ${nazwaPliku}`);
						});
					}
					i++
				}
			}, 1000);
		}
		catch (err) {
			reject(err)
		}
	})
}

const readAll = async (filepathy) => {
	return new Promise((resolve, reject) => {
		let tablicaPlikow = []
		let j = 0
		try {
			for (let i = 0; i < filepathy.length; i++) {
				fs.readFile(filepathy[i], (err, data) => {
					if (err) throw err
					tablicaPlikow.push(JSON.parse(data))
					if (tablicaPlikow.length === filepathy.length) {
						resolve(tablicaPlikow)
					}
				})
			}
		}
		catch (err) {
			reject(err)
		}
	})
}

const go = async () => {
	const savedFiles = await save(5)
	console.log(savedFiles);
	const readFiles = await readAll(savedFiles)
	console.log(readFiles);
}

go()

server.listen(PORT, () => {
	console.log(`serwer startuje na porcie ${PORT}`)
});
