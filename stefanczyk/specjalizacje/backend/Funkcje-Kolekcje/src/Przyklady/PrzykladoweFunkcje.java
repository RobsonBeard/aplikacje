package Przyklady;

import java.util.Arrays;

class PrzykladoweFunkcje {
    public static void main(String[] args) {
        System.out.println(isBigger(4));
        System.out.println(isBigger(110));
        System.out.println(printString());
        System.out.println(rectArea(2, 4));
        makeSomething();
        makeSomething2();


        System.out.println(formatSth("a", "b", "c", "d"));
        System.out.println(Arrays.toString(formatSth2("d", "e", "f")));
    }

    static boolean isBigger(int x) {
        return x > 100;
    }

    static int rectArea(int a, int b) {
        return a * b;
    }

    static String printString() {
        return "any string";
    }

    static void makeSomething() {
        System.out.println("makeSomething");
    }

    static void makeSomething2() {
        System.out.println("makeSomething2");
    }

    static String formatSth(String... args) {
        return Arrays.toString(args);
    }

    static String[] formatSth2(String... args) {
        return args;
    }


}


