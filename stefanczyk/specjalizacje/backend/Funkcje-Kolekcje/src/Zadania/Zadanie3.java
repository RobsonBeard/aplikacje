package Zadania;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;

public class Zadanie3 {
    public static void main(String[] args) {
        System.out.println("ODWRACANIE");

        System.out.println("Podaj dowolny ciąg znaków:");
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        String pierwszyNapis = odwrocStringa(input);
        System.out.println("Odwrócone:");
        System.out.println(pierwszyNapis);

        String drugiNapis = odwrocStringa(pierwszyNapis);
        System.out.println("Znów odwrócone:");
        System.out.println(drugiNapis);
    }

    static String odwrocStringa(String napis) {
        ArrayList<String> lista = new ArrayList<>(
                Arrays.asList(
                        napis.split(""))
        );

        ArrayList<String> odwroconaLista = new ArrayList<>();

        String output = "";
        for (int i = lista.size() - 1; i >= 0; i--) {
            odwroconaLista.add(lista.get(i));
            output += lista.get(i);
        }

        return output;
    }
}
