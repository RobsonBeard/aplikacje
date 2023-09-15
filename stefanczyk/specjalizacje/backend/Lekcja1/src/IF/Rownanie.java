package IF;

import java.util.Scanner;

public class Rownanie {
    public static void main(String[] args) {
        System.out.println("Program sprawdza, czy podane długości boków wyrażone w liczbach NATURALNYCH DODATNICH tworzą trójkąt pitagorejski ");
        System.out.println("Podaj bok a.");
        Scanner sc = new Scanner(System.in);
        try {
            int a = Integer.parseInt(sc.nextLine());
            System.out.println("Podaj bok b.");
            int b = Integer.parseInt(sc.nextLine());
            System.out.println("Podaj bok c.");
            int c = Integer.parseInt(sc.nextLine());

            System.out.println("Boki: \na = " + a + "\nb = " + b + "\nc = " + c);

            if (a == b || b == c || a == c) {
                System.out.println("Podane długości nie tworzą trójkąta pitagorejskiego");
            } else if (a > b && a > c) {
                if (Math.pow(a, 2) == (Math.pow(b, 2) + Math.pow(c, 2))) {
                    System.out.println("Podane długości tworzą trójkąt pitagorejski");
                } else {
                    System.out.println("Podane długości nie tworzą trójkąta pitagorejskiego");
                }
            } else if (b > a && b > c) {
                if (Math.pow(b, 2) == (Math.pow(a, 2) + Math.pow(c, 2))) {
                    System.out.println("Podane długości tworzą trójkąt pitagorejski");
                } else {
                    System.out.println("Podane długości nie tworzą trójkąta pitagorejskiego");
                }
            } else {
                if (Math.pow(c, 2) == (Math.pow(b, 2) + Math.pow(a, 2))) {
                    System.out.println("Podane długości tworzą trójkąt pitagorejski");
                } else {
                    System.out.println("Podane długości nie tworzą trójkąta pitagorejskiego");
                }
            }

        } catch (NumberFormatException e) {
            System.out.println("Nie wczytano liczby lub błędny format. Koniec programu.");
        }
    }
}
