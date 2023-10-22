import com.fasterxml.uuid.Generators;

import java.util.UUID;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;

import static spark.Spark.*;

public class App {

    static ArrayList<Car> carsList = new ArrayList<>();
    static int carID = 0;

    public static void main(String[] args) {
        staticFiles.location("/public");
        String projectDir = System.getProperty("user.dir");
        String staticDir = "/src/main/resources/public";
        staticFiles.externalLocation(projectDir + staticDir);

        port(4000);


        post("/add", (req, res) -> {

            res.type("application/json");
            Gson gson = new Gson();

            Car car = gson.fromJson(req.body(), Car.class);
            car.setId(carID);
            carID++;
            UUID uuid = Generators.randomBasedGenerator().generate();
            car.setUuid(uuid);

            carsList.add(car);

//        MyClass myClass = gson.fromJson(req.body(), MyClass.class); // konwersja danych json na obiekt dowolnej klasy, przykład
//        String model = gson.fromJson(req.body(), MyClass.class).getModel(); // pobranie jednej wartości z body, przy założeniu, że w klasie MyClass jest przykładowy getter getModel()

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
//            Gson gson = new Gson();
//            res.type("application/json");
            System.out.println(req.body());

            for (int i = 0; i < carsList.size(); i++) {
                if (carsList.get(i).id == Integer.parseInt(req.body())) {
                    carsList.remove(i);
                }
            }

            res.type("text/plain");
            return "succesfully deleted";
        });


//        post("/update", ...)


    }
}
