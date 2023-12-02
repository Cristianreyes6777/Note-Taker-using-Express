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
const dbJson = JSON.parse(fs.readFileSync("db/db.json","utf8"));
  const newFeedback = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };
  dbJson.push(newFeedback);
  fs.writeFileSync("db/db.json",JSON.stringify(dbJson));
  res.json(dbJson);
});

// Delete a note by ID
router.delete('/api/notes/:id', (req, res) => {
    let data = fs.readFileSync("db/db.json", "utf8");
    const dataJSON =  JSON.parse(data);
    const newNotes = dataJSON.filter((note) => { 
      return note.id !== req.params.id;
    });
    fs.writeFileSync("db/db.json",JSON.stringify(newNotes));
    res.json("Note deleted.");
  });
module.exports = router;
