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

    @Autowired
    private CriticService criticService; 

    public GeminiService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public List<Meal> generateWeeklyPlan() {
        String pastMemories = memoryService.retrieveContext("recent meals");
        String memoryContext = pastMemories.isEmpty() ? "" : "Avoid these recent meals: " + pastMemories;
        
        List<Meal> bestPlan = new ArrayList<>();
        int attempts = 0;
        boolean approved = false;

        // The Feedback Loop
        while (!approved && attempts < 3) {
            attempts++;
            System.out.println("👨‍🍳 Chef is drafting plan... Attempt " + attempts);

            // If we have a previous plan that failed, we mention it (simplified for now)
            String criticFeedback = (attempts > 1) ? "PREVIOUS PLAN WAS REJECTED. TRY AGAIN." : "";

            try {
                String prompt = """
                    You are an AI Chef Agent. Plan a weekly menu - south indian foods - healthy - fitness oriented (Mon-Sun, Breakfast/Lunch/Dinner).
                    - research on what they eat most for breakfast, lunch and dinner in south india
                    - ensure variety in protein sources
                    - keep ingredients affordable (under $10 per meal)
                    - consider seasonal vegetables
                    - respond in JSON array format
                    %s
                    %s
                    
                    CRITICAL: Use 'groceryPrice' tool. If price > $10, swap ingredient.
                    Strictly return ONLY a JSON array. No markdown.
                    
                    REQUIRED JSON KEYS for every object: "dayOfWeek", "mealType", "itemName".
                    Example: [{"dayOfWeek": "MONDAY", "mealType": "DINNER", "itemName": "Chicken Salad"}]
                    """.formatted(memoryContext, criticFeedback);

                String response = chatClient.prompt()
                    .user(prompt)
                    .functions("groceryPrice")
                    .call()
                    .content();

                String cleanJson = response.replace("```json", "").replace("```", "").trim();
                JsonNode mealsArray = objectMapper.readTree(cleanJson);
                
                List<Meal> candidatePlan = new ArrayList<>();
                if (mealsArray.isArray()) {
                    for (JsonNode node : mealsArray) {
                        Meal meal = new Meal();
                        // FIX: Use .path() instead of .get() to prevent NullPointerException
                        meal.setDayOfWeek(node.path("dayOfWeek").asText("MONDAY").toUpperCase());
                        meal.setMealType(node.path("mealType").asText("DINNER").toUpperCase());
                        meal.setItemName(node.path("itemName").asText("Surprise Meal"));
                        candidatePlan.add(meal);
                    }
                }

                // 🕵️‍♂️ Send to the Critic
                System.out.println("🕵️‍♂️ Sending plan to Critic...");
                CriticService.Critique critique = criticService.reviewPlan(candidatePlan);
                
                if (critique.approved()) {
                    System.out.println("✅ Critic Approved: " + critique.feedback());
                    bestPlan = candidatePlan;
                    approved = true;
                } else {
                    System.out.println("❌ Critic Rejected: " + critique.feedback());
                }
                
                if (attempts == 3 && !approved) {
                     System.out.println("⚠️ Max attempts reached. Using last plan.");
                     bestPlan = candidatePlan;
                }

            } catch (Exception e) {
                System.err.println("Attempt " + attempts + " failed: " + e.getMessage());
                e.printStackTrace();
            }
        }

        if (!bestPlan.isEmpty()) {
            memoryService.saveMealPlanMemory(bestPlan);
        }
        
        return bestPlan;
    }
}