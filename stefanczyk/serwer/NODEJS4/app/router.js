// endpointy aplikacji get/post

// załącz controller, utils , tablicę zwierząt
const router = async (request, response) => {

    switch (request.method) {
        case "GET":
        // strona views/index.html

        case "POST":

            if (request.url == "/add") {
                // odczytaj dane z body
                // użyj funkcji z controllera
                // odpowiedz do klienta
                let data = await getRequestData(request);
                console.log(data);
                controller.add(data)
            }
            else if (request.url == "/getall") {
                //  pobierz dane z tablicy zwierząt i odpowiedz do klienta
            }
            else if (request.url == "/delete") {
                //  usuń dane z tablicy zwierząt i odpowiedz do klienta
            }
            else if (request.url == "/update") {
                //  updatuj danye z tablicy zwierząt i odpowiedz do klienta
            }

            break;

    }
}

module.exports = router
