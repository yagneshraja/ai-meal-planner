package com.mealplanner.backend.tools;

import java.util.function.Function;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Description;

@Configuration
public class GroceryTool {

    // This function simulates looking up a price in a database or API
    @Bean
    @Description("Get the current market price of a food ingredient")
    public Function<Request, Response> groceryPrice() {
        return request -> {
            String item = request.ingredient().toLowerCase();
            System.out.println("🛒 TOOL USED: Checking price for " + item);
            
            // Mock Pricing Database
            double price = switch (item) {
                case "salmon" -> 20.00; // Expensive!
                case "steak" -> 18.00;  // Expensive!
                case "chicken" -> 5.00;
                case "eggs" -> 0.50;
                case "oatmeal" -> 0.20;
                case "rice" -> 1.50;
                default -> 3.00;
            };
            
            return new Response(price);
        };
    }

    // Data classes for Input/Output
    public record Request(String ingredient) {}
    public record Response(double price) {}
}