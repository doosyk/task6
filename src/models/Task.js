// Имитация базы данных в памяти
let tasks = require("../../data/tasksData");

let lastId = tasks.length ? Math.max(...tasks.map((t) => t.id)) : 0; // Счетчик для генерации ID

module.exports = {
  /**
   * Получить все задачи
   * @returns {Array} Массив задач
   */
  getAll() {
    return tasks;
  },

  /**
   * Найти задачу по ID
   * @param {number} id - Идентификатор задачи
   * @returns {Object|null} Объект задачи или null
   */
  getById(id) {
    return tasks.find((task) => task.id === id) || null;
  },

  /**
   * Создать новую задачу
   * @param {Object} data - Данные задачи
   * @returns {Object} Созданная задача
   */
  create(data) {
    const newTask = {
      id: ++lastId,
      title: data.title,
      completed: data.completed || false,
      userId: data.userId, // Привязка к пользователю
    };
    tasks.push(newTask);
    return newTask;
  },

  /**
   * Обновить существующую задачу
   * @param {number} id - Идентификатор задачи
   * @param {Object} updates - Новые данные
   * @returns {Object|null} Обновленная задача или null
   */
  update(id, updates) {
    const task = this.getById(id);
    if (!task) return null;

    Object.assign(task, updates);
    return task;
  },

  /**
   * Удалить задачу
   * @param {number} id - Идентификатор задачи
   * @returns {boolean} Успех операции
   */
  delete(id) {
    const initialLength = tasks.length;
    tasks = tasks.filter((task) => task.id !== id);
    return tasks.length !== initialLength;
  },

  /**
   * Удалить все задачи пользователя
   * @param {number} userId - ID пользователя
   * @returns {boolean} True, если задачи удалены
   */
  deleteAllByUserId(userId) {
    const initialLength = tasks.length;
    tasks = tasks.filter((task) => task.userId !== userId);
    return tasks.length !== initialLength;
  },
};
