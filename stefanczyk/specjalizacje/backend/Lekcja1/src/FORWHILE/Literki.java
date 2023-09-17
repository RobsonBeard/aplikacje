package FORWHILE;

public class Literki {
    public static void main(String[] args) {
        System.out.println("Program wyświetla duże litery alfabetu od A do Z i od Z do A.");

        char znak = 'A';
        String output = "";
        for (int i = 0; i < 26; i++) {
            if (i != 25) {
                output += znak + ", ";
                znak++;
            } else {
                output += znak + ".";
            }
        }
        System.out.println(output);

        znak = 'Z';
        String backwards = "";
        for (int i = 0; i < 26; i++) {
            if (i != 25) {
                backwards += znak + ", ";
                znak--;
            } else {
                backwards += znak + ".";
            }
        }
        System.out.println(backwards);

    }
}
