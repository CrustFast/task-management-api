/**
 * @file Integration tests for the /tasks API endpoint.
 * This file tests all CRUD operations and edge cases.
 */

const request = require('supertest');
const express = require('express');
const taskRoutes = require('../src/api/routes/taskRoutes'); 

// Create a reusable Express app instance for testing
const app = express();
app.use(express.json());
app.use('/tasks', taskRoutes);

// A variable to hold the ID of a newly created task for subsequent tests
let createdTaskId;

describe('Tasks API', () => {

  describe('POST /tasks', () => {
    it('should create a new task successfully with valid data', async () => {
      const newTask = {
        title: 'Test Task from Jest',
        description: 'This is a test description.',
        category: 'Testing',
        priority: 'Medium',
        deadline: '2026-01-01T00:00:00.000Z',
      };

      const response = await request(app)
        .post('/tasks')
        .send(newTask);

      expect(response.statusCode).toBe(201);
      expect(response.body.title).toBe(newTask.title);
      expect(response.body).toHaveProperty('id');
      
      // Store the new ID for use in other tests
      createdTaskId = response.body.id;
    });

    it('should fail to create a task with invalid data', async () => {
      const invalidTask = {
        title: '', // Invalid: empty title
        priority: 'Urgent', // Invalid: not in enum
      };

      const response = await request(app)
        .post('/tasks')
        .send(invalidTask);

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors).toBeInstanceOf(Array);
    });
  });

  describe('GET /tasks', () => {
    it('should fetch all tasks successfully', async () => {
      const response = await request(app).get('/tasks');

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('GET /tasks/:id', () => {
    it('should fetch a single task by its ID', async () => {
      const response = await request(app).get(`/tasks/${createdTaskId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(createdTaskId);
    });

    it('should return 404 if the task ID does not exist', async () => {
      const nonExistentId = 99999;
      const response = await request(app).get(`/tasks/${nonExistentId}`);

      expect(response.statusCode).toBe(404);
    });
  });

  describe('PUT /tasks/:id', () => {
    it('should update a task successfully', async () => {
      const updatedData = {
        title: 'Updated Task Title',
        priority: 'Low',
      };

      const response = await request(app)
        .put(`/tasks/${createdTaskId}`)
        .send(updatedData);

      expect(response.statusCode).toBe(200);
      expect(response.body.title).toBe(updatedData.title);
      expect(response.body.priority).toBe(updatedData.priority);
    });
  });

  describe('DELETE /tasks/:id', () => {
    it('should delete a task successfully', async () => {
      const response = await request(app).delete(`/tasks/${createdTaskId}`);

      expect(response.statusCode).toBe(204);
    });

    it('should return 404 when trying to fetch the deleted task', async () => {
      const response = await request(app).get(`/tasks/${createdTaskId}`);
      
      expect(response.statusCode).toBe(404);
    });
  });
});
