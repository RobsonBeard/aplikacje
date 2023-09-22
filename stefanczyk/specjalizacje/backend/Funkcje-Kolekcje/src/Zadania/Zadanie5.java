package Zadania;

import java.util.*;

public class Zadanie5 {
    public static void main(String[] args) {
        System.out.println("Podaj literę A-Z:");
        Scanner sc = new Scanner(System.in);
        char input = sc.nextLine().toUpperCase().toCharArray()[0];
        printDiament(input);
    }

    static void printDiament(char znak) {
        Map<Character, Integer> mapaAlfabetu = new HashMap<>();
        char pierwszaLitera = 'A';
        for (int i = 1; i <= 26; i++) {
            mapaAlfabetu.put(pierwszaLitera, i);
            pierwszaLitera++;
        }

        int ktoraLitera = mapaAlfabetu.get(znak);

//        0,1,3,5,3,1,0

        for (int i = ktoraLitera - 1; i >= 0; i--) {
//            System.out.println(i);
            String linijka = "";
            for (int j = 0; j < i; j++) {
                linijka += "·";
            }
            linijka += 'A';
            for (int j = 0; j < i; j++) {
                linijka += "·";
            }
            System.out.println(linijka);
//            for (Map.Entry<Character, Integer> entry : mapaAlfabetu.entrySet()) {
//                if(entry.getValue('A'))
//            }
        }

    }
}
