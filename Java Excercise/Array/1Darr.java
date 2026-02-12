package INSURE-AI.Java Excercise.Array;

public class 1Darr {
        public static void main(String[] args) {
        int[] numbers = new int[5];
        numbers[0] = 10;
        numbers[1] = 30;
        numbers[2] = 20;
        numbers[3] = 50;
        numbers[4] = 40;

        // Print elements
        System.out.println("1D Array elements:");
        for (int i = 0; i < numbers.length; i++) {
            System.out.print(numbers[i] + " ");
        }

        // Find array length
        System.out.println("\nArray length: " + numbers.length);
    }

}
