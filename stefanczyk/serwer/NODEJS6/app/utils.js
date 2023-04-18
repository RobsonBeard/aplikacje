//* funkcje pomocnicze
const logger = require('tracer').colorConsole();
const path = require("path");
const fs = require("fs");

// funkcja parsująca dane z posta
getRequestData = async (req) => {

    return new Promise((resolve, reject) => {
        try {

            let body = "";

            req.on("data", (part) => {
                body += part.toString();
            });

            req.on("end", () => {
                // mamy dane i zwracamy z promisa
                resolve(body);
            });

        } catch (error) {
            reject(error);
        }
    })

}

// funkcja usuwająca pliki przy starcie serwera
removeAllFiles = () => {
    const filepath = path.join(__dirname, "files")
    fs.readdir(filepath, (err, files) => {
        if (err) throw err
        // console.log(files);

        for (let i = 0; i < files.length; i++) {
            fs.unlink(path.join(filepath, files[i]), (err) => {
                if (err) throw err
            })
        }

        logger.info("usunięto pliki");
    })
}

module.exports = { getRequestData, removeAllFiles }
