package Zadania.Zadanie04;

import java.math.BigInteger;
import java.util.ArrayList;

public class Silnia {

//    public BigInteger licznik(BigInteger k){
//        if(k.equals(BigInteger.ZERO)){
//           return BigInteger.ONE;
//        }
//        if(BigInteger.ZERO.compareTo(k)>=0){
//            return k.multiply(licznik(k.subtract(BigInteger.ONE)));
//        }
//        return BigInteger.ZERO;
//    }
//    public void liczSilnie(BigInteger n){
////        String wynik ="";
//        ArrayList<BigInteger> listaWynikow = new ArrayList<>();
//
//    }

    public void liczSilnie(int n){

    }

    public BigInteger faktycznaSilnia(BigInteger n){
        if(n.equals(BigInteger.ZERO)) return BigInteger.ONE;
        if(n.compareTo(BigInteger.ONE)>=0) return faktycznaSilnia(n.subtract(BigInteger.ONE));
        return BigInteger.ZERO;
    }


    public int zwyklaSilnia(int n){
        if (n==0) return 1;
        if(n>=1) return n*zwyklaSilnia(n-1);
        return 0;
    }

    public void liczZwyklaSilnie(int n){
        for(int i=1;i<=n;i++){
            System.out.println(i+"! = "+zwyklaSilnia(i));
        }
    }
}
