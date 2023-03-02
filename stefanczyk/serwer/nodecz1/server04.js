const http = require("http");
const PORT = 3000;
const server = http.createServer((req, res) => {
	console.log("user agent:");
	console.log(req.headers["user-agent"])
	res.writeHead(200, { "content-type": "text/html;charset=utf-8" })
	let czyChrome = req.headers["user-agent"].indexOf("Chrome")
	let czyFirefox = req.headers["user-agent"].indexOf("Firefox")
	let czyEdge = req.headers["user-agent"].indexOf("Edg")
	if (czyChrome != -1) {
		if (czyEdge != -1) {
			res.end(`<h1>Twoja przeglądarka to Edge</h1>`)
		}
		else {
			res.end(`<h1>Twoja przeglądarka to Chrome</h1>`)
		}
	}
	else if (czyFirefox != -1) {
		res.end(`<h1>Twoja przeglądarka to Firefox</h1>`)
	}
	else {
		res.end(`<h1>Masz inną przeglądarkę</h1>`)
	}

})

server.listen(PORT, () => {
	console.log(`serwer startuje na porcie ${PORT}`)
});