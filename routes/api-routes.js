const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const dbPath = 'db/db.json';

// Read the JSON data from the file
const readData = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Write the JSON data to the file
const writeData = (data) => fs.writeFileSync(dbPath, JSON.stringify(data));

// Get all notes
router.get('/api/notes', (req, res) => {
  const dbJson = readData();
  res.json(dbJson);
});

// Create a new note
router.post('/api/notes', (req, res) => {
  const dbJson = readData();
  const newFeedback = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };
  dbJson.push(newFeedback);
  writeData(dbJson);
  res.json(newFeedback);
});

// Delete a note by ID
router.delete('/api/notes/:id', (req, res) => {
  const dataJSON = readData();
  const newNotes = dataJSON.filter((note) => note.id !== req.params.id);
  writeData(newNotes);
  res.json("Note deleted.");
});

module.exports = router;
