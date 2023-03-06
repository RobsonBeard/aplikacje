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

const server = http.createServer((req, res) => {
	fs.readFile("static/index.html", (error, data) => {
		if (error) {
			res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
			res.write("<h1>błąd 404 - nie ma pliku!<h1>");
			res.end();
		}

		else {
			res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
			res.write(data);
			res.end();
		}
	});
})

server.listen(PORT, () => {
	console.log(`serwer startuje na porcie ${PORT}`)
});
