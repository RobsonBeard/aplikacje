package Przyklady;

import java.util.Objects;

public class Student{
    // pola (zmienne klasy)
    // metody
    private String name;
    private String lastName;
    private int age;

    public Student(String name, String lastName, int age) {
        this.name = name;
        this.lastName=lastName;
        this.age=age;
        // takie zmienne klasy nie powinny być modyfikowane bezpośrednio, dlatego są prywatne
//            najczęściej chcemy je pobrać (getter) lub zmienić (setter)
//            podajemy skrót alt + insert / getter
    }
    public Student(String name) {
        this.name = name;
    } // drugi konstruktor

    public String getName() {
        return name;
    }

    public String getLastName() {
        return lastName;
    }

    public int getAge() {
        return age;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return this.getClass().getSimpleName() +"{" +
                "name=" + this.name +
                ", lastName=" + this.lastName +
                ", age=" + this.age + "}";
    }
//    @Override
//    public int hashCode() {
//        return Objects.hash(name, lastName, age);
//    }
    @Override
    public int hashCode() {
        return this.age * this.name.length() * this.lastName.length();
    }
    @Override
    public boolean equals(Object o) {
        return this.getClass() == o.getClass();
    }
//    @Override
//    public boolean equals(Object o) {
//        Student student = (Student) o;
//        return Objects.equals(this.getName(), student.getName());
//    }

}
