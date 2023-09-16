package FORWHILE;

import java.util.Scanner;

public class SumowanieZInputem {
    public static void main(String[] args) {
        System.out.println("Program sumuje liczby całkowite od 1 do liczby podanej przez użytkownika.");
        System.out.println("Wpisz liczbę.");
        Scanner sc = new Scanner(System.in);
        try {
            int podanaLiczba = Integer.parseInt(sc.nextLine());

            int wynikFor = 0;
            for (int i = 1; i < podanaLiczba + 1; i++) {
                wynikFor += i;
            }

            int wynikWhile = 0;
            int k = 1;
            while (k < podanaLiczba + 1) {
                wynikWhile += k;
                k++;
            }

            int wynikDoWhile = 0;
            int j = 1;
            do {
                wynikDoWhile += j;
                j++;
            } while (j < podanaLiczba + 1);

            System.out.println("(for) - Suma liczb całkowitych od 1 do " + podanaLiczba + " wynosi " + wynikFor + ".");
            System.out.println("(while) - Suma liczb całkowitych od 1 do " + podanaLiczba + " wynosi " + wynikWhile + ".");
            System.out.println("(do while) - Suma liczb całkowitych od 1 do " + podanaLiczba + " wynosi " + wynikDoWhile + ".");
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
