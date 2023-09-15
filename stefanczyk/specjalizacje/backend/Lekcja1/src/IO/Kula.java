package IO;

import java.util.Scanner;

public class Kula {
    public static void main(String[] args) {
        System.out.println("Program oblicza objętość kuli.");
        System.out.println("Podaj promień.");
        Scanner sc = new Scanner(System.in);
        try{
            double radius = Double.parseDouble(sc.nextLine());
            double volume = 4* Math.PI * Math.pow(radius,3) /3;
            System.out.println("Objętość kuli o promieniu r = " + radius + " wynosi " + volume);
        } catch(NumberFormatException e){
            System.out.println ("Nie wczytano liczby lub błędny format. Koniec programu.");
        }
    }
}
