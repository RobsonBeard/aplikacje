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

// funkcja usuwająca pliki i katalogi przy starcie serwera
removeAllFiles = () => {
    const filepath = path.join(__dirname, "upload")
    fs.readdir(filepath, (err, files) => {
        if (err) throw err
        // console.log(files);

        files.forEach((file) => {
            fs.lstat(path.join(filepath, file), (err, stats) => {
                if (err) throw err
                if (stats.isDirectory()) {
                    fs.readdir(path.join(filepath, file), (err, files2) => {
                        if (err) throw err

                        for (let i = 0; i < files2.length; i++) {
                            fs.unlinkSync(path.join(filepath, file, files2[i]))
                        }
                        fs.rmdirSync(path.join(filepath, file)) //* moga byc z tym problemy
                    })
                }
                else {
                    fs.unlink(path.join(filepath, file), (err) => {
                        if (err) throw err
                    })
                }
            })
        })
        logger.info("usunięto pliki i katalogi");
    })
}

module.exports = { getRequestData, removeAllFiles }