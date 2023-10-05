package Zadania.Zadanie02;

public class Circle {
    private double r;
    private String color;

    public Circle() {
        this.r=1;
        System.out.println("Radius = "+this.r+", area = "+calculateArea());
    }
    public Circle(double r){
        this.r = r;
        this.color="red";
        System.out.println("Radius = "+this.r+", area = "+calculateArea()+", color = "+this.color);
    }
    public Circle(double r, String color){
        this.r=r;
        this.color=color;
        System.out.println("Radius = "+this.r+", area = "+calculateArea()+", color = "+this.color);
    }

    public double getR() {
        return r;
    }

    public String getColor() {
        return color;
    }

    public double calculateArea(){
        return this.r * this.r * Math.PI;
    }

}
