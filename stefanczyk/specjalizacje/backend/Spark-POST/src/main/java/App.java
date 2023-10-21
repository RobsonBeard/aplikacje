import com.fasterxml.uuid.Generators;

import java.util.UUID;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import spark.Request;
import spark.Response;

import java.lang.reflect.Type;
import java.sql.Array;
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


        UUID uuid = Generators.randomBasedGenerator().generate();

        post("/add", (req, res) -> {

        res.type("application/json");
        Gson gson = new Gson();
        System.out.println(req.body());

//        MyClass myClass = gson.fromJson(req.body(), MyClass.class); // konwersja danych json na obiekt dowolnej klasy, przykład
//        String model = gson.fromJson(req.body(), MyClass.class).getModel(); // pobranie jednej wartości z body, przy założeniu, że w klasie MyClass jest przykładowy getter getModel()

//        return gson.toJson(dane);
            return gson.toJson("");
        });

//        post("/add", ...)
//        get("/json", ...)
//        post("/update", ...)
//        post("/delete", ...)


    }
}
