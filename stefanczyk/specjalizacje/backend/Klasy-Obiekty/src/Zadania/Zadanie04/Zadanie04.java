package Zadania.Zadanie04;

import java.math.BigInteger;
import java.util.Scanner;

public class Zadanie04 {
    public static void main(String[] args) {
        System.out.println("Obliczanie silni dla dowolnej liczby całkowitej.");
        Silnia silnia = new Silnia();

//        Scanner sc = new Scanner(System.in);
//        System.out.println("Podaj n:");
//        BigInteger n = new BigInteger(sc.nextLine());
//        silnia.liczSilnie(n);

//        System.out.println(silnia.licznik(BigInteger.valueOf(10)));

        System.out.println(silnia.faktycznaSilnia(BigInteger.valueOf(10)));
//    silnia.liczZwyklaSilnie(10);
    }
}
