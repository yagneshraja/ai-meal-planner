package com.mealplanner.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface MealRepository extends JpaRepository<Meal, Long> {
    // Custom query to find if a meal already exists for a specific slot
    boolean existsByDayOfWeekAndMealType(String dayOfWeek, String mealType);
    
    // Helper to find the existing meal so we can update it if needed
    Optional<Meal> findByDayOfWeekAndMealType(String dayOfWeek, String mealType);
}