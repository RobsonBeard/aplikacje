package IF;

import java.util.Scanner;

public class Rownanie {
    public static void main(String[] args) {
        System.out.println("Program oblicza x w równaniu o postaci ax+b = c, gdzie a,b,c to liczby rzeczywiste a x to niewiadoma.");
        System.out.println("Podaj liczbę a.");
        Scanner sc = new Scanner(System.in);
        try {
            double a = Double.parseDouble(sc.nextLine());
            System.out.println("Podaj liczbę b.");
            double b = Double.parseDouble(sc.nextLine());
            System.out.println("Podaj liczbę c.");
            double c = Double.parseDouble(sc.nextLine());

            System.out.println("Liczby: \na = " + a + "\nb = " + b + "\nc = " + c);

            if (a != 0) {
                double wynik = (c - b) / a;
//                System.out.println("Wynikiem równania jest " + wynik);
                System.out.printf("Wynikiem równania jest %2.2f", wynik);
            } else if (b == c) {
                System.out.println("Równanie ma nieskończenie wiele rozwiązań");
            } else {
                System.out.println("Równanie nie ma rozwiązań");
            }


        } catch (Exception e) {
            System.out.println(e);
//            System.out.println("Nie wczytano liczby lub błędny format. Koniec programu.");
        }
    }
}
