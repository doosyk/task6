const express = require('express');
const router = express.Router();
const controller = require('../controllers/tasks');
const validator = require('../middleware/validator');

// Маршруты для работы с задачами
router.get('/', controller.getAllTasks);       // GET /tasks
router.get('/:id', controller.getTaskById);    // GET /tasks/:id
router.post('/', validator, controller.createTask);    // POST /tasks
router.put('/:id', validator, controller.updateTask);  // PUT /tasks/:id
router.delete('/:id', controller.deleteTask);  // DELETE /tasks/:id

module.exports = router;