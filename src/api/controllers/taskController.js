/**
 * @file Handles HTTP requests for the /tasks endpoint.
 */

const taskService = require('../services/taskService');

/**
 * Handles the creation of a new task.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
const createTask = async (req, res) => {
  try {
    const newTask = await taskService.createTask(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: 'Error creating task', error: error.message });
  }
};

/**
 * Handles fetching a single task by its ID from the URL parameters.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
const getTaskById = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const task = await taskService.getTaskById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task', error: error.message });
  }
};

/**
 * Handles fetching all tasks, applying filters and sorting from query parameters.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
const getAllTasks = async (req, res) => {
  try {
    const filters = {
      category: req.query.category,
      priority: req.query.priority,
    };
    const sortBy = req.query.sortBy;

    const tasks = await taskService.getAllTasks(filters, sortBy);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

/**
 * Handles updating an existing task.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
const updateTask = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const updatedTask = await taskService.updateTask(taskId, req.body);
    res.status(200).json(updatedTask);
  } catch (error) {
    // Prisma's specific error code for a record not found during an update/delete operation.
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

/**
 * Handles deleting a task.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
const deleteTask = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    await taskService.deleteTask(taskId);
    // Send a 204 No Content response, as there is no data to return.
    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};

module.exports = {
  createTask,
  getTaskById,
  getAllTasks,
  updateTask,
  deleteTask,
};
