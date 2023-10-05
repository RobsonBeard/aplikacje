package Zadania.Zadanie01;

import java.util.Scanner;

public class Pole {
    private double a;
    private double b;
    private double poleProstokata;

//    public Pole() {
//    } // chyba nawet nie trzeba

    public void read(){
        System.out.println("ZADANIE 01 - Program oblicza pole prostokąta");
        Scanner sc = new Scanner(System.in);

        System.out.println("Podaj pierwszy bok:");
        double a = sc.nextDouble();
        this.a = a;
        System.out.println("Podaj drugi bok:");
        double b = sc.nextDouble();
        this.b=b;
    }
    public void calculate(){
        this.poleProstokata = this.a*this.b;
    }

    public void display() {
        System.out.printf("Pole prostokąta o boku a = %.2f",this.a);
        System.out.printf(" i boku b = %.2f",this.b);
        System.out.printf(" wynosi %.2f", this.poleProstokata);
    }
}
