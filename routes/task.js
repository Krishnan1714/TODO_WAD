const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Task Routes
router.get('/', taskController.getTasks);
router.post('/:id/task', taskController.createTask);
router.post('/dates', taskController.createDate);
router.put('/:id/complete', taskController.completeTask);
router.delete('/:id', taskController.deleteTask);


module.exports = router;
