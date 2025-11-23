package com.mealplanner.backend;

import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MemoryService {

    private final VectorStore vectorStore;

    public MemoryService(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    // 1. SAVE a meal plan into Long-Term Memory
    public void saveMealPlanMemory(List<Meal> meals) {
        for (Meal meal : meals) {
            String memoryText = "User ate " + meal.getItemName() + " for " + meal.getMealType() + " on " + meal.getDayOfWeek();
            
            Map<String, Object> metadata = Map.of(
                "day", meal.getDayOfWeek(),
                "type", meal.getMealType()
            );

            vectorStore.add(List.of(new Document(memoryText, metadata)));
        }
        System.out.println("🧠 Memories stored in Vector Database!");
    }

    // 2. RETRIEVE relevant memories
    public String retrieveContext(String query) {
        // FIX 1: Use the Builder pattern for SearchRequest
        SearchRequest request = SearchRequest.builder()
            .query(query)
            .topK(3)
            .build();

        List<Document> similarDocuments = vectorStore.similaritySearch(request);

        // FIX 2: Use getText() instead of getContent()
        return similarDocuments.stream()
                .map(Document::getText) 
                .collect(Collectors.joining("\n"));
    }
}