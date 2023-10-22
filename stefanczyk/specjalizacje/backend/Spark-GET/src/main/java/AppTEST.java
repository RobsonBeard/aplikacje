import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import spark.Request;
import spark.Response;

import java.lang.reflect.Type;
import java.util.ArrayList;

import static spark.Spark.*;

public class AppTEST {
    public static void main(String[] args) {
        staticFiles.location("/public");
        String projectDir = System.getProperty("user.dir");
        String staticDir = "/src/main/resources/public";
        staticFiles.externalLocation(projectDir + staticDir);

        port(4000);

        get("/test", (req, res) -> testFunction(req, res));


//        http://localhost:4000/info/foo;key1=value1?key2=value2&x=123123#key3=value3
        get("/info/:paramstaki", (req, res) -> {
            System.out.println("-------------");
            System.out.println(res.status());
            System.out.println(req.requestMethod());
            System.out.println(req.attributes());
            System.out.println(req.cookies());
            System.out.println(req.params()); // potrzebne dziś
            System.out.println(req.uri());
            System.out.println(req.url());
            System.out.println(req.queryParams()); // potrzebne dziś
            System.out.println(req.queryParams("x")); // potrzebne dziś
            System.out.println(req.pathInfo());
            System.out.println(req.contentLength());
            System.out.println(req.contentType());
            System.out.println(req.protocol());
            System.out.println(req.headers());
            return "aaa";
        });

        get("/gson", (req, res) -> {
            Gson gson = new Gson();

            ArrayList<String> lista = new ArrayList<>() {{
                add("1");
                add("abc");
                add("def");
            }};

//            return gson.toJson(lista, ArrayList.class);

//            problemy z typami danych w Gson - informowanie gsona o typie danych

            Type listType = new TypeToken<ArrayList<String>>() {
            }.getType();

            res.type("application/json");
            return gson.toJson(lista, listType);
        });

    }

    static String testFunction(Request req, Response res) {
        String test = "response from server";
        res.type("application/json");
        return test;
    }
}
