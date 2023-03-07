const http = require("http");
const PORT = 3000;
const fs = require("fs");
require("colors");
const logger = require('tracer').colorConsole();
const mime = require('mime-types');
const path = require("path");

const server = http.createServer((request, response) => {

	let mimeName = ''

	if (request.url === "/") {
		request.url = "/index.html"
	} // po prostu nie musze wpisywac indexa

	let filepath = path.join(__dirname, "static", request.url)
	filepath = decodeURIComponent(filepath)

	if (fs.existsSync(filepath)) {
		mimeName = mime.lookup(filepath)
		fs.readFile(filepath, function (error, data) {
			response.writeHead(200, { 'Content-Type': `${mimeName};charset=utf-8` });
			response.write(data);
			response.end();
		})
	}
	else {
		response.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
		response.write("<h1>404 - brak strony</h1>");
		response.end();
	}
})

const { Server } = require("socket.io");
const socketio = new Server(server);

server.listen(PORT, () => {
	console.log(`serwer startuje na porcie ${PORT}`)
});

let tablicaKlientów = []
let tablicaNicków = []
let wylogowanyObiekt

socketio.on("connection", (client) => {
	console.log("klient się podłączył z id = ", client.id)

	tablicaKlientów.push(client)

	client.on("disconnect", reason => {
		console.log(`klient o ID: ${client.id} się rozłącza, reason: ${reason}`);

		tablicaKlientów = tablicaKlientów.filter(elem => elem.id !== client.id)

		wylogowanyObiekt = tablicaNicków.filter(elem => elem.id === client.id)
		tablicaNicków = tablicaNicków.filter(elem => elem.id !== client.id)

		if (wylogowanyObiekt.length != 0) {
			let wylogowanyNick = wylogowanyObiekt[0].nick

			client.broadcast.emit("wyjscieZCzatu", {
				wylogowanyNick: wylogowanyNick
			})
		}

	});

	client.on("zalogowano", data => {
		tablicaNicków.push({
			id: client.id,
			nick: data.nick
		})

		client.broadcast.emit("nowePolaczenie", {
			nick: data.nick,
		})
	})

	client.on("wiadomosc", data => {
		// console.log(data);
		client.broadcast.emit("nowaWiadomosc", {
			wiadomosc: data.wiadomosc,
			nick: data.nick
		})
	})

})

