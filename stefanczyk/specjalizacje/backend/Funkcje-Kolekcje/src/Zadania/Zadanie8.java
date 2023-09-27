package Zadania;

import java.util.ArrayList;
import java.util.Arrays;

public class Zadanie8 {
    public static void main(String[] args) {
        System.out.println("Program tworzy listę bez duplikatów na podstawie danej listy.");
        ArrayList<Integer> myList = new ArrayList<>(
                Arrays.asList(0, 2, 4, 2, 6, 7, 4, 3, 12, 6)
        );

        System.out.println(myList);
        System.out.println(removeAllDuplicatesFromIntegerList(myList));
    }

    static ArrayList<Integer> removeAllDuplicatesFromIntegerList(ArrayList<Integer> initialList) {
        ArrayList<Integer> outputList = new ArrayList<>();

        int duplicateCounter = 0;
        for (int i = 0; i < initialList.size(); i++) {

            for (int j = 0; j < outputList.size(); j++) {
                if (initialList.get(i) == initialList.get(j)) {
                    duplicateCounter++;
                }
            }
            if (duplicateCounter == 0) {
                outputList.add(initialList.get(i));
            } else {
                duplicateCounter = 0;
            }
        }
        return outputList;
    }

}
