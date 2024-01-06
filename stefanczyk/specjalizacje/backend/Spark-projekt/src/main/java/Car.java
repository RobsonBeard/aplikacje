import java.util.ArrayList;
import java.util.UUID;

public class Car {
    int id;
    UUID uuid;
    String model;
    int year;
    ArrayList<Airbag> airbags;
    String color;

    public void setInvoiceGenerated(boolean invoiceGenerated) {
        this.invoiceGenerated = invoiceGenerated;
    }

    boolean invoiceGenerated;
//    zdjecie??

    public Car(int id, UUID uuid, String model, int year, ArrayList<Airbag> airbags, String color) {
        this.id = id;
        this.uuid = uuid;
        this.model = model;
        this.year = year;
        this.airbags = airbags;
        this.color = color;
        this.invoiceGenerated = false;
    }

    public String getModel() {
        return model;
    }

    public int getId() {
        return id;
    }

    public int getYear() {
        return year;
    }

    public UUID getUuid() {
        return uuid;
    }

    public ArrayList<Airbag> getAirbags() {
        return airbags;
    }

    public String getColor() {
        return color;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setColor(String color) {
        this.color = color;
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
                "\", color=\"" + this.color +
                ", invoiceGenerated=" + this.invoiceGenerated +
                "}";
    }
}
