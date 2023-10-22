package Przyklady;

public class Animal {
    private String name;
    private int color;
    public Animal(String name, int color) {
        this.name=name;
        this.color=color;
    }

    @Override
    public String toString() {
        return this.getClass().getSimpleName() +"{" +
                "name=" + this.name +
                ", color=" + this.color +
                "}";
    }
}
