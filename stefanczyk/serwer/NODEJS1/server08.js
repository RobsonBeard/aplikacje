const http = require("http");
const PORT = 3000;
require("colors");

const server = http.createServer((req, res) => {
	res.writeHead(200, { "content-type": "text/html;charset=utf-8" })

	let text = "kolorowe"

	if (req.url.toLowerCase() == "/A".toLowerCase()) {
		res.end(`<h1 style="color:red;">${text}</h1>`)
	}
	else if (req.url.toLowerCase() == "/B".toLowerCase()) {
		res.end(`<h1 style="color:green;">${text}</h1>`)
	}
	else if (req.url.toLowerCase() == "/C".toLowerCase()) {
		res.end(`<h1 style="color:blue;">${text}</h1>`)
	}
	else {
		res.end(`${req.url}`)
	}

})


server.listen(PORT, () => {
	console.log(`serwer startuje na porcie ${PORT}`)
});
