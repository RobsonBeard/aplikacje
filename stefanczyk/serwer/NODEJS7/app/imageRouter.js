//* endpointy aplikacji get/post/patch/delete
//* router tylko do api imagów 

const logger = require('tracer').colorConsole();

const fileController = require("./fileController")
const jsonController = require("./jsonController")

const utils = require("./utils");

utils.removeAllFiles()

const imageRouter = async (req, res) => {

    // get jsona wszystkich zdjęć
    if (req.url == "/api/photos" && req.method == "GET") {
        let statusCode = 200
        let returnedObj

        let getallResponse = await jsonController.getall()

        if (getallResponse.success) {
            returnedObj = {
                status: statusCode,
                message: getallResponse.message,
                files: getallResponse.result
            }
        }
        else {
            statusCode = 404
            returnedObj = {
                status: statusCode,
                message: getallResponse.message
            }
        }

        res.writeHead(statusCode, { "Content-type": "application/json;charset=utf-8" });
        res.end(JSON.stringify(returnedObj, null, 5));
    }

    // get jsona jednego zdjęcia
    else if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "GET") {
        let statusCode = 200
        let returnedObj

        let fileID = req.url.split('/')
        fileID = parseInt(fileID[fileID.length - 1])

        let getoneResponse = await jsonController.getone(fileID)

        if (getoneResponse.success) {
            returnedObj = {
                status: statusCode,
                message: getoneResponse.message,
                file: getoneResponse.result
            }
        }
        else {
            statusCode = 404
            returnedObj = {
                status: statusCode,
                message: getoneResponse.message
            }
        }

        res.writeHead(statusCode, { "Content-type": "application/json;charset=utf-8" });
        res.end(JSON.stringify(returnedObj, null, 5));
    }

    // post image i nazwy albumu
    else if (req.url == "/api/photos" && req.method == "POST") {
        let statusCode = 201
        let returnedObj

        let addResponse = await fileController.add(req)

        if (addResponse.success) {
            returnedObj = {
                status: statusCode,
                message: addResponse.message,
                file: addResponse.file
            }
        }
        else {
            statusCode = 400
            returnedObj = {
                status: statusCode,
                message: "nieoczekiwany błąd"
            }
        }

        res.writeHead(statusCode, { "Content-type": "application/json;charset=utf-8" });
        res.end(JSON.stringify(returnedObj, null, 5));
    }

    // delete image i jsona
    else if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "DELETE") {
        let statusCode = 202
        let returnedObj

        let taskID = req.url.split('/')
        taskID = parseFloat(taskID[taskID.length - 1])

        let deleteResponse = await fileController.delete(taskID)

        if (deleteResponse.success) {
            returnedObj = {
                status: statusCode,
                message: deleteResponse.message
            }
        }
        else {
            statusCode = 404
            returnedObj = {
                status: statusCode,
                message: deleteResponse.message
            }
        }

        res.writeHead(statusCode, { "Content-type": "application/json;charset=utf-8" });
        res.end(JSON.stringify(returnedObj, null, 5));
    }

    // patch jsona - aktualizacja historii zdjęcia
    else if (req.url == "/api/photos" && req.method == "PATCH") {
        let statusCode = 200
        let returnedObj

        let data = await utils.getRequestData(req);
        let parsedData = JSON.parse(data)

        let updateResponse = await jsonController.update(parsedData)

        if (updateResponse.success) {
            returnedObj = {
                status: statusCode,
                message: updateResponse.message,
                file: updateResponse.result
            }
        }
        else {
            statusCode = 404
            returnedObj = {
                status: statusCode,
                message: updateResponse.message
            }
        }

        res.writeHead(statusCode, { "Content-type": "application/json;charset=utf-8" });
        res.end(JSON.stringify(returnedObj, null, 5));
    }
}

module.exports = imageRouter