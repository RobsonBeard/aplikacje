package ARRAYS;

public class SumaElementowTablicy {
    public static void main(String[] args) {
        System.out.println("Program sumuje elementy tablic.");
        int[] tablica1 = {2, 5, 43, 11, 23, 78, 333, 765, 67, 67, 67, 111, 123};
        int suma1 = 0;
        for (int i = 0; i < tablica1.length; i++) {
            suma1 += tablica1[i];
        }
        System.out.println("Suma elementow tablicy1: " + suma1);

        double[] tablica2 = {1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7, 8.8, 9.9};
        double suma2 = 0;
        for (int i = 0; i < tablica2.length; i++) {
            suma2 += tablica2[i];
        }
        System.out.println("Suma elementow tablicy2: " + suma2);

        double suma3 = 0;
        for (int i = 0; i < tablica2.length; i++) {
            if (tablica2[i] > 4.4) {
                suma3 += tablica2[i];
            }
        }
        System.out.println("Suma elementow tablicy2 większych od 4.4: " + suma3);

        double suma4 = 0;
        for (int i = 0; i < tablica2.length; i++) {
            if (i % 2 == 0) {
                suma4 += tablica2[i];
            }
        }
        System.out.println("Suma elementow tablicy2 o indeksach parzystych: " + suma4);
    }
}
