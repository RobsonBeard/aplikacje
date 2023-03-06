const http = require("http");
const PORT = 3000;
require("colors");

const logger = require('tracer').colorConsole();

logger.log('hello');
logger.trace('hello');
logger.debug('hello');
logger.info('hello');
logger.warn('hello');
logger.error('hello');

const server = http.createServer((req, res) => {
	res.writeHead(200, { "content-type": "text/html;charset=utf-8" })

	res.end(`${req.url}`)

})


server.listen(PORT, () => {
	console.log(`serwer startuje na porcie ${PORT}`)
});
