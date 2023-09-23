package Zadania;

import java.util.*;

public class Zadanie5 {
    public static void main(String[] args) {
        System.out.println("DIAMENT");
        System.out.println("Podaj literę A-Z:");
        Scanner sc = new Scanner(System.in);
        char input = sc.nextLine().toUpperCase().toCharArray()[0];
        printDiament(input);
    }

    static void printDiament(char znak) {
        Map<Character, Integer> mapaAlfabetu = new HashMap<>();
        Map<Integer, Character> mapaLiczb = new HashMap<>();
        char pierwszaLitera = 'A';
        for (int i = 1; i <= 26; i++) {
            mapaAlfabetu.put(pierwszaLitera, i);
            mapaLiczb.put(i, pierwszaLitera);
            pierwszaLitera++;
        }
//        System.out.println(mapaAlfabetu);
//        System.out.println(mapaLiczb);
        int ktoraLitera = mapaAlfabetu.get(znak);
        int szerokosc = najwiekszaIloscKropek(ktoraLitera);

        for (int i = ktoraLitera - 1; i >= 0; i--) {
            String linijka = "";
            for (int j = 0; j < i; j++) {
                linijka += "·";
            }

            if (i == ktoraLitera - 1) {
                linijka += 'A';
            } else if (i == ktoraLitera - 2) {
                linijka += "B·B";
            } else {
                linijka += mapaLiczb.get(ktoraLitera - i);
                for (int j = 0; j < (szerokosc - i * 2); j++) {
                    linijka += "·";
                }
                linijka += mapaLiczb.get(ktoraLitera - i);
            }

            for (int j = 0; j < i; j++) {
                linijka += "·";
            }
            System.out.println(linijka);
        }

        for (int i = 1; i < ktoraLitera; i++) {
            String linijka = "";
            for (int j = 0; j < i; j++) {
                linijka += "·";
            }

            if (i == ktoraLitera - 1) {
                linijka += 'A';
            } else if (i == ktoraLitera - 2) {
                linijka += "B·B";
            } else {
                linijka += mapaLiczb.get(ktoraLitera - i);
                for (int j = 0; j < (szerokosc - i * 2); j++) {
                    linijka += "·";
                }
                linijka += mapaLiczb.get(ktoraLitera - i);
            }

            for (int j = 0; j < i; j++) {
                linijka += "·";
            }
            System.out.println(linijka);
        }

    }

    static Integer najwiekszaIloscKropek(int wartoscLiczbowaLitery) {
//            a1 = 0
//            a2 = 1
//            a3 = 3
//            dla n>3
//            an = a(n-1)+2
        if (wartoscLiczbowaLitery == 1) {
            return 0;
        } else if (wartoscLiczbowaLitery == 2) {
            return 1;
        } else if (wartoscLiczbowaLitery == 3) {
            return 3;
        } else {
            return (najwiekszaIloscKropek(wartoscLiczbowaLitery - 1) + 2);
        }
    }

    // 0,1,3,5,7,9,7,5,3,1,0
    // i==3 => 3 kropki
    // i==2 => 5 kropek
    // i==1 => 7 kropek
    // i==0 => 9 kropek // litera f(6) => 9 - i * 2

    // 0,1,3,5,7,9,11,13,11 itd.
//            i==5 => 3 kropki
//            i==4 => 5 kropek
//            i==3 => 7 kropek
//            i==2 => 9 kropek
//            i==1 => 11 kropek
//            i==0 => 13 kropek // litera h(8) => 13 - i * 2

//            A - max 0     1
//            B - max 1     2
//            C - max 3     3   // 0
//            D - max 5     4   // +1
//            E - max 7     5   // +2
//            F - max 9     6   // +3
//            G - max 11    7   // +4
//            H - max 13    8   // +5
//            I - max 15    9   // +6
}
