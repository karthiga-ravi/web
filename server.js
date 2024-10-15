const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todoDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the Task schema and model
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true }
});

const Task = mongoose.model('Task', taskSchema);

// POST route to add a new task to the database
app.post('/tasks', async (req, res) => {
  const { title } = req.body;
  try {
    const newTask = new Task({ title });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Failed to add task:', error);
    res.status(400).json({ error: 'Failed to add task' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
