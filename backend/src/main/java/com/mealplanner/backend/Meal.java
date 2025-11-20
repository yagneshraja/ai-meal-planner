package com.mealplanner.backend;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "meals", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"dayOfWeek", "mealType"})
})
@Data // Lombok: Generates Getters, Setters, toString, etc.
@NoArgsConstructor
@AllArgsConstructor
public class Meal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String dayOfWeek; // e.g., "MONDAY"

    @Column(nullable = false)
    private String mealType;  // e.g., "LUNCH"

    @Column(nullable = false)
    private String itemName;  // e.g., "Pizza"
}