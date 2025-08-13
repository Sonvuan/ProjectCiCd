FROM openjdk:17-jdk-slim
LABEL authors="DTV"

# Copy file jar từ target vào container
COPY target/TimKiemDong-0.0.1-SNAPSHOT.jar app.jar

# Chạy ứng dụng
ENTRYPOINT ["java", "-jar", "/app.jar"]
