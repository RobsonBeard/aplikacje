const http = require("http");
const PORT = 3000;
const fs = require("fs");
require("colors");
const logger = require('tracer').colorConsole();

// logger.log('hello');
// logger.trace('hello');
// logger.debug('hello');
// logger.info('hello');
// logger.warn('hello');
// logger.error('hello');

const server = http.createServer((request, response) => {

	console.log(`żądany przez przeglądarkę adres: ${request.url}`)


	if (request.url === "/strona3.html") {
		fs.readFile("static/strona3.html", function (error, data) {
			response.writeHead(200, { 'Content-Type': 'text/html' });
			response.write(data);
			response.end();
		})
	}
	else if (request.url === "/style.css") {
		fs.readFile("static/style.css", function (error, data) {
			response.writeHead(200, { 'Content-Type': 'text/css' });
			response.write(data);
			response.end();
		})
	}
	else if (request.url === "/script.js") {
		fs.readFile("static/script.js", function (error, data) {
			response.writeHead(200, { 'Content-Type': 'application/javascript' });
			response.write(data);
			response.end();
		})
	}
	// -----
	else {
		response.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
		response.write("<h1>404 - brak strony</h1><a href='strona3.html'>ąąą</a>");
		response.end();
	}
})

server.listen(PORT, () => {
	console.log(`serwer startuje na porcie ${PORT}`)
});
