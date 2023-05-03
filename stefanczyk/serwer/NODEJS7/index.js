const logger = require('tracer').colorConsole();
const http = require('http');
const imageRouter = require("./app/imageRouter")
const tagsRouter = require("./app/tagsRouter")
const PORT = 3000;

http
	.createServer(async (req, res) => {
		// images
		if (req.url.search("/api/photos") != -1) {
			await imageRouter(req, res)
		}

		//tags
		else if (req.url.search("/api/tags") != -1) {
			await tagsRouter(req, res)
		}
	})

	.listen(PORT, () => { logger.warn(`serwer startuje na porcie ${PORT}`) })