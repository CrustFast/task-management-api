const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
// Impor validator yang baru kita buat
const { createTaskValidator, updateTaskValidator } = require('../middlewares/validators');

// POST /tasks: Terapkan middleware validasi sebelum controller
router.post('/', createTaskValidator, taskController.createTask);

// GET /tasks: Mengambil semua tugas
router.get('/', taskController.getAllTasks);

// GET /tasks/:id: Mengambil satu task spesifik
router.get('/:id', taskController.getTaskById);

// PUT /tasks/:id: Terapkan middleware validasi sebelum controller
router.put('/:id', updateTaskValidator, taskController.updateTask);

// DELETE /tasks/:id: Menghapus tugas
router.delete('/:id', taskController.deleteTask);

module.exports = router;
