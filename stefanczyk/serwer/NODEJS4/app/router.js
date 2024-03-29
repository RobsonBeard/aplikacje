//* endpointy aplikacji get/post

const path = require("path");
const mime = require('mime-types');
const fs = require("fs");

const controller = require("./controller")
const utils = require("./utils")

const router = async (req, res) => {

    switch (req.method) {
        case "GET":
            let mimeName = ''

            if (req.url === "/") {
                req.url = "/index.html"
            }

            let filepath = path.join(__dirname, "views", req.url)
            filepath = decodeURIComponent(filepath)

            if (fs.existsSync(filepath)) {
                mimeName = mime.lookup(filepath)
                fs.readFile(filepath, function (error, data) {
                    res.writeHead(200, { 'Content-Type': `${mimeName};charset=utf-8` });
                    res.write(data);
                    res.end();
                })
            }
            else {
                res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' });
                res.write("<h1>404 - brak strony</h1>");
                res.end();
            }
            break;

        case "POST":

            if (req.url == "/add") {
                let data = await utils.getRequestData(req);
                let parsedData = JSON.parse(data)
                controller.add(parsedData.animal, parsedData.color)

                res.writeHead(200, { "Content-type": "application/json;charset=utf-8" });
                res.end(JSON.stringify(controller.getall(), null, 5));
            }
            else if (req.url == "/getall") {
                res.writeHead(200, { "Content-type": "application/json;charset=utf-8" });
                res.end(JSON.stringify(controller.getall(), null, 5));
            }
            else if (req.url == "/delete") {
                let data = await utils.getRequestData(req);
                let parsedData = JSON.parse(data)
                controller.delete(parsedData.id)

                res.writeHead(200, { "Content-type": "application/json;charset=utf-8" });
                res.end(JSON.stringify(controller.getall(), null, 5));
            }
            else if (req.url == "/update") {
                let data = await utils.getRequestData(req);
                let parsedData = JSON.parse(data)
                controller.update(parsedData.id)

                res.writeHead(200, { "Content-type": "application/json;charset=utf-8" });
                res.end(JSON.stringify(controller.getall(), null, 5));
            }

            break;

    }
}

module.exports = router
