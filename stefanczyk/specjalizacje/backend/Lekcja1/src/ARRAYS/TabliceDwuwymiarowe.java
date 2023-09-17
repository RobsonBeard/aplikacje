package ARRAYS;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

public class TabliceDwuwymiarowe {
    public static void main(String[] args) {
        int[][] tablica4 = new int[][]{
                {1, 2},
                {3, 4},
                {5, 6},
                {7, 8}
        };
        System.out.println(Arrays.deepToString(tablica4));


        int suma1 = 0;
        for (int i = 0; i < tablica4.length; i++) {
            for (int j = 0; j < tablica4[i].length; j++) {
                suma1 += tablica4[i][j];
            }
        }
        System.out.println("Suma wszystkich elementów w tablicy: " + suma1);

        int suma2 = 0;
        for (int i = 0; i < tablica4.length; i++) {
            for (int j = 0; j < tablica4[i].length; j++) {
                if (tablica4[i][j] > 3) suma2 += tablica4[i][j];
            }
        }
        System.out.println("Suma wszystkich elementów w tablicy: " + suma2 + "\n");


        int[][] tablica5 = new int[][]{
                {1, 2},
                {3, 3},
                {1, 4},
                {7, 3},
                {1, 6},
                {3, 5},
                {1, 8},
                {7, 9}
        };
        System.out.println(Arrays.deepToString(tablica5));


        int suma3 = 0;
        for (int i = 0; i < tablica5.length; i++) {
            if (tablica5[i][0] == 1) {
                for (int j = 0; j < tablica5[i].length; j++) {
                    suma3 += tablica5[i][j];
                }
            }
        }

        System.out.println("Suma tych elementów tablicy, które mają 1 (jeden) w pierwszym indeksie: " + suma3 + "\n");


        String[][] tablica6 = new String[][]{
                {"100", "222"},
                {"3333", "44"},
                {"555", "6"},
                {"7", "888"}
        };
        System.out.println(Arrays.deepToString(tablica6));

        int suma4 = 0;
        for (int i = 0; i < tablica6.length; i++) {
            for (int j = 0; j < tablica6[i].length; j++) {
                suma4 += Integer.parseInt(tablica6[i][j]);
            }
        }
        System.out.println("Suma wszystkich elementów, traktując je jako liczby całkowite: " + suma4 + "\n");


        String[][] tablica7 = new String[][]{
                {"aaa", "bbb", "ccc"},
                {"ccc", "bbb", "aaa"},
                {"aaa", "bbb", "ccc"},
                {"ddd", "aaa", "aaa"},
                {"aaa", "bbb", "aaa"},
                {"ccc", "bbb", "eee"},
                {"eee", "bbb", "aaa"},
                {"ddd", "bbb", "fff"}
        };
        System.out.println(Arrays.deepToString(tablica7));

        int suma5 = 0;
        for (int i = 0; i < tablica7.length; i++) {
            if (tablica7[i][0].equals("aaa") || tablica7[i][1].equals("aaa")) {
                suma5++;
            }
        }
        System.out.println("Ilość tych elementow, które mają napis \"aaa\" w 1 lub 2 indeksie: " + suma5 + "\n");


        boolean[][] tablica8 = new boolean[][]{
                {true, true, true, false, true, true, true, false},
                {true, true, true, true, true, true, true, true},
                {true, false, false, false, true, true, true, true},
                {false, false, true, true, false, true, false, true}
        };
        System.out.println(Arrays.deepToString(tablica8));

        int suma6 = 0;
        for (int i = 0; i < tablica8.length; i++) {
            if (i == 2 || i == 3) {
                for (int j = 0; j < tablica8[i].length; j++) {
                    if (!tablica8[i][j]) suma6++;
                }
            }
        }
        System.out.println("Ile razy występuje false w 3 i 4 indeksie tablicy: " + suma6 + "\n");


        int[][] tablica9 = new int[][]{
                {0, 1, 0, 1},
                {0, 1, 0, 2},
                {0, 2, 0, 2},
                {0, 1, 0, 2},
                {0, 1, 0, 1},
                {0, 1, 0, 2},
                {0, 2, 0, 2},
                {0, 1, 0, 2}
        };
        System.out.println(Arrays.deepToString(tablica9));

        int suma7 = 0;
        int suma8 = 0;
        int licznikDwojek = 0;
        int licznikJedynek = 0;
        for (int i = 0; i < tablica9.length; i++) {
            for (int j = 0; j < tablica9[i].length; j++) {
                if (tablica9[i][j] == 2) {
                    licznikDwojek++;
                }
                if (tablica9[i][j] == 1) {
                    licznikJedynek++;
                }
            }
            if (licznikDwojek > 0) {
                suma7++;
                licznikDwojek = 0;
            }
            if (licznikJedynek == 0) {
                suma8++;
            } else {
                licznikJedynek = 0;
            }
        }
        System.out.println("W ilu indeksach tablicy występuje 2: " + suma7);
        System.out.println("W ilu indeksach tablicy NIE występuje 1: " + suma8 + "\n");


        int[] tablicaA = {0, 2, 4, 2, 6, 7, 4, 3, 12, 6};
        System.out.println("Tablica A: " + Arrays.toString(tablicaA));
        Arrays.sort(tablicaA);
        System.out.println(Arrays.toString(tablicaA));

        List<Integer> tablicaB = new LinkedList<>();
        for (int i = 0; i < tablicaA.length; i++) {
            if (i < (tablicaA.length - 1) && tablicaA[i] != tablicaA[i + 1]) {
                tablicaB.add(tablicaA[i]);
            }
            if (i == (tablicaA.length - 1)) tablicaB.add(tablicaA[i]);
        }

        System.out.println(tablicaB + "\n");
        System.out.println("Drugi sposób: ");

        int[] tablicaC = {0, 2, 4, 2, 6, 7, 4, 3, 12, 6};
        int licznikPowtorzen = 0;
        System.out.println(Arrays.toString(tablicaC));

        List<Integer> tablicaD = new LinkedList<>();
        for (int i = 0; i < tablicaC.length; i++) {
            for (int j = 0; j < tablicaD.size(); j++) {
                if (tablicaC[i] == tablicaD.get(j)) licznikPowtorzen++;
            }
            if (licznikPowtorzen > 0) {
                licznikPowtorzen = 0;
            } else {
                tablicaD.add(tablicaC[i]);
            }
        }
        System.out.println(tablicaD);

    }
}
