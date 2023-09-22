package Przyklady;

import java.util.*;

public class PrzykladyCiagDalszy {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>() {
            {
                add("a");
                add("b");
                add("c");
            }
        };
//        System.out.println("ArrayList : " + list);


        ArrayList<String> list2 = new ArrayList<>(
                Arrays.asList(
                        "a",
                        "b",
                        "c")
        );

//        System.out.println("ArrayList : " + list2);


        List<Integer> list3 = Arrays.asList(3, 6, 9, 12, 15);
//        System.out.println(list3);


        Set<String> set1 = new HashSet<>() {
            {
                add("a");
                add("b");
                add("c");
                add("a");
            }
        };

//        System.out.println(set1);


        Map<String, Integer> map = new HashMap<>() {
            {
                put("a", 100);
                put("b", 200);
                put("c", 300);
            }
        };
//        System.out.println(map);


        ArrayList<Integer> items2 = new ArrayList<>();
        items2.add(1);
        items2.add(2);
        items2.add(3);

        for (int i = 0; i < items2.size(); i++) {
//            System.out.println(items2.get(i));
        }

        for (Integer i : items2) {
//            System.out.println(i);
        }


        Map<String, Integer> map1 = new HashMap<>() {
            {
                put("a", 100);
                put("b", 200);
                put("c", 300);
            }
        };
        for (String key : map1.keySet()) {
//            System.out.println(key + ":" + map1.get(key));
        }
        for (Integer value : map1.values()) {
//            System.out.println(value);
        }
        for (Map.Entry<String, Integer> entry : map1.entrySet()) {
            System.out.println(entry.getKey() + ":" + entry.getValue());
        }


        Set<String> set2 = new HashSet<>() {
            {
                add("a");
                add("b");
                add("c");
            }
        };

        for (String s : set2) {
//            System.out.println(s);
        }

    }
}
