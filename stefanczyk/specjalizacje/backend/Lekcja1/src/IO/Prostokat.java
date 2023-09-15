package IO;

import java.util.Scanner;

public class Prostokat {

        public static void main(String[] args) {
            System.out.println("Program oblicza pole prostokąta.");
            System.out.println("Podaj bok a.");
            Scanner sc = new Scanner(System.in);
            try { // pobranie danych, właściwy program
                double a = Double.parseDouble(sc.nextLine());
                System.out.println("Podaj bok b.");
                double b = Double.parseDouble(sc.nextLine());
                double pole = a * b;
                System.out.println("Pole prostokąta o boku a = " + a + " i boku b =  " + b + " wynosi " + pole);

            } catch (NumberFormatException e) {
                 System.out.println ("Nie wczytano liczby lub błędny format. Koniec programu.");
            }
        }
    }


