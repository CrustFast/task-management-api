/**
 * @file Manages all database operations related to tasks.
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Creates a new task in the database.
 * @param {object} taskData - The data for the new task.
 * @returns {Promise<object>} The newly created task object.
 */
const createTask = async (taskData) => {
  return prisma.task.create({
    data: taskData,
  });
};

/**
 * Retrieves a single task by its unique ID.
 * @param {number} id - The ID of the task to retrieve.
 * @returns {Promise<object|null>} The found task object or null if not found.
 */
const getTaskById = async (id) => {
  return prisma.task.findUnique({
    where: { id },
  });
};

/**
 * Retrieves all tasks, with optional filtering and sorting.
 * @param {object} filters - An object containing filter criteria (e.g., { category, priority }).
 * @param {string} sortBy - The field to sort the results by (e.g., 'deadline').
 * @returns {Promise<Array<object>>} An array of task objects.
 */
const getAllTasks = async (filters = {}, sortBy) => {
  const whereClause = {};
  const orderByClause = {};

  // Build the WHERE clause for filtering
  if (filters.category) {
    whereClause.category = filters.category;
  }
  if (filters.priority && ['Low', 'Medium', 'High'].includes(filters.priority)) {
    whereClause.priority = filters.priority;
  }

  // Build the ORDER BY clause for sorting
  if (sortBy === 'deadline') {
    orderByClause.deadline = 'asc'; // Sort by the nearest deadline first
  } else if (sortBy === 'createdAt') {
    orderByClause.createdAt = 'desc'; // Sort by the newest task first
  }

  // Execute the query with the constructed clauses
  return prisma.task.findMany({
    where: whereClause,
    orderBy: orderByClause,
  });
};

/**
 * Updates an existing task by its ID.
 * @param {number} id - The ID of the task to update.
 * @param {object} taskData - An object containing the fields to update.
 * @returns {Promise<object>} The updated task object.
 */
const updateTask = async (id, taskData) => {
  return prisma.task.update({
    where: { id },
    data: taskData,
  });
};

/**
 * Deletes a task by its ID.
 * @param {number} id - The ID of the task to delete.
 * @returns {Promise<void>}
 */
const deleteTask = async (id) => {
  await prisma.task.delete({
    where: { id },
  });
};

module.exports = {
  createTask,
  getTaskById,
  getAllTasks,
  updateTask,
  deleteTask,
};
