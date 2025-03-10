/**
 * Middleware для логирования входящих запросов
 * @param {Object} req - Объект запроса
 * @param {Object} res - Объект ответа
 * @param {Function} next - Следующий middleware
 */
module.exports = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};
