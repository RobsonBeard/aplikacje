package FORWHILE;

public class TabliczkaMnozenia {
    public static void main(String[] args) {
        System.out.println("Program rysuje tabliczkę mnożenia.");
        String output = "";
        for (int i = 1; i < 11; i++) {
            for (int j = 1; j < 11; j++) {
                output += i * j + "\t";
            }
            output += "\n";
        }
        System.out.println(output);
    }
}
