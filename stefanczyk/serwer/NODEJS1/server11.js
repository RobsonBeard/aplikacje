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

	if (request.url == "/index.html") {

		fs.readFile("static/index.html", function (error, data) {
			response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
			response.write(data);
			response.end();
		})
	}

	else if (request.url == "/second") {

		fs.readFile("static/second", function (error, data) {
			response.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' }); // tutaj nie moge przekierowac do indexa, jesli to text/plain
			response.write(data);
			response.end();
		})
	} // tutaj musi byc rozszerzenie!!!!!!

	else if (request.url == "/second.html") {

		fs.readFile("static/second.html", function (error, data) {
			response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
			response.write(data);
			response.end();
		})
	}

	else {
		response.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
		response.write("<h1>404 - brak takiej strony</h1>");
		response.end();

	}

})

server.listen(PORT, () => {
	console.log(`serwer startuje na porcie ${PORT}`)
});
