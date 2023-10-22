package Przyklady;

public class StudentExtra extends Student {
    private  int salary;

    public StudentExtra(String name, String lastName, int age, int salary) {
        super(name, lastName, age);
        this.salary= salary;
    }

    //--
    @Override
    public String toString() {
        return super.toString();
    }
}
