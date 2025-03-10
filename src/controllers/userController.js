const User = require("../models/User");
const Task = require("../models/Task");

module.exports = {
  getAllUsers(req, res) {
    res.json(User.getAll());
  },

  getUserById(req, res) {
    const user = User.getById(Number(req.params.id));
    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }
    res.json(user);
  },

  createUser(req, res) {
    try {
      const newUser = User.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateUser(req, res) {
    const updatedUser = User.update(Number(req.params.id), req.body);
    if (!updatedUser) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }
    res.json(updatedUser);
  },

  deleteUser(req, res) {
    const userId = Number(req.params.id);
    const success = User.delete(userId);
    
    if (!success) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    // Каскадное удаление задач пользователя
    Task.deleteAllByUserId(userId);

    res.json({ message: "Пользователь и его задачи удалены" });
  },
};
