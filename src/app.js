const express = require("express");
const app = express();
const logger = require("./middleware/logger");
const tasksRouter = require("./routes/tasks");
const userRoutes = require("./routes/userRoutes"); // Добавил маршруты для пользователей

// Глобальные middleware
app.use(express.json()); // Парсинг JSON-тела запроса
app.use(logger); // Логирование запросов

// Подключение маршрутов
app.use("/tasks", tasksRouter);
app.use("/users", userRoutes); // Подключение маршрутов для пользователей

// Обработка ошибок 404 (не найден)
app.use((req, res) => {
  res.status(404).json({ error: "Маршрут не найден" });
});

// Централизованная обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Внутренняя ошибка сервера" });
});

module.exports = app;
