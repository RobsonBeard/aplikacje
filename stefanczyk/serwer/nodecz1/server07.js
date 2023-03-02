const http = require("http");
const PORT = 3000;
require("colors");

// console.log("tekst na czerwono".red)
// console.log("tekst na zielono".green)
// console.log("tekst na tęczowo".rainbow)

const server = http.createServer((req, res) => {

	if (req.url == "/A") {
		console.log("kolorowe".red)
	}
	if (req.url == "/B") {
		console.log("kolorowe".green)
	}
	if (req.url == "/C") {
		console.log("kolorowe".blue)
	}

	res.writeHead(200, { "content-type": "text/html;charset=utf-8" })
	res.end(`${req.url}`)
})


server.listen(PORT, () => {
	console.log(`serwer startuje na porcie ${PORT}`)
});
