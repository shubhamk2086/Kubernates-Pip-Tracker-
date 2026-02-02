#Use an official Java runtime as a parent image
FROM eclipse-temurin:17-jdk-jammy
 
# Set working directory
WORKDIR /app
 
# Copy JAR file
COPY PipReviewSystem-0.0.1-SNAPSHOT-1.jar  app.jar
 
# Expose port
EXPOSE 8080
 
# Run the JAR
CMD ["java", "-jar", "app.jar"]
