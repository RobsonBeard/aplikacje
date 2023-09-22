package Zadania;

import java.util.ArrayList;
import java.util.Collections;

public class Zadanie1 {
    public static void main(String[] args) {
        System.out.println("SORTOWANIE");
        ArrayList<String> lista = new ArrayList<>();
        lista.add("Julia");
        lista.add("Agata");
        lista.add("Zenek");
        lista.add("Jarek");
        lista.add("Kasia");
        lista.add("Dominika");
        System.out.println("Elementy nieposortowane.");
        printujListe(lista);
        Collections.sort(lista);
        System.out.println("\nElementy posortowane.");
        printujListe(lista);
    }

    static void printujListe(ArrayList<String> lista) {
        String output = "";
        // uzupełnij zadanie
        for (int i = 0; i < lista.size(); i++) {
            if (i == lista.size() - 1) {
                output += lista.get(i) + ".";
            } else {
                output += lista.get(i) + "-";
            }
        }
        System.out.println(output);
    }
}
