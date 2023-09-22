package Przyklady;

import java.util.*;

public class PrzykladoweListy {
    public static void main(String[] args) {
//        ArrayList
        ArrayList<String> items = new ArrayList<>();
        items.add("a");
        items.add("b");
        items.add("c");
//        System.out.println(items);
//        System.out.println(items.get(0));

        ArrayList<Integer> items2 = new ArrayList<>();
        items2.add(1);
        items2.add(2);
        items2.add(3);
//        System.out.println(items2);
//        System.out.println(items2.get(0));

        items2.remove(0);
//        System.out.println(items2);

        items2.clear();
//        System.out.println(items2);

        for (int i = 0; i < items.size(); i++) {
//            System.out.println(items.get(i));
        }

//        Set
        Set<String> set1 = new HashSet<>();
        set1.add("a");
        set1.add("b");
        set1.add("c");
        set1.add("a");
        set1.add("a");

//        System.out.println(set1);
//        System.out.println(set1.size());

        //String[] array = (String[]) set1.toArray(); // java przewiduje że stanie się błąd
        //  System.out.println(array[0]);

        ArrayList<String> list = new ArrayList<>(set1);
//        System.out.println(list.get(0));

        set1.remove("a");
//        System.out.println(set1);


        Set<String> set2 = new HashSet<>();
        set2.add("a");
        set2.add("b");

        Set<String> set3 = new HashSet<>();
        set3.add("a");
        set3.add("e");

        set2.addAll(set3);
//        System.out.println(set2);

        // ----

        ArrayList<String> l1 = new ArrayList<>();
        l1.add("a");
        l1.add("b");

        ArrayList<String> l2 = new ArrayList<>();
        l2.add("b");
        l2.add("c");

//        l1.addAll(l2);
        l1.retainAll(l2);
//        System.out.println(l1);


        Map<String, Integer> map = new HashMap<String, Integer>();
        map.put("a", 100);
        map.put("b", 200);
        map.put("c", 300);
        map.put("d", 400);
        map.put("a", 200);

//        System.out.println(map);
//        System.out.println(map.get("a"));


    }
}
