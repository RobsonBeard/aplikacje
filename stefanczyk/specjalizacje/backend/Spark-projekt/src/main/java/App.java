import com.fasterxml.uuid.Generators;

import java.io.FileOutputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
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

//            String hexColor = car.getColor().substring(1);
//            int r = Integer.parseInt(kolorHex.substring(0, 2), 16);
//            int g = Integer.parseInt(kolorHex.substring(2, 4), 16);
//            int b = Integer.parseInt(kolorHex.substring(4, 6), 16);
//            color="rgb(63,221,77)
//            color="#000000

//            System.out.println(hexColor); // to zostawiam, jakby mi się chciało bawić z kolorami potem

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
            } // mozna przerobic na filtery/ jakies inne streamy

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
            } // mozna przerobic na filtery/ jakies inne streamy

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
                Car car = new Car(carID, uuid, model, year, airbags, color);
                carsList.add(car);

                carID++;
            }
            return "successfully generated";
        });


        post("/invoice", (req, res) -> {
            int id = Integer.parseInt(req.body());

            Car wantedCar = null;

            for (int i = 0; i < carsList.size(); i++) {
                if (carsList.get(i).id == id) {
                    wantedCar = carsList.get(i);
                }
            }
            System.out.println(wantedCar);

            // zmodyfikowac pole invoiceGenerated w klasie Car, moze dopiero generowac link do pobrania po response ze strony serwera? czy przy await w js jest to bez znaczenia??

            assert wantedCar != null; // nie czaje
            wantedCar.setInvoiceGenerated(true);

            Document document = new Document(); // dokument pdf
            String path = System.getProperty("user.dir") + "/src/main/resources/pdfs/plik" + id + ".pdf"; // lokalizacja zapisu
            // lub nazwe dawac z UUID

            PdfWriter.getInstance(document, new FileOutputStream(path));

            document.open();

            Font bold = FontFactory.getFont(FontFactory.TIMES_BOLD, 10, BaseColor.BLACK);

            Chunk chunk = new Chunk("FAKTURA dla: " + wantedCar.getUuid(), bold); // akapit
            document.add(chunk);

            Font normalBig = FontFactory.getFont(FontFactory.TIMES, 16, BaseColor.BLACK);

            Paragraph p1 = new Paragraph("model: " + wantedCar.getModel(), normalBig);
            document.add(p1);

//            HashMap<String, BaseColor> colorMap = new HashMap<>() {{
//                put("red", BaseColor.RED);
//
//            }};
// przekombinowac chcialem https://pastebin.com/QmX56VS9

            Font red = FontFactory.getFont(FontFactory.TIMES, 10, BaseColor.RED);
            Paragraph p2 = new Paragraph("kolor: " + wantedCar.getColor(), red);
            document.add(p2);

            Font normalSmall = FontFactory.getFont(FontFactory.TIMES, 10, BaseColor.BLACK);
            Paragraph p3 = new Paragraph("rok: " + wantedCar.getYear(), normalSmall);
            document.add(p3);

            for (int i = 0; i < wantedCar.getAirbags().size(); i++) {
                Paragraph p4 = new Paragraph("poduszka: " + wantedCar.getAirbags().get(i).getDescription() + " - " + wantedCar.getAirbags().get(i).isValue(), normalSmall);
                document.add(p4);
            }

            boolean isDefaultModel = false;

            for (int i = 0; i < defaultModels.length; i++) {
                if (defaultModels[i].equals(wantedCar.getModel())) {
                    isDefaultModel = true;
                    break;
                }
            }

            if (isDefaultModel) {
                Image img = Image.getInstance(System.getProperty("user.dir") + "/src/main/resources/images/" + wantedCar.getModel() + ".png");
                img.scalePercent(40);
                document.add(img);
            }

            document.close();

            return "successfully generated";
        });


        get("/invoices", (req, res) -> {
            int id = Integer.parseInt(req.queryParams("id"));
            Path path = Path.of(System.getProperty("user.dir") + "/src/main/resources/pdfs/plik" + id + ".pdf");

            res.type("application/octet-stream");
            res.header("Content-Disposition", "attachment; filename=plik" + id + ".pdf"); // nagłówek

            OutputStream outputStream = res.raw().getOutputStream();
            outputStream.write(Files.readAllBytes(path)); // response pliku do przeglądarki

            return null;
        });
    }
}
