// Имитация базы данных в памяти
let users = require("../../data/usersData");
let tasks = require("../../data/tasksData");

let lastId = users.length ? Math.max(...users.map((u) => u.id)) : 0; // Счетчик для генерации ID

module.exports = {
  /**
   * Получить всех пользователей
   * @returns {Array} Массив пользователей
   */
  getAll() {
    return users;
  },

  /**
   * Найти пользователя по ID
   * @param {number} id - Идентификатор пользователя
   * @returns {Object|null} Объект пользователя или null
   */
  getById(id) {
    return users.find((user) => user.id === id) || null;
  },

  /**
   * Создать нового пользователя
   * @param {Object} data - Данные пользователя
   * @returns {Object} Созданный пользователь
   */
  create(data) {
    if (!data.fullName || !data.job || !data.age || !data.city) {
      throw new Error("Все поля (fullName, job, age, city) обязательны");
    }

    const newUser = {
      id: ++lastId,
      fullName: data.fullName,
      job: data.job,
      age: data.age,
      city: data.city,
    };

    users.push(newUser);
    return newUser;
  },

  /**
   * Обновить существующего пользователя
   * @param {number} id - Идентификатор пользователя
   * @param {Object} updates - Новые данные
   * @returns {Object|null} Обновленный пользователь или null
   */
  update(id, updates) {
    const user = this.getById(id);
    if (!user) return null;

    Object.assign(user, updates);
    return user;
  },

  /**
   * Удалить пользователя и связанные с ним задачи
   * @param {number} id - Идентификатор пользователя
   * @returns {boolean} Успех операции
   */
  delete(id) {
    const initialLength = users.length;
    users = users.filter((user) => user.id !== id);

    // Каскадное удаление задач пользователя
    tasks = tasks.filter((task) => task.userId !== id);

    return users.length !== initialLength;
  },
};
