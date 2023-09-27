package Zadania;

import java.util.ArrayList;
import java.util.Scanner;

public class Zadanie6 {
    public static void main(String[] args) {
        System.out.println("Program sprawdza, jakie znaki alfabetu łacińskiego nie wystąpiły w napisie.");
        System.out.println("Podaj dowolny ciąg znaków:");
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().toLowerCase();
        alphabetCheck(input);
    }

    static void alphabetCheck(String napis) {
        ArrayList<Character> alfabet = new ArrayList<>() {
            {
                add('a');
                add('b');
                add('c');
                add('d');
                add('e');
                add('f');
                add('g');
                add('h');
                add('i');
                add('j');
                add('k');
                add('l');
                add('m');
                add('n');
                add('o');
                add('p');
                add('q');
                add('r');
                add('s');
                add('t');
                add('u');
                add('v');
                add('w');
                add('x');
                add('y');
                add('z');
            }
        };
        char[] tablicaZNapisu = napis.toCharArray();
        String output = "";

        for (int i = 0; i < alfabet.size(); i++) {
            int licznikPowtorzen = 0;
            for (int j = 0; j < tablicaZNapisu.length; j++) {
                if (alfabet.get(i).equals(tablicaZNapisu[j])) licznikPowtorzen++;
            }
            if (licznikPowtorzen == 0) output += alfabet.get(i);
        }


        System.out.println(output);
    }
}
