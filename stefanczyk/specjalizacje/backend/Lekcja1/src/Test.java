public class Test {
    public static void main(String[] args) {
//        System.out.println("tescik");
        byte bajt = 1;
        int incik = 1;
        short szortens = 10;
        long loung = 200L;
        float floucik = 1.234F;
        double dablju = 1D;
        boolean bulian = false;
        char znak = 'z';
        String napis = "napis";

//        System.out.println(incik/2);
//        System.out.println(dablju/2);

        final String CONST_STRING = "test";
//        TEST_STRING = ""; // nie da sie, bo to const

        int a = Integer.parseInt("123");
//        int b = Integer.parseInt("www"); // błąd
        float c = Float.parseFloat("123");
        double d = Double.parseDouble("123");
        boolean e = Boolean.parseBoolean("false");
        boolean f = Boolean.parseBoolean("aaa");
        String g = String.valueOf(true);
        String h = String.valueOf(456);
        String i = String.valueOf(12.34);
        String j  = String.valueOf(2 > 1);

//        System.out.println(j);
//        System.out.println(h);


        int int1 = 10;
        int int2 = 10;

//        System.out.println(int1 == int2) ;// true

        int int3 = 10;
//        String s2 = "10";
//        System.out.println(int3 == s2) ; // błąd

        float negZero = -0.0f;
        float posZero = 0.0f;
//        System.out.println(negZero == posZero) ; // true

        String s1 = "hello";
        String s2 = "hello";
        String s3 =new  String("hello");
//        System.out.println(s1 == s2); // true
//        System.out.println(s1 == s3); // false
//        System.out.println(s1.equals(s2)); // true
//        System.out.println(s1.equals(s3)); // true

    }
}
