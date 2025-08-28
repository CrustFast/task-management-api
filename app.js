/**
 * @file The main entry point for the Task Management API server.
 */

const express = require('express');
const taskRoutes = require('./src/api/routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Global Middleware ---
// This middleware parses incoming requests with JSON payloads.
app.use(express.json());

// --- API Routes ---
// All requests to '/tasks' will be handled by the taskRoutes module.
app.use('/tasks', taskRoutes);

// A simple root route to confirm that the API is running.
app.get('/', (req, res) => {
  res.send('Task Management API is running!');
});

// Start the server and listen for incoming requests on the specified port.
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
