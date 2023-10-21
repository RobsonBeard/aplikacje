public class Car {
    int id;
    String model;
    boolean damaged;
    int doors;
    String country;

    public Car(int id, String model, int doors, String country, boolean damaged) {
        this.id = id;
        this.model = model;
        this.damaged = damaged;
        this.doors = doors;
        this.country = country;
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + this.id +
                ", model=\"" + this.model +
                "\", damaged=" + this.damaged +
                ", doors=" + this.doors +
                ", country=\"" + this.country +
                "\"}";
    }
}
