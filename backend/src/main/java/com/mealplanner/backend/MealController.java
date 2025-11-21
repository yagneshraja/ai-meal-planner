package com.mealplanner.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meals")
@CrossOrigin(origins = "*") // Allow React (Vite) to access this
public class MealController {

    @Autowired
    private MealService mealService;
    
    @Autowired
    private GeminiService geminiService;

    @GetMapping
    public List<Meal> getAllMeals() {
        return mealService.getAllMeals();
    }

    @PostMapping
    public Meal addMeal(@RequestBody Meal meal) {
        return mealService.saveMeal(meal);
    }

    @DeleteMapping("/{id}")
    public void deleteMeal(@PathVariable Long id) {
        mealService.deleteMeal(id);
    }

    // talks to gemini service to generate meal plan and saves to DB
    @PostMapping("/generate")
    public List<Meal> generatePlan() {
        // 1. Ask AI for the plan
        List<Meal> aiMeals = geminiService.generateWeeklyPlan();
        
        // 2. Save each meal to the DB (using existing service logic)
        for (Meal meal : aiMeals) {
            mealService.saveMeal(meal);
        }
        
        return aiMeals;
    }
}