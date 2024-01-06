public class Airbag {
    String description;
    boolean value;

    public Airbag(String description, boolean value) {
        this.description = description;
        this.value = value;
    }

    public String getDescription() {
        return description;
    }

    public boolean isValue() {
        return value;
    }

    @Override
    public String toString() {
        return "{" +
                "description=\"" + this.description +
                "\", value=" + this.value +
                "}";
    }
}
