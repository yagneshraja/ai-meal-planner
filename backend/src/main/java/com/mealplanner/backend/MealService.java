package com.mealplanner.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MealService {

    @Autowired
    private MealRepository mealRepository;

    public List<Meal> getAllMeals() {
        return mealRepository.findAll();
    }

    public Meal saveMeal(Meal meal) {
        // Check if a meal already exists in this slot
        Optional<Meal> existingMeal = mealRepository.findByDayOfWeekAndMealType(
            meal.getDayOfWeek(), 
            meal.getMealType()
        );

        if (existingMeal.isPresent()) {
            // Update the existing meal instead of creating a duplicate
            Meal update = existingMeal.get();
            update.setItemName(meal.getItemName());
            return mealRepository.save(update);
        } else {
            // Save as a new meal
            return mealRepository.save(meal);
        }
    }

    public void deleteMeal(Long id) {
        mealRepository.deleteById(id);
    }
}