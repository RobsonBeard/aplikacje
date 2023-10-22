package Przyklady;

import static Przyklady.Enumy.check;
import static Przyklady.Enumy.makeMove;

public class Klasy1 {

    public static void main(String[] args) {
//        public - zmienna/funkcja widoczna wszędzie bez ograniczeń, tak jest domyślnie
//        private - zmienna/funkcja widoczna w danej klasie i jej obiektach
//        protected - zmienna/funkcja widoczna w klasie, jej obiektach i klasach dziedziczących z niej

        Student s = new Student("Jan","Kowalski",18); // obiekt klasy
//        System.out.println(s.getClass().getName());
//        System.out.println(s.getName());
//        System.out.println(s.getLastName());
//        System.out.println(s.getAge());

        s.setName("Anna");
        s.setLastName("Nowak");
        s.setAge(22);

//        System.out.println(s.getName());
//        System.out.println(s.getLastName());
//        System.out.println(s.getAge());

        Student s2 = new Student("Piotr");
//        System.out.println(s2.getName());
//        System.out.println(s2.getLastName());
//        System.out.println(s2.getAge());

        Student s3 = new Student("Jan","Kowalski", 15);
//        System.out.println(s3.toString());
//        System.out.println(s3);

        StudentExtra se = new StudentExtra("Piotr","Mec", 26,1200);
//        System.out.println(se);

        Student s4 = new Student("Jan","Kowalski", 15);
//        System.out.println(s4.hashCode());
        Student s5 = new Student("Jan","Długi", 15);
//        System.out.println(s5.hashCode());

        Student s6 = new Student("Jan","Kowalski", 15);
        Student s7 = new Student("Jan","Kowalski", 15);
        // przed override equals
//        System.out.println(s6.getName().equals(s7.getName())); //true
//        System.out.println(s6.equals(s7)); // false
        // po
//        System.out.println(s6.equals(s7)); // true

//        check(Enumy.Letters.A);
//        makeMove(Enumy.Key.Right);

    }
}

//    Konstruktor
//      – specjalna metoda danej klasy, wywoływana podczas tworzenia jej instancji.
//      - zadaniem konstruktora jest inicjalizacja obiektu podczas jego tworzenia.
//      - konstruktor ma taką samą nazwę jak klasa i z punktu widzenia składni jest podobny do metody.
//      - konstruktory nie mają jednak określonego typu zwracanego.
//      - zwykle konstruktor nadaje wartości początkowe zmiennym składowym obiektu lub wykonuje inne czynności wymagane do nadania obiektowi ostatecznej postaci.
//      - niezależnie od tego, czy zdefiniujemy konstruktor, czy nie, wszystkie klasy w języku Java mają konstruktor domyślny
//      - jeśli zdefiniujemy jednak własny konstruktor, konstruktor domyślny przestanie być używany.
//      - Do tworzenia najłatwiej skorzystać ze skrótu ALT + INSERT w obrębie kodu klasy, i wybrać generate constructor

//    klasa może posiadać więcej niż jeden konstruktor, czyli innymi słowy, można na różne sposoby zainicjalizować jej obiekt