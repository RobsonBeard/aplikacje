import com.fasterxml.uuid.Generators;

import java.io.FileOutputStream;
import java.util.UUID;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;

import java.lang.reflect.Type;
import java.util.ArrayList;

import static spark.Spark.*;

public class App {

    static ArrayList<Car> carsList = new ArrayList<>();
    static int carID = 0;

    static String[] defaultModels = {"Fiat", "BMW", "Audi", "Mercedes", "KIA"};

    static int getRandomInteger(int min, int max) {
        return (int) (Math.floor(Math.random() * (max - min + 1)) + min);
    }

    public static void main(String[] args) {
        staticFiles.location("/public");
        String projectDir = System.getProperty("user.dir");
        String staticDir = "/src/main/resources/public";
        staticFiles.externalLocation(projectDir + staticDir);

        port(4000);

        post("/add", (req, res) -> {

            Gson gson = new Gson();

            Car car = gson.fromJson(req.body(), Car.class);
            car.setId(carID);
            carID++;
            UUID uuid = Generators.randomBasedGenerator().generate();
            car.setUuid(uuid);

            carsList.add(car);

//        MyClass myClass = gson.fromJson(req.body(), MyClass.class); // konwersja danych json na obiekt dowolnej klasy, przykład
//        String model = gson.fromJson(req.body(), MyClass.class).getModel(); // pobranie jednej wartości z body, przy założeniu, że w klasie MyClass jest przykładowy getter getModel()

            res.type("application/json");
            return gson.toJson(car);
        });

        get("/json", (req, res) -> {
            Gson gson = new GsonBuilder()
                    .setPrettyPrinting()
                    .create();

            Type listType = new TypeToken<ArrayList<Car>>() {
            }.getType();

            res.type("application/json");
            return gson.toJson(carsList, listType);
        });


        post("/delete", (req, res) -> {

            for (int i = 0; i < carsList.size(); i++) {
                if (carsList.get(i).id == Integer.parseInt(req.body())) {
                    carsList.remove(i);
                }
            } // moze przerobic to na metode find()? jesli jest w javie

            res.type("text/plain");
            return "successfully deleted";
        });


        post("/update", (req, res) -> {
            Gson gson = new Gson();

            String model = gson.fromJson(req.body(), Car.class).getModel();
            int year = gson.fromJson(req.body(), Car.class).getYear();
            int id = gson.fromJson(req.body(), Car.class).getId();
            System.out.println(model + " " + year + " " + id);

            for (int i = 0; i < carsList.size(); i++) {
                if (carsList.get(i).id == id) {
                    carsList.get(i).setYear(year);
                    carsList.get(i).setModel(model);
                }
            } // moze przerobic to na metode find()? jesli jest w javie

            return "successfully updated";
        });

        post("/generate", (req, res) -> {
            for (int i = 0; i < 10; i++) {
                UUID uuid = Generators.randomBasedGenerator().generate();

                String model = defaultModels[getRandomInteger(0, defaultModels.length - 1)];

                int year = getRandomInteger(2000, 2020);

                ArrayList<Airbag> airbags = new ArrayList<>();
                airbags.add(new Airbag("driver", getRandomInteger(0, 1) == 1));
                airbags.add(new Airbag("passenger", getRandomInteger(0, 1) == 1));
                airbags.add(new Airbag("back", getRandomInteger(0, 1) == 1));
                airbags.add(new Airbag("side", getRandomInteger(0, 1) == 1));

                String color = "rgb(" + getRandomInteger(0, 255) + "," + getRandomInteger(0, 255) + "," + getRandomInteger(0, 255) + ")";
                // jeszcze zdjecie
                Car car = new Car(carID, uuid, model, year, airbags, color);
                carsList.add(car);

                carID++;
            }
            return "successfully generated";
        });


        post("/invoice", (req, res) -> {
            Gson gson = new Gson();


            int id = Integer.parseInt(req.body());

            Car wantedCar = carsList.get(id);
            System.out.println(wantedCar);

            //TODO: zmodyfikowac pole invoiceGenerated w klasie Car, moze dopiero generowac link do pobrania po response ze strony serwera? czy przy await w js jest to bez znaczenia

            Document document = new Document(); // dokument pdf
            String path = System.getProperty("user.dir") + "/src/main/resources/pdfs/plik" + id + ".pdf"; // lokalizacja zapisu
            //TODO: lub nazwe dawac z UUID

            PdfWriter.getInstance(document, new FileOutputStream(path));

            document.open();
            Font font = FontFactory.getFont(FontFactory.COURIER, 16, BaseColor.BLACK);
            Chunk chunk = new Chunk("tekst", font); // akapit

            document.add(chunk);
            document.close();

            //        Paragraph p = new Paragraph("paragraf", font);
//        document.add(p);

//        Image img = Image.getInstance("path_to_image.jpg");
//        document.add(img);

            return "successfully generated";
        });


//        res.type("application/octet-stream"); //
//        res.header("Content-Disposition", "attachment; filename=plik.pdf"); // nagłówek
//
//        OutputStream outputStream = res.raw().getOutputStream();
//        outputStream.write(Files.readAllBytes("katalog/plik.pdf")); // response pliku do przeglądarki

//        get("/invoices", (req, res) -> ...); // pobranie faktury

    }


}
