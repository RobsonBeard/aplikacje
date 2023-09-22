package Zadania;

import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Zadanie4 {
    public static void main(String[] args) {

        Map<Character, Integer> mapaPunktow = new HashMap<>() {
            {
                put('a', 1);
                put('e', 1);
                put('i', 1);
                put('o', 1);
                put('u', 1);
                put('l', 1);
                put('n', 1);
                put('r', 1);
                put('s', 1);
                put('t', 1);
                put('d', 2);
                put('g', 2);
                put('b', 3);
                put('c', 3);
                put('m', 3);
                put('p', 3);
                put('y', 4);
                put('f', 4);
                put('h', 4);
                put('v', 4);
                put('w', 4);
                put('k', 5);
                put('j', 8);
                put('x', 8);
                put('q', 10);
                put('z', 10);
            }
        };

        System.out.println("SCRABBLE");

        System.out.println("Podaj dowolny ciąg znaków:");
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine().toLowerCase();

        System.out.println("Twój wynik to: " + scoreWord(input, mapaPunktow) + " pkt");
    }

    static int score(char znak, Map<Character, Integer> mapaPunktow) {
        return mapaPunktow.get(znak);
    }

    static int scoreWord(String slowo, Map<Character, Integer> mapaPunktow) {
        int suma = 0;
        char[] podzieloneSlowo = slowo.toCharArray();
        for (int i = 0; i < podzieloneSlowo.length; i++) {
            suma += score(podzieloneSlowo[i], mapaPunktow);
        }
        return suma;
    }

}
