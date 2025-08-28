const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createTask = async (taskData) => {
  const newTask = await prisma.task.create({
    data: taskData,
  });
  return newTask;
};

const getTaskById = async (id) => {
  const task = await prisma.task.findUnique({
    where: {
      id: id,
    },
  });
  return task;
};

const getAllTasks = async () => {
  const tasks = await prisma.task.findMany();
  return tasks;
};

const updateTask = async (id, taskData) => {
  const updatedTask = await prisma.task.update({
    where: { id: id },
    data: taskData,
  });
  return updatedTask;
};

const deleteTask = async (id) => {
  await prisma.task.delete({
    where: { id: id },
  });
};

module.exports = {
  createTask,
  getTaskById,
  getAllTasks,
  updateTask,   // Export
  deleteTask,   
};