package FORWHILE;

import java.util.Scanner;

public class LosowanieIZliczanie {
    static int getRndInteger(int min, int max) {
        return (int) Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static void main(String[] args) {
        System.out.println("Program losuje 5 liczb naturalnych od 0 do podanej, a następnie znajduje najmniejszą i największą oraz oblicza średnią ze wszystkich wylosowanych liczb.");
        System.out.println("Wpisz liczbę.");
        Scanner sc = new Scanner(System.in);
        try {
            int podanaLiczba = Integer.parseInt(sc.nextLine());
            if (podanaLiczba <= 0) throw new Exception("Proszę podać liczbę naturalną większą od 0");

            int losowaLiczba1 = getRndInteger(0, podanaLiczba);
            int losowaLiczba2 = getRndInteger(0, podanaLiczba);
            int losowaLiczba3 = getRndInteger(0, podanaLiczba);
            int losowaLiczba4 = getRndInteger(0, podanaLiczba);
            int losowaLiczba5 = getRndInteger(0, podanaLiczba);

            int[] tablicaLosowych = {losowaLiczba1, losowaLiczba2, losowaLiczba3, losowaLiczba4, losowaLiczba5};
            System.out.println("Wylosowano liczby: " + losowaLiczba1 + ", " + losowaLiczba2 + ", " + losowaLiczba3 + ", " + losowaLiczba4 + ", " + losowaLiczba5);

            int najwieksza = 0;
            int najmniejsza = podanaLiczba;
            int srednia;
            int suma = 0;

            for (int i = 0; i < tablicaLosowych.length; i++) {
                if (tablicaLosowych[i] > najwieksza) {
                    najwieksza = tablicaLosowych[i];
                }
                if (tablicaLosowych[i] < najmniejsza) {
                    najmniejsza = tablicaLosowych[i];
                }
                suma += tablicaLosowych[i];
            }
            srednia = suma / tablicaLosowych.length;

            System.out.println("Największa liczba to: " + najwieksza);
            System.out.println("Najmniejsza liczba to: " + najmniejsza);
            System.out.println("Średnia to: " + srednia);

//            System.out.println(Arrays.toString(tablicaLosowych));
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
