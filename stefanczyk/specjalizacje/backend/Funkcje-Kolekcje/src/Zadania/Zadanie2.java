package Zadania;

import java.util.ArrayList;
import java.util.Scanner;

public class Zadanie2 {
    public static void main(String[] args) {
        System.out.println("SUMOWANIE");

        System.out.println("Podaj n:");
        Scanner sc = new Scanner(System.in);
        Integer liczba = Integer.valueOf(sc.nextLine());

        ArrayList<Integer> lista = new ArrayList<>();
        for (int i = 1; i <= liczba; i++) {
            lista.add(i);
        }
        printujListe(lista, liczba);
    }

    static void printujListe(ArrayList<Integer> lista, Integer n) {
        System.out.println("Wszystkie elementy:");
        System.out.println(lista);
        Integer suma = 0;
        for (int i = 0; i < lista.size(); i++) {
            suma += lista.get(i);
        }
        System.out.println("Suma = " + suma);
    }
}
