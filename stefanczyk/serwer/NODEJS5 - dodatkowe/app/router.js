//* endpointy aplikacji get/post

const path = require("path");
const fs = require("fs");
const logger = require('tracer').colorConsole();

const controller = require("./controller")
const utils = require("./utils");
const dirpath = path.join(__dirname, "files")
// console.log(dirpath);

utils.removeAllFiles()

const router = async (req, res) => {

    // pobranie wszystkich tasków
    if (req.url == "/api/tasks" && req.method == "GET") {
        let statusCode = 200

        let getallResponse = await controller.getall(dirpath)

        if (getallResponse.success) {
            returnedObj = {
                status: statusCode,
                message: getallResponse.message,
                files: getallResponse.result
            }
            res.writeHead(statusCode, { "Content-type": "application/json;charset=utf-8" });
            res.end(JSON.stringify(returnedObj, null, 5));
        }
        else {
            statusCode = 404
            returnedObj = {
                status: statusCode,
                message: getallResponse.message
            }
            res.writeHead(statusCode, { "Content-type": "application/json;charset=utf-8" });
            res.end(JSON.stringify(returnedObj, null, 5));
        }
    }

    // pobranie jednego taska wg id
    else if (req.url.match(/\/api\/tasks\/([0-9]+)/) && req.method == "GET") {
        let statusCode = 200

        let taskID = req.url.split('/')
        taskID = parseFloat(taskID[taskID.length - 1])

        let getoneResponse = await controller.getone(taskID, dirpath)

        if (getoneResponse.success) {
            returnedObj = {
                status: statusCode,
                message: getoneResponse.message,
                file: getoneResponse.result
            }
            res.writeHead(statusCode, { "Content-type": "application/json;charset=utf-8" });
            res.end(JSON.stringify(returnedObj, null, 5));
        }
        else {
            statusCode = 404
            returnedObj = {
                status: statusCode,
                message: getoneResponse.message
            }
            res.writeHead(statusCode, { "Content-type": "application/json;charset=utf-8" });
            res.end(JSON.stringify(returnedObj, null, 5));
        }
    }

    // utworzenie nowego taska - pliku tekstowego
    else if (req.url == "/api/tasks" && req.method == "POST") {
        let statusCode = 201

        let data = await utils.getRequestData(req);
        let parsedData = JSON.parse(data)

        let addResponse = await controller.add(parsedData, dirpath)

        if (addResponse.success) {
            let returnedObj = {
                status: statusCode,
                message: addResponse.message
            }
            res.writeHead(statusCode, { "Content-type": "application/json;charset=utf-8" });
            res.end(JSON.stringify(returnedObj, null, 5));
        }
        else {
            statusCode = 403
            let returnedObj = {
                status: statusCode,
                message: addResponse.message
            }
            res.writeHead(statusCode, { "Content-type": "application/json;charset=utf-8" });
            res.end(JSON.stringify(returnedObj, null, 5));
        }
    }
    // usunięcie jednego taska wg id
    else if (req.url.match(/\/api\/tasks\/([0-9]+)/) && req.method == "DELETE") {
        let statusCode = 202

        let taskID = req.url.split('/')
        taskID = parseFloat(taskID[taskID.length - 1])

        let deleteResponse = await controller.delete(taskID, dirpath)

        if (deleteResponse.success) {
            let returnedObj = {
                status: statusCode,
                message: deleteResponse.message
            }
            res.writeHead(statusCode, { "Content-type": "application/json;charset=utf-8" });
            res.end(JSON.stringify(returnedObj, null, 5));
        }
        else {
            statusCode = 404
            let returnedObj = {
                status: statusCode,
                message: deleteResponse.message
            }
            res.writeHead(statusCode, { "Content-type": "application/json;charset=utf-8" });
            res.end(JSON.stringify(returnedObj, null, 5));
        }
    }

    // aktualizacja jednego taska wg id
    else if (req.url == "/api/tasks" && req.method == "PATCH") {
        let statusCode = 200

        let data = await utils.getRequestData(req);
        let parsedData = JSON.parse(data)

        let updateResponse = await controller.update(parsedData, dirpath)

        if (updateResponse.success) {
            let returnedObj = {
                status: statusCode,
                message: updateResponse.message
            }
            res.writeHead(statusCode, { "Content-type": "application/json;charset=utf-8" });
            res.end(JSON.stringify(returnedObj, null, 5));
        }
        else {
            statusCode = 404
            let returnedObj = {
                status: statusCode,
                message: updateResponse.message
            }
            res.writeHead(statusCode, { "Content-type": "application/json;charset=utf-8" });
            res.end(JSON.stringify(returnedObj, null, 5));
        }
    }
}

module.exports = router
