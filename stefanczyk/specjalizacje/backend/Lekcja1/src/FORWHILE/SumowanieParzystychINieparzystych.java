package FORWHILE;

public class SumowanieParzystychINieparzystych {
    public static void main(String[] args) {
        System.out.println("Program sumuje liczby parzyste i nieparzyste od 1 do 100.");
        int wynikParzysty = 0;
        int wynikNieparzysty = 0;
        for (int i = 0; i < 101; i += 2) {
            wynikParzysty += i;
        }
        for (int i = 1; i < 101; i += 2) {
            wynikNieparzysty += i;
        }
        System.out.println("Suma liczb całkowitych parzystych od 1 do 100 wynosi " + wynikParzysty + ".");
        System.out.println("Suma liczb całkowitych nieparzystych od 1 do 100 wynosi " + wynikNieparzysty + ".");
    }
}
