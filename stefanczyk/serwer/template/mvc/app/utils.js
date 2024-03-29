//* funkcje pomocnicze

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
module.exports = { getRequestData }
