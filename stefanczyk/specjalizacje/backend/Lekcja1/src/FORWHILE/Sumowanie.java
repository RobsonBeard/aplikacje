package FORWHILE;

public class Sumowanie {
    public static void main(String[] args) {
        System.out.println("Program sumuje liczby całkowite od 1 do 100.");
        int wynikFor = 0;
        for (int i = 1; i < 101; i++) {
            wynikFor += i;
        }

        int wynikWhile = 0;
        int k = 1;
        while (k < 101) {
            wynikWhile += k;
            k++;
        }

        int wynikDoWhile = 0;
        int j = 1;
        do {
            wynikDoWhile += j;
            j++;
        } while (j < 101);

        System.out.println("(for) - Suma liczb całkowitych od 1 do 100 wynosi " + wynikFor + ".");
        System.out.println("(while) - Suma liczb całkowitych od 1 do 100 wynosi " + wynikWhile + ".");
        System.out.println("(do while) - Suma liczb całkowitych od 1 do 100 wynosi " + wynikDoWhile + ".");
    }
}
