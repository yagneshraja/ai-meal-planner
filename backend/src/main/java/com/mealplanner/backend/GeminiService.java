package com.mealplanner.backend;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.List;

@Service
public class GeminiService {

    private final ChatClient chatClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    // Spring AI automatically injects the pre-configured ChatClient here.
    // It knows about the API Key and URL from application.properties.
    public GeminiService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public List<Meal> generateWeeklyPlan() {
        try {
            String prompt = """
                Generate a weekly meal plan (Monday to Sunday) for Breakfast, Lunch, and Dinner.
                Strictly return ONLY a JSON array of objects. Do not add markdown formatting like ```json.
                The JSON format must be exactly:
                [
                  { "dayOfWeek": "MONDAY", "mealType": "BREAKFAST", "itemName": "Oatmeal with Berries" }
                ]
                """;

            // The New Way: Using Spring AI Client
            String response = chatClient.prompt()
                .user(prompt)
                .call()
                .content();

            // Clean up potential markdown artifacts
            String cleanJson = response.replace("```json", "").replace("```", "").trim();

            // Convert JSON text to List<Meal>
            JsonNode mealsArray = objectMapper.readTree(cleanJson);
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