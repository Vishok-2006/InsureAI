package INSURE-AI.Java Excercise.Operator;

public class operators {
public static void main(String[] args) {
        // Arithmetic Operators
        int a = 12, b = 5;
        System.out.println("Arithmetic Operators:");
        System.out.println("a + b = " + (a + b));
        System.out.println("a - b = " + (a - b));
        System.out.println("a * b = " + (a * b));
        System.out.println("a / b = " + (a / b));
        System.out.println("a % b = " + (a % b));

        // Relational Operators
        System.out.println("\nRelational Operators:");
        System.out.println("a == b : " + (a == b));
        System.out.println("a != b : " + (a != b));
        System.out.println("a > b : " + (a > b));
        System.out.println("a < b : " + (a < b));
        System.out.println("a >= b : " + (a >= b));
        System.out.println("a <= b : " + (a <= b));

        // Logical Operators
        boolean x = true, y = false;
        System.out.println("\nLogical Operators:");
        System.out.println("x && y : " + (x && y));
        System.out.println("x || y : " + (x || y));
        System.out.println("!x : " + (!x));

        // Assignment Operators
        int c = 10;
        System.out.println("\nAssignment Operators:");
        System.out.println("c = " + c);
        c += 5; // c = c + 5
        System.out.println("After c += 5, c = " + c);
        c -= 3; // c = c - 3
        System.out.println("After c -= 3, c = " + c);
        c *= 2; // c = c * 2
        System.out.println("After c *= 2, c = " + c);
        c /= 4; // c = c / 4
        System.out.println("After c /= 4, c = " + c);
        c %= 3; // c = c % 3
        System.out.println("After c %= 3, c = " + c);
    }
}
