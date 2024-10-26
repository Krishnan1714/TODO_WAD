const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Task Routes
router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.put('/:id/complete', taskController.completeTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
