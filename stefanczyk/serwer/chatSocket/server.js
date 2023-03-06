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

socketio.on("connection", (client) => {
	console.log("klient się podłączył z id = ", client.id)

	client.on("disconnect", reason => {
		console.log(`klient o ID: ${client.id} się rozłącza, reason: ${reason}`);
	});




})

