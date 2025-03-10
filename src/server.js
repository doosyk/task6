const app = require("./app");
const { PORT } = require("./config/constants");

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`Доступно по адресу: http://localhost:${PORT}`);
});
