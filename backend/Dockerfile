# Stage 1: Build the App
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Run the App
# CRITICAL CHANGE: We switch from 'alpine' to 'jammy' (Ubuntu) 
# because the AI Transformer model needs standard C libraries (glibc) that Alpine lacks.
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]