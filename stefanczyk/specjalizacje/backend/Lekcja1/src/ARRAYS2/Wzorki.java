package ARRAYS2;

public class Wzorki {
    public static void main(String[] args) {
        int[][] ta = new int[10][10];
        int[][] tb = new int[10][10];

        String outputTA = "";
        String outputTB = "";

        for (int i = 0; i < ta.length; i++) {
            for (int j = 0; j < ta[i].length; j++) {
                ta[i][j] = j;
                outputTA += ta[i][j] + " ";
            }
            outputTA += "\n";
        }

        for (int i = 0; i < tb.length; i++) {
            for (int j = 0; j < tb[i].length; j++) {
                tb[i][j] = ta[j][i];
                outputTB += ta[j][i] + " ";
            }
            outputTB += "\n";
        }

        System.out.println("Wyświetlenie zawartości tablicy a:\n" + outputTA);
        System.out.println("Wyświetlenie zawartości tablicy b po przepisaniu z a:\n" + outputTB);


        int[][] slimak = new int[10][10];
        String outputSlimak = "";
        int licznik = 0;
        int dlugosc = slimak.length;
        int kolumna = -1; // tak musi byc, zeby dobrze dzialalo od poczatku - ustawilo sie na 0
        int rzad = 0;
        int kierunek = 1;

        for (int i = 0; i < slimak.length; i++) {
            for (int j = 0; j < dlugosc; j++) {
                kolumna += kierunek;
                slimak[rzad][kolumna] = licznik;
                licznik++;
            }
            dlugosc--; // to wynika z tego jak slimak zmniejsza swoja dlugosc - 10,9,9,8,8,7,7 itd.
            for (int j = 0; j < dlugosc; j++) {
                rzad += kierunek;
                slimak[rzad][kolumna] = licznik;
                licznik++;
            }
            kierunek *= -1;
        }

        for (int i = 0; i < slimak.length; i++) {
            for (int j = 0; j < slimak[i].length; j++) {
                outputSlimak += slimak[i][j] + "\t";
            }
            outputSlimak += "\n";
        }
        System.out.println("ŚLIMAK:\n" + outputSlimak);
    }
}
