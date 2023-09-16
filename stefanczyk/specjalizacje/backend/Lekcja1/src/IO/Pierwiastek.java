package IO;

public class Pierwiastek {
    public static void main(String[] args) {
        System.out.println("Program wyświetla pierwiastek kwadratowy");
        System.out.println("z liczby pi z dokładnością do dwóch miejsc po przecinku.");
        System.out.printf("Math.sqrt(Pi) = %2.2f", Math.sqrt(Math.PI));
        System.out.println("\nz liczby pi z dokładnością do pieciu miejsc po przecinku.");
        System.out.printf("Math.sqrt(Pi) = %2.5f", Math.sqrt(Math.PI));
    }
}
