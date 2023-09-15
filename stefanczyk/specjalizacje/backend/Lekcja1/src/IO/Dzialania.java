package IO;

import java.util.Scanner;

public class Dzialania {
    public static void main(String[] args) {
        System.out.println("Program oblicza sumę, różnicę, iloczyn i iloraz dwóch liczb x i y wprowadzonych z klawiatury.");
        System.out.println("Podaj x.");
        Scanner sc = new Scanner(System.in);
        try{
            double x = Double.parseDouble(sc.nextLine());
            System.out.println("Podaj y.");
            double y = Double.parseDouble(sc.nextLine());
            System.out.println("Dla liczb x = " + x + " i y = " + y);

            double suma = x + y;
            double roznica = x - y;
            double iloczyn = x * y;
            double iloraz = x / y;

            System.out.println("Suma = " + suma);
            System.out.println("Różnica = " + roznica);
            System.out.println("Iloczyn = " + iloczyn);
            System.out.println("Iloraz = " + iloraz);
        } catch (NumberFormatException e){
            System.out.println ("Nie wczytano liczby lub błędny format. Koniec programu.");
        }

    }
}
