public class Airbag {
    String description;
    boolean value;


    @Override
    public String toString() {
        return "{" +
                "description=\"" + this.description +
                "\", value=" + this.value +
                "}";
    }
}
