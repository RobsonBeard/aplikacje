//* router tylko do api tagów

const logger = require('tracer').colorConsole();

const tagsController = require('./tagsController')
const utils = require("./utils");

utils.convertTagsToObjects()

const tagsRouter = async (req, res) => {

    // pobranie wszystkich tagów "surowo"
    if (req.url == "/api/tags/raw" && req.method == "GET") {
        let statusCode = 200
        let returnedObj

        let getallRawResponse = await tagsController.getallRaw()

        if (getallRawResponse.success) {
            returnedObj = {
                status: statusCode,
                message: getallRawResponse.message,
                result: getallRawResponse.result
            }
        }
        else {
            statusCode = 404
            returnedObj = {
                status: statusCode,
                message: getallRawResponse.message
            }
        }

        res.writeHead(statusCode, { "Content-type": "application/json;charset=utf-8" });
        res.end(JSON.stringify(returnedObj, null, 5));
    }

    // pobranie wszystkich tagów w postaci obiektów
    else if (req.url == "/api/tags" && req.method == "GET") {
        let statusCode = 200
        let returnedObj

        let getallResponse = await tagsController.getall()

        if (getallResponse.success) {
            returnedObj = {
                status: statusCode,
                message: getallResponse.message,
                result: getallResponse.result
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

    // pobranie jednego taga wg id
    else if (req.url.match(/\/api\/tags\/([0-9]+)/) && req.method == "GET") {
        let statusCode = 200
        let returnedObj

        let selectedID = req.url.split('/')
        selectedID = parseInt(selectedID[selectedID.length - 1])

        let getoneResponse = await tagsController.getone(selectedID)

        if (getoneResponse.success) {
            returnedObj = {
                status: statusCode,
                message: getoneResponse.message,
                tag: getoneResponse.result
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

    // dodanie nowego taga do listy (można dodać tylko nieistniejący)
    else if (req.url == "/api/tags" && req.method == "POST") {
        let statusCode = 201
        let returnedObj

        let data = await utils.getRequestData(req);
        let parsedData = JSON.parse(data)

        let addResponse = await tagsController.add(parsedData)

        // if (addResponse.success) {
        //     returnedObj = {
        //         status: statusCode,
        //         message: addResponse.message,
        //         newTag: addResponse.result
        //     }
        // }
        // else {
        //     statusCode = 400
        //     returnedObj = {
        //         status: statusCode,
        //         message: "nieoczekiwany błąd"
        //     }
        // }

        // res.writeHead(statusCode, { "Content-type": "application/json;charset=utf-8" });
        // res.end(JSON.stringify(returnedObj, null, 5));
    }
}

module.exports = tagsRouter