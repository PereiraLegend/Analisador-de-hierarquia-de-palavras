package com.example;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;

public class AppTest {

    @Test
    public void testAnalyzePhrase() {
        // Exemplo de frase e profundidade
        String phrase = "Eu amo papagaios";
        int depth = 3;

        String expectedResult = "Pássaros = 1;";

        String result = App.analyzePhrase(phrase, depth);

        assertEquals(expectedResult, result, "O resultado da análise está incorreto.");
    }

     @Test
    public void testAnalyzePhraseWithCorrespondence() {
        // Simulando o carregamento da hierarquia diretamente
        Map<String, Object> hierarchy = loadTestHierarchy();
        
        String phrase = "Eu amo Papagaios";
        int depth = 2;

        String result = App.analyzePhrase(phrase, depth);
        
        assertEquals("Pássaros = 1;", result);
    }

    @Test
    public void testAnalyzePhraseWithoutCorrespondence() {
        Map<String, Object> hierarchy = loadTestHierarchy();
        
        String phrase = "Eu tenho preferência por animais carnívoros";
        int depth = 5;

        String result = App.analyzePhrase(phrase, depth);
        
        assertEquals("Nenhuma correspondência encontrada.", result);
    }

    @Test
    public void testLoadHierarchy() {
        App.loadHierarchy("dicts/animals.json");
        
        // Certifica-se de que a hierarquia foi carregada corretamente
        assertNotNull(App.getHierarchy());
        assertTrue(App.getHierarchy().containsKey("Animais"));
    }


    @Test
    public void testAnalyzeLargePhrase() {
        // Gera uma frase com mais de 5000 caracteres
        String longPhrase = "Papagaios ".repeat(1000);
        
        int depth = 2;
        String result = App.analyzePhrase(longPhrase, depth);
        
        assertEquals("Pássaros = 1000;", result);
    }

    
    private Map<String, Object> loadTestHierarchy() {
        // Retorna uma hierarquia de teste
        return Map.of(
            "Animais", Map.of(
                "Aves", Map.of(
                    "Pássaros", List.of("Papagaios")
                )
            )
        );
    }

    
}

