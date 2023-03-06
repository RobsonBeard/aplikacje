const http = require("http");
const PORT = 3000;
const fs = require("fs");
require("colors");
const logger = require('tracer').colorConsole();
const mime = require('mime-types');
const path = require("path");

const server = http.createServer((request, response) => {

	let mimeName = ''

	// console.log(`żądany przez przeglądarkę adres: ${request.url}`)

	if (request.url === "/") {
		request.url = "/index4.html"
	} // po prostu nie musze wpisywac indexa

	let filepath = path.join(__dirname, "static", request.url)
	filepath = decodeURIComponent(filepath)

	// console.log(`filepath: ${filepath}`);

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

server.listen(PORT, () => {
	console.log(`serwer startuje na porcie ${PORT}`)
});
