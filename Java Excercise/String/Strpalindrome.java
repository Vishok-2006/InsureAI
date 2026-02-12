package INSURE-AI.Java Excercise.String;

public class Strpalindrome {
    public static boolean isPalindrome(String str) {
        int left = 0, right = str.length() - 1;
        str = str.toLowerCase();
        
        while (left < right) {
            if (str.charAt(left) != str.charAt(right))
                return false;
            left++;
            right--;
        }
        return true;
    }

    public static void main(String[] args) {
        String testStr = "Madam";
        System.out.println(testStr + " is palindrome? " + isPalindrome(testStr));
    }
}
