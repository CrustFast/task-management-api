const taskService = require('../services/taskService');

const createTask = async (req, res) => {
  try {
    const newTask = await taskService.createTask(req.body);
    res.status(201).json(newTask); // Kirim task yang baru dibuat sebagai respons
  } catch (error) {
    res.status(400).json({ message: 'Error creating task', error: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id); // Ambil ID dari parameter URL
    const task = await taskService.getTaskById(taskId);
    
    if (!task) {
      // Jika task tidak ditemukan, kirim 404 Not Found
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.status(200).json(task); // Kirim task yang ditemukan
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task', error: error.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const updatedTask = await taskService.updateTask(taskId, req.body);
    res.status(200).json(updatedTask);
  } catch (error) {
    // Menambahkan penanganan error jika task tidak ditemukan
    if (error.code === 'P2025') { 
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    await taskService.deleteTask(taskId);
    // Mengirim respons tanpa body, hanya status code
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
  updateTask,   // Export
  deleteTask, 
};