package Zadania.Zadanie03;

public class Zadanie03 {
    public static void main(String[] args) {
        System.out.println("ZADANIE 03 - Circle2 - setters");
        Circle circle1 = new Circle();
        Circle circle2 = new Circle(20.0,"green");

        System.out.println(circle1.toString());
        System.out.println("area = "+circle1.calculateArea());
        System.out.println("circumference = " + circle1.calculateCircumference());
        circle1.setColor("blue");
        System.out.println(circle1.toString());
        System.out.println(circle2.toString());
        System.out.println("area = "+circle2.calculateArea());
        System.out.println("circumference = " + circle2.calculateCircumference());
    }
}
