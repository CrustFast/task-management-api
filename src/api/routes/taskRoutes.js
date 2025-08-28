/**
 * @file Defines the API routes for task-related operations.
 */

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { 
  createTaskValidator, 
  updateTaskValidator 
} = require('../middlewares/validators');

// --- Task Routes ---

// POST /tasks: Create a new task.
// The request body is first validated by createTaskValidator.
router.post('/', createTaskValidator, taskController.createTask);

// GET /tasks: Retrieve all tasks, with optional filtering and sorting.
router.get('/', taskController.getAllTasks);

// GET /tasks/:id: Retrieve a single task by its ID.
router.get('/:id', taskController.getTaskById);

// PUT /tasks/:id: Update an existing task.
// The request body is first validated by updateTaskValidator.
router.put('/:id', updateTaskValidator, taskController.updateTask);

// DELETE /tasks/:id: Delete a task by its ID.
router.delete('/:id', taskController.deleteTask);

module.exports = router;
