package com.mealplanner.backend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper(); // To parse JSON

    public List<Meal> generateWeeklyPlan() {
        try {
            // 1. The Prompt: We force the AI to give us JSON that matches our Database exactly
            String prompt = """
                Generate a weekly meal plan (Monday to Sunday) for Breakfast, Lunch, and Dinner.
                Strictly return ONLY a JSON array of objects. Do not add markdown formatting like ```json.
                The JSON format must be exactly:
                [
                  { "dayOfWeek": "MONDAY", "mealType": "BREAKFAST", "itemName": "Oatmeal with Berries" }
                ]
                """;

            // 2. Construct the Google API Request Payload
            Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                    Map.of("parts", List.of(
                        Map.of("text", prompt)
                    ))
                )
            );

            // 3. Set Headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // 4. Send Request
            String finalUrl = apiUrl + "?key=" + apiKey;
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            
            ResponseEntity<String> response = restTemplate.exchange(
                finalUrl, HttpMethod.POST, entity, String.class
            );

            // 5. Parse the "Candidate" text from Google
            JsonNode root = objectMapper.readTree(response.getBody());
            String rawJsonText = root.path("candidates").get(0).path("content").path("parts").get(0).path("text").asText();

            // Clean up potential markdown artifacts if the AI ignores instructions
            rawJsonText = rawJsonText.replace("```json", "").replace("```", "").trim();

            // 6. Convert JSON text to List<Meal>
            JsonNode mealsArray = objectMapper.readTree(rawJsonText);
            List<Meal> generatedMeals = new ArrayList<>();
            
            if (mealsArray.isArray()) {
                for (JsonNode node : mealsArray) {
                    Meal meal = new Meal();
                    meal.setDayOfWeek(node.get("dayOfWeek").asText().toUpperCase());
                    meal.setMealType(node.get("mealType").asText().toUpperCase());
                    meal.setItemName(node.get("itemName").asText());
                    generatedMeals.add(meal);
                }
            }
            return generatedMeals;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("AI Generation Failed: " + e.getMessage());
        }
    }
}