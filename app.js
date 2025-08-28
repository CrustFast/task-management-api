const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const taskRoutes = require('./src/api/routes/taskRoutes');

// Middleware untuk membaca JSON dari body request
app.use(express.json());
app.use('/tasks', taskRoutes);

// Route sederhana untuk testing
app.get('/', (req, res) => {
  res.send('Task Management API is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});