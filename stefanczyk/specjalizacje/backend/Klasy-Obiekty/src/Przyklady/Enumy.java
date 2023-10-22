package Przyklady;

public class Enumy {
    enum Letters {
        A,
        B,
        C
    }

    static void check(Letters l) {
        switch (l) {
            case A : System.out.println("AAA"); break;
            case B : System.out.println("BBB"); break;
            case C : System.out.println("CCC"); break;
        }
    }
    enum  Key {
        Right,
        Left,
        Up,
        Down
    }
    static void makeMove(Key key) {
        switch (key) {
            case Right : System.out.println("w prawo"); break;
            case Left : System.out.println("w lewo"); break;
            case Up : System.out.println("w górę"); break;
            case Down : System.out.println("w dół"); break;
        }
    }
}
