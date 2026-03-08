package INSURE-AI.Java Excercise.String;

public class Reverse {
public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter a sentence:");
        String sentence = sc.nextLine();
        sc.close();

        String[] words = sentence.split(" ");
        StringBuilder reversedSentence = new StringBuilder();

        for(String word : words) {
            StringBuilder reversedWord = new StringBuilder(word);
            reversedSentence.append(reversedWord.reverse()).append(" ");
        }

        System.out.println("Reversed words: " + reversedSentence.toString().trim());
    }
}
