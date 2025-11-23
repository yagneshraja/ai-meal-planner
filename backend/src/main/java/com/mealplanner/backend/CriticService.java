package com.mealplanner.backend;

import java.util.List;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class CriticService {

    private final ChatClient chatClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public CriticService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    // The Critic reviews a list of meals and returns a structured critique
    public Critique reviewPlan(List<Meal> proposedPlan) {
        try {
            // 1. Convert the plan to a string so the AI can read it
            String planDescription = proposedPlan.stream()
                .map(m -> m.getDayOfWeek() + " " + m.getMealType() + ": " + m.getItemName())
                .reduce("", (a, b) -> a + "\n" + b);

            // 2. The "Persona" Prompt
            String prompt = """
                You are a strict Nutritional Critic. Review the following weekly meal plan.
                
                MEAL PLAN:
                %s
                
                CRITERIA:
                1. Variety: Are the protein sources varied? (Not just chicken every day).
                2. Balance: Is there a mix of vegetables and carbs?
                
                OUTPUT FORMAT:
                Strictly return ONLY a JSON object. No markdown.
                Format:
                {
                    "approved": true/false,
                    "feedback": "Your feedback here (max 1 sentence)"
                }
                """.formatted(planDescription);

            // 3. Call the Critic
            String response = chatClient.prompt()
                .user(prompt)
                .call()
                .content();

            // 4. Parse the JSON response
            String cleanJson = response.replace("```json", "").replace("```", "").trim();
            return objectMapper.readValue(cleanJson, Critique.class);

        } catch (Exception e) {
            // If the critic fails, we default to approval to avoid crashing
            System.err.println("Critic failed: " + e.getMessage());
            return new Critique(true, "Critic is offline, assuming plan is good.");
        }
    }

    // A simple class to hold the Critic's judgment
    public record Critique(boolean approved, String feedback) {}
}