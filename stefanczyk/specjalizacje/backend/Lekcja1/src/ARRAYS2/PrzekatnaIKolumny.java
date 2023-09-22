package ARRAYS2;

public class PrzekatnaIKolumny {
    public static void main(String[] args) {
        int[][] t1 = new int[10][10];
        String output1 = "";
        int licznik1 = 0;

        for (int i = 0; i < t1.length; i++) {
            for (int j = 0; j < t1[i].length; j++) {
                if (i == j) {
                    t1[i][j] = 1;
                    licznik1++;
                } else {
                    t1[i][j] = 0;
                }
                output1 += t1[i][j] + " ";
            }
            output1 += "\n";
        }
        System.out.println("t1\n" + output1);
        System.out.println("Suma wyróżnionych elementów w tablicy wynosi: " + licznik1 + "\n");


        int[][] t2 = new int[10][10];
        String output2 = "";
        int licznik2 = 0;

        for (int i = 0; i < t2.length; i++) {
            for (int j = 0; j < t2[i].length; j++) {
                if (i == j) {
                    t2[i][j] = j;
                    licznik2 += j;
                } else {
                    t2[i][j] = 0;
                }
                output2 += t2[i][j] + " ";
            }
            output2 += "\n";
        }
        System.out.println("t2\n" + output2);
        System.out.println("Suma wyróżnionych elementów w tablicy wynosi: " + licznik2 + "\n");


        int[][] t3 = new int[10][10];
        String output3 = "";
        int licznik3 = 0;

        for (int i = 0; i < t3.length; i++) {
            for (int j = t3[i].length - 1; j >= 0; j--) {
                if (i == j) {
                    t3[i][j] = 1;
                    licznik3++;
                } else {
                    t3[i][j] = 0;
                }
                output3 += t3[i][j] + " ";
            }
            output3 += "\n";
        }
        System.out.println("t3\n" + output3);
        System.out.println("Suma wyróżnionych elementów w tablicy wynosi: " + licznik3 + "\n");


        int[][] t4 = new int[10][10];
        String output4 = "";
        int licznik4 = 0;

        for (int i = 0; i < t4.length; i++) {
            for (int j = t4[i].length - 1; j >= 0; j--) {
                if (i == j) {
                    t4[i][j] = j;
                    licznik4 += j;
                } else {
                    t4[i][j] = 0;
                }
                output4 += t4[i][j] + " ";
            }
            output4 += "\n";
        }
        System.out.println("t4\n" + output4);
        System.out.println("Suma wyróżnionych elementów w tablicy wynosi: " + licznik4 + "\n");

        int[][] t5 = new int[10][10];
        String output5 = "";
        int sumaPierwszejKolumny = 0;
        int sumaDrugiejKolumny = 0;

        for (int i = 0; i < t5.length; i++) {
            for (int j = 0; j < t5[i].length; j++) {
                if (j == 0) {
                    t5[i][j] = i;
                    sumaPierwszejKolumny += i;
                }
                if (j == 1) {
                    t5[i][j] = i * i;
                    sumaDrugiejKolumny += i * i;
                }
                output5 += t5[i][j] + " ";
            }
            output5 += "\n";
        }

        System.out.println("t5\n" + output5);
        System.out.println("Suma liczb znajdujących się w pierwszej kolumnie to: " + sumaPierwszejKolumny);
        System.out.println("Suma liczb znajdujących się w drugiej kolumnie to: " + sumaDrugiejKolumny + "\n");
    }
}
