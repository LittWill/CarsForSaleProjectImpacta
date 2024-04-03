FROM maven:3.9.6-eclipse-temurin-17-alpine AS BUILD_IMAGE
WORKDIR /build
COPY . /build
RUN mvn package -DskipTests

FROM amazoncorretto:17.0.10-alpine3.19
WORKDIR /app
COPY --from=BUILD_IMAGE /build/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]