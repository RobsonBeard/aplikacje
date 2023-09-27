package Zadania;

import java.util.*;

public class Zadanie9 {
    public static void main(String[] args) {
        System.out.println("Wprowadź literę:");
        Scanner sc = new Scanner(System.in);

        char searchedCharacter = sc.nextLine().toCharArray()[0];
        System.out.println("Wprowadzaj ciągi znaków lub napisz /koniec, aby zakończyć wprowadzanie:");
        ArrayList<String> wordsList = new ArrayList<>();

        do {
            String input = sc.nextLine();
            if (input.equals("/koniec")) break;
            wordsList.add(input);
        } while (true);

//        char searchedCharacter = 'a';
//        ArrayList<String> wordsList = new ArrayList<>() {{
//            add("siemaaaaa");
//            add("tutaj");
//            add("alabama");
//            add("git");
//            add("gitara");
//            add("czteryaaaa");
//        }}; // testy

        Map<String, Integer> quantityMap = new HashMap<>();

        for (int i = 0; i < wordsList.size(); i++) {
            int characterCounter = 0;
            char[] characterArray = wordsList.get(i).toCharArray();
            for (int j = 0; j < characterArray.length; j++) {
                if (searchedCharacter == characterArray[j]) characterCounter++;
            }
            quantityMap.put(wordsList.get(i), characterCounter);
        }

        List<Map.Entry<String, Integer>> sortedList = new ArrayList<>(quantityMap.entrySet());
        sortedList.sort(Map.Entry.comparingByValue(Comparator.reverseOrder()));

        ArrayList<Integer> helpingList = new ArrayList<>();
        ArrayList<Integer> differentQuantities = new ArrayList<>();

        for (int i = 0; i < sortedList.size(); i++) {
            helpingList.add(sortedList.get(i).getValue());
        }

        for (int i = 0; i < helpingList.size(); i++) {
            int duplicateCounter = 0;
            for (int j = 0; j < differentQuantities.size(); j++) {
                if (helpingList.get(i).equals(differentQuantities.get(j))) duplicateCounter++;
            }
            if (duplicateCounter == 0) differentQuantities.add(helpingList.get(i));
        }

        for (int i = 0; i < differentQuantities.size(); i++) {
            System.out.println("== Ilość wystąpień: " + differentQuantities.get(i) + " ==");
            for (int j = 0; j < sortedList.size(); j++) {
                if (sortedList.get(j).getValue() == differentQuantities.get(i)) {
                    System.out.println("- " + sortedList.get(j).getKey());
                }
            }
        }

    }
}
