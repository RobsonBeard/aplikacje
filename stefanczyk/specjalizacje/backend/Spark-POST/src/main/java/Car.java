import java.util.ArrayList;
import java.util.UUID;

public class Car {
    int id;
    UUID uuid;
    String model;
    int year;
    ArrayList<Airbag> airbags;
    String color;

    public Car(int id, UUID uuid, String model, int year, ArrayList<Airbag> airbags, String color) {
        this.id = id;
        this.uuid = uuid;
        this.model = model;
        this.year = year;
        this.airbags = airbags;
        this.color = color;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + this.id +
                ", uuid=" + this.uuid +
                ", model=\"" + this.model +
                "\", year=" + this.year +
                ", airbags=" + this.airbags +
                ", color=\"" + this.color +
                "\"}";
    }
}
