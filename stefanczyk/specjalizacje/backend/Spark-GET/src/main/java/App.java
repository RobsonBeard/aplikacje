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


        get("/add", (req, res) -> {
            String model = req.queryParams("model");
            int doors = Integer.parseInt(req.queryParams("doors"));
            String country = req.queryParams("country");
            boolean damaged = !(req.queryParams("damaged") == null);

            System.out.println(model + " " + doors + " " + country + " " + damaged);

            Car car = new Car(carID, model, doors, country, damaged);
            carID++;
            carsList.add(car);

            String responseText = "";
            responseText += "<h1>";
            responseText += "car added to list, size = " + carsList.size();
            responseText += "</h1>";

            res.type("text/html");
            return responseText;
        });

        get("/text", (req, res) -> {

            res.type("text/plain");
            return carsList;
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

        get("/html",(req,res)->{
            String responseHtml ="";
            responseHtml+= "<style>table{border: 1px solid black}td{border: 1px solid black}</style>";
            responseHtml+="<table>";
            for (int i = 0; i < carsList.size(); i++) {
                responseHtml+="<tr>";
                responseHtml+="<td>";
                responseHtml+= carsList.get(i).id;
                responseHtml+="</td>";
                responseHtml+="<td>";
                responseHtml+= carsList.get(i).model;
                responseHtml+="</td>";
                responseHtml+="<td>";
                responseHtml+= carsList.get(i).damaged;
                responseHtml+="</td>";
                responseHtml+="<td>";
                responseHtml+= carsList.get(i).doors;
                responseHtml+="</td>";
                responseHtml+="<td>";
                responseHtml+= carsList.get(i).country;
                responseHtml+="</td>";
                responseHtml+="</tr>";
            }
            responseHtml+="</table>";

            res.type("text/html");
            return responseHtml;
        });

        get("/delete/:id", (req, res) -> {

            String responseText = "";
            responseText += "<h1>";

            boolean found = false;
            for (int i = 0; i < carsList.size(); i++) {
                if(carsList.get(i).id == Integer.parseInt(req.params("id"))){
                    found=true;
                    carsList.remove(i);
                }
            }
            if(found){
                responseText += "deleted: " + req.params("id");
            } else{
                responseText += "did not found given id";
            }
            responseText += "</h1>";

            res.type("text/html");
            return responseText;
        });
    }
}
