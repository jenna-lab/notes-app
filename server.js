const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000; // You can change this port if needed

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://jensam209:OiSygtjSNbhzva37@cluster0.vxuaifq.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Note schema
const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Note = mongoose.model('Note', noteSchema);

// Middleware to parse JSON
app.use(express.json());

// Define routes
app.get('/notes', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post('/notes', async (req, res) => {
  const newNote = new Note({
    title: req.body.title,
    content: req.body.content,
  });
  await newNote.save();
  res.json(newNote);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
