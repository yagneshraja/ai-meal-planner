package com.mealplanner.backend;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.List;

@Service
public class GeminiService {

    private final ChatClient chatClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private MemoryService memoryService;

    public GeminiService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public List<Meal> generateWeeklyPlan() {
        try {
            // 1. RAG Memory
            String pastMemories = memoryService.retrieveContext("recent meals");
            String memoryContext = pastMemories.isEmpty() ? "" : "Avoid these recent meals: " + pastMemories;

            // 2. Chain-of-Thought Prompt
            // We removed the "Strictly JSON" from the top and moved it to the end.
            // We explicitly tell it to "Thinking Process" which encourages Tool Use.
            String prompt = """
                You are an AI Chef Agent. Your goal is to plan a weekly meal menu (Mon-Sun, Breakfast/Lunch/Dinner).
                
                CONTEXT:
                %s
                
                INSTRUCTIONS:
                1. Select a potential Dinner meal.
                2. Call the 'groceryPrice' tool for the main ingredient of that meal.
                3. If the price is > $10, pick a different meal and check THAT price.
                4. Repeat until you have 7 cheap dinners.
                
                FINAL OUTPUT FORMAT:
                After you have done the price checking, output the final plan as a JSON ARRAY.
                Do not include your thinking or the prices in the final JSON, just the meal names.
                Example: [{"dayOfWeek": "MONDAY", "mealType": "DINNER", "itemName": "Chicken Salad"}]
                """.formatted(memoryContext);

            // 3. Call AI with Tool
            String response = chatClient.prompt()
                .user(prompt)
                .functions("groceryPrice") // Force tool availability
                .call()
                .content();

            // Clean potential markdown (The AI might add ```json blocks)
            String cleanJson = response;
            if (cleanJson.contains("```json")) {
                cleanJson = cleanJson.substring(cleanJson.indexOf("```json") + 7);
                if (cleanJson.contains("```")) {
                    cleanJson = cleanJson.substring(0, cleanJson.indexOf("```"));
                }
            }
            cleanJson = cleanJson.trim();

            // Parse
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

            // 4. Save Memory
            memoryService.saveMealPlanMemory(generatedMeals);

            return generatedMeals;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("AI Generation Failed: " + e.getMessage());
        }
    }
}