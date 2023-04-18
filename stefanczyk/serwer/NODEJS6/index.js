const logger = require('tracer').colorConsole();
const http = require('http');
const router = require("./app/router")
const PORT = 3000;

http
    .createServer((req, res) => router(req, res))
    .listen(PORT, () => { logger.warn(`serwer startuje na porcie ${PORT}`) })

