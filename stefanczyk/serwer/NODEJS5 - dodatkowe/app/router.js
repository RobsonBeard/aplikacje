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

    // let taskList = controller.getall()

    // pobranie wszystkich tasków
    if (req.url == "/api/tasks" && req.method == "GET") {
        let statusCode = 200

        res.writeHead(statusCode, { "Content-type": "application/json;charset=utf-8" }); //* tutaj się pisze HTTP status
        res.end(JSON.stringify(taskList, null, 5));
    }

    // pobranie jednego wg id
    else if (req.url.match(/\/api\/tasks\/([0-9]+)/) && req.method == "GET") {
        let statusCode = 200

        let taskID = req.url.split('/')
        taskID = parseFloat(taskID[taskID.length - 1])

        let selectedTask = taskList.filter((elem) => elem.id === taskID)[0]

        let returnedObj

        if (selectedTask !== undefined) {
            returnedObj = {
                status: statusCode,
                task: selectedTask
            }
            res.writeHead(statusCode, { "Content-type": "application/json;charset=utf-8" });
            res.end(JSON.stringify(returnedObj, null, 5));
        }
        else {
            statusCode = 404
            returnedObj = {
                status: statusCode,
                message: `task with id: ${taskID} not found`
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

        controller.add(parsedData, dirpath)

        let returnedObj = {
            status: statusCode,
            message: `file successfully created`
        }

        res.writeHead(statusCode, { "Content-type": "application/json;charset=utf-8" });
        res.end(JSON.stringify(returnedObj, null, 5));
    }

    // usunięcie jednego taska wg id
    else if (req.url.match(/\/api\/tasks\/([0-9]+)/) && req.method == "DELETE") {
        let statusCode = 202

        let taskID = req.url.split('/')
        taskID = parseFloat(taskID[taskID.length - 1])

        let selectedTask = taskList.filter((elem) => elem.id === taskID)[0]

        let returnedObj

        if (selectedTask !== undefined) {
            controller.delete(taskID)
            returnedObj = {
                status: statusCode,
                message: `task with id: ${taskID} deleted successfully`
            }
            res.writeHead(statusCode, { "Content-type": "application/json;charset=utf-8" });
            res.end(JSON.stringify(returnedObj, null, 5));
        }
        else {
            statusCode = 404
            returnedObj = {
                status: statusCode,
                message: `task with id: ${taskID} not found`
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

        // let responseTask = controller.update(parsedData);

        let updateResponse = await controller.update(parsedData, dirpath)
        logger.log(updateResponse)

        // let returnedObj

        res.writeHead(statusCode, { "Content-type": "application/json;charset=utf-8" });
        res.end(JSON.stringify(parsedData, null, 5));

        // if (responseTask !== false) {
        //     returnedObj = {
        //         status: statusCode,
        //         task: responseTask
        //     }
        //     res.writeHead(statusCode, { "Content-type": "application/json;charset=utf-8" });
        //     res.end(JSON.stringify(returnedObj, null, 5));
        // }
        // else {
        //     statusCode = 404
        //     returnedObj = {
        //         status: statusCode,
        //         message: `task with id: ${parsedData.id} not found`
        //     }
        //     res.writeHead(statusCode, { "Content-type": "application/json;charset=utf-8" });
        //     res.end(JSON.stringify(returnedObj, null, 5));
        // }
    }


}

module.exports = router
