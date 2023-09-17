package FORWHILE;

public class WypisLiczb {
    public static void main(String[] args) {
        System.out.println("Liczby 1-20");
        String pierwszyWypis = "";
        for (int i = 1; i < 21; i++) {
            if (i != 20) {
                pierwszyWypis += i + ", ";
            } else {
                pierwszyWypis += i + ".";
            }
        }

        String drugiWypis = "";
        int j = 1;
        while (j < 21) {
            if (j != 20) {
                drugiWypis += j + ", ";
            } else {
                drugiWypis += j + ".";
            }
            j++;
        }

        String trzeciWypis = "";
        int k = 1;
        do {
            if (k != 20) {
                trzeciWypis += k + ", ";
            } else {
                trzeciWypis += k + ".";
            }
            k++;
        } while (k < 21);


//        pierwszyWypis[pierwszyWypis.length - 1] = ".";
        System.out.println(pierwszyWypis);
        System.out.println(drugiWypis);
        System.out.println(trzeciWypis);
    }
}
