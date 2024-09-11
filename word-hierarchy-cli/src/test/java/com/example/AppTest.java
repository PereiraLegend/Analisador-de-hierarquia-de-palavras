package com.example;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import java.util.Map;

public class AppTest {

    @Test
    public void testAnalyzePhrase() {
        // Exemplo de frase e profundidade
        String phrase = "Eu amo papagaios";
        int depth = 3;

        // Esperado resultado da análise para a frase
        String expectedResult = "Pássaros = 1;";

        // Análise da frase
        String result = App.analyzePhrase(phrase, depth);

        // Verificar se o resultado corresponde ao esperado
        assertEquals(expectedResult, result, "O resultado da análise está incorreto.");
    }
}

