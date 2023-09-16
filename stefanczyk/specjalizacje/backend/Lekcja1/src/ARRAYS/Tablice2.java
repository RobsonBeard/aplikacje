package ARRAYS;

public class Tablice2 {
    public static void main(String[] args) {
        String[] tablica3 = {"koty", "psy", "owoce", "grzyby", "samochody", "kanarki"};
        String kwordOutput = "";
        int kwordLicznik = 0;
        int dlugieLicznik = 0;
        String dlugieOutput = "";
        String wiecejNizPiecLiter = "";
        for (int i = 0; i < tablica3.length; i++) {
//            System.out.println(Arrays.toString(tablica3));
//            System.out.println(tablica3[i]);
            char[] arr = tablica3[i].toCharArray();

            if (arr[0] == 'k') {
                kwordOutput += tablica3[i] + " ";
                kwordLicznik++;
            }

            if (tablica3[i].length() > 4) {
                dlugieOutput += tablica3[i] + " ";
                dlugieLicznik++;
            }
            if (tablica3[i].length() > 5) {
                wiecejNizPiecLiter += tablica3[i] + " ";
            }
        }
        System.out.println("słowa na literę k: " + kwordOutput);
        System.out.println("ilość słów na literę k: " + kwordLicznik);
        System.out.println("jest " + dlugieLicznik + " słów dłuższych niż 4 znaki: " + dlugieOutput);
        System.out.println("Słowa, które mają więcej niż 5 liter: " + wiecejNizPiecLiter);
    }
}
