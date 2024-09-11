package com.example;

import com.google.gson.*;
import java.io.FileReader;
import java.util.*;

public class App {

    private static Map<String, Object> hierarchy;

    public static void main(String[] args) {
        if (args.length < 3) {
            System.out.println("Uso: java -jar word-analyzer.jar analyze --depth <n> \"frase\" [--verbose]");
            return;
        }

        String command = args[0];
        if (!command.equals("analyze")) {
            System.out.println("Comando desconhecido: " + command);
            return;
        }

        int depth = Integer.parseInt(args[2]);
        String phrase = args[3];

        boolean verbose = Arrays.asList(args).contains("--verbose");

        long startLoadTime = System.currentTimeMillis();
        loadHierarchy("dicts/animals.json");
        long loadTime = System.currentTimeMillis() - startLoadTime;

        long startAnalyzeTime = System.currentTimeMillis();
        String result = analyzePhrase(phrase, depth);
        long analyzeTime = System.currentTimeMillis() - startAnalyzeTime;

        System.out.println(result);

        if (verbose) {
            System.out.println("Tempo de carregamento dos parâmetros: " + loadTime + "ms");
            System.out.println("Tempo de verificação da frase: " + analyzeTime + "ms");
        }
    }

    // Carregar a hierarquia de palavras do arquivo JSON
    private static void loadHierarchy(String filePath) {
        try {
            Gson gson = new Gson();
            FileReader reader = new FileReader(filePath);
            hierarchy = gson.fromJson(reader, Map.class);
            reader.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Analisar a frase
    public static String analyzePhrase(String phrase, int depth) {
        String[] words = phrase.split(" ");
        Map<String, Integer> result = new HashMap<>();

        for (String word : words) {
            searchWordInHierarchy(word, hierarchy, depth, 0, result);
        }

        return formatResult(result);
    }

    // Buscar a palavra na hierarquia
    private static void searchWordInHierarchy(String word, Map<String, Object> currentHierarchy, int targetDepth, int currentDepth, Map<String, Integer> result) {
        if (currentDepth == targetDepth) {
            currentHierarchy.forEach((key, value) -> {
                if (value instanceof List) {
                    if (((List<?>) value).contains(word)) {
                        result.put(key, result.getOrDefault(key, 0) + 1);
                    }
                }
            });
            return;
        }

        currentHierarchy.forEach((key, value) -> {
            if (value instanceof Map) {
                searchWordInHierarchy(word, (Map<String, Object>) value, targetDepth, currentDepth + 1, result);
            }
        });
    }

    // Formatar o resultado
    private static String formatResult(Map<String, Integer> result) {
        if (result.isEmpty()) {
            return "Nenhuma correspondência encontrada.";
        }

        StringBuilder output = new StringBuilder();
        result.forEach((key, value) -> output.append(key).append(" = ").append(value).append("; "));
        return output.toString().trim();
    }
}

