package com.mealplanner.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class SundayAgent {

    @Autowired
    private GeminiService geminiService;

    @Autowired
    private MealService mealService;

    @Autowired
    private EmailService emailService;

    // CRON EXPRESSION: "0 0 20 * * SUN" = Every Sunday at 8:00 PM
    // For testing now, we use "0 * * * * *" = Every Minute (So you can see it work!)
    @Scheduled(cron = "0 0 20 * * SUN") 
    public void runWeeklyTask() {
        System.out.println("🤖 Agent Waking Up: It's time to plan the week...");

        // 1. Ask AI for the Plan
        List<Meal> newPlan = geminiService.generateWeeklyPlan();
        
        // 2. Save to Database
        for (Meal meal : newPlan) {
            mealService.saveMeal(meal);
        }

        // 3. Format the Email Body
        StringBuilder emailBody = new StringBuilder();
        emailBody.append("Here is your AI Chef Plan for the week:\n\n");
        
        for (Meal meal : newPlan) {
            emailBody.append(String.format("%-10s | %-10s | %s\n", 
                meal.getDayOfWeek(), meal.getMealType(), meal.getItemName()));
        }
        
        emailBody.append("\n\nEnjoy your food! 🍎");

        // 4. Send the Email (REPLACE WITH YOUR EMAIL)
        emailService.sendEmail("yagneshworkai@gmail.com", "Weekly Meal Plan 🥗", emailBody.toString());
        
        System.out.println("💤 Agent task complete. Going back to sleep.");
    }
}