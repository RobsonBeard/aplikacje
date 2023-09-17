package IF;

import java.util.Scanner;

public class Zgadywanie {
    public static void main(String[] args) {
        System.out.println("Zgadnij losową liczbę całkowitą z przedziału od 0 do 9.");
        int randomNumber = (int) Math.floor(Math.random() * 10);
//        System.out.println("losowa: " + randomNumber);
        Scanner sc = new Scanner(System.in);
        try {
            int guessedNumber;

            System.out.println("Wpisz liczbę.");
            guessedNumber = Integer.parseInt(sc.nextLine());

            if (randomNumber != guessedNumber) {
                do {
                    System.out.println("Zła liczba! Wpisz nową liczbę.");
                    guessedNumber = Integer.parseInt(sc.nextLine());
                } while (randomNumber != guessedNumber);
            }
            System.out.println("Udało się.");

        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
