package Zadania;

import java.util.ArrayList;
import java.util.Scanner;

public class Zadanie7 {
    public static void main(String[] args) {
        System.out.println("Program rysuje trójkąt pascala dla podanej liczby (1-10).");
        System.out.println("Podaj liczbę:");
        Scanner sc = new Scanner(System.in);
        int input = sc.nextInt();

        pascalsTriangle(input);
    }

    static void pascalsTriangle(int size) {
        ArrayList<ArrayList<Integer>> valuesList = takeAllValuesIntoList(size);

        for (int i = 1; i <= size; i++) {
            String line = "";
            for (int j = 1; j <= (size - i); j++) {
                line += "\t";
            }

            line += valuesList.get(0).get(0);
            // tu taki if, bo pierwszy rząd to ma być sama 1
            if (i != 1) {
                for (int j = 1; j <= (i - 1) * 2; j++) {
                    line += "\t";
                    if (j % 2 == 0) {
                        line += valuesList.get(i - 1).get(j / 2);
                    }
                }
            } // kazda "parzysta" pozycja ma nie zawierac 1, tylko ze fora zaczynam od tabulacji

            for (int j = 1; j <= (size - i); j++) {
                line += "\t";
            }
            System.out.println(line);
        }
    }

    static int factorial(int n) {
        if (n <= 2) {
            return n;
        }
        return n * factorial(n - 1);
    }

    static int newton(int n, int k) {
        if (k == 0 || k == n) return 1;
        return factorial(n) / (factorial(k) * factorial(n - k));
    }

    static ArrayList<ArrayList<Integer>> takeAllValuesIntoList(int size) {
        ArrayList<ArrayList<Integer>> mainList = new ArrayList<>();

        for (int i = 1; i <= size; i++) {
            ArrayList<Integer> subList = new ArrayList<>();
            for (int j = 1; j <= i; j++) {
                subList.add(newton(i - 1, j - 1));
            }
            mainList.add(subList);
        }

        return mainList;
    }
}
