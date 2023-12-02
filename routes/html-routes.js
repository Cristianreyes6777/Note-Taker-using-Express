const router = require('express').Router();
const path = require('path');

// Send 'index.html' as a response for the root URL
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Send 'notes.html' as a response for '/notes' URL
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

module.exports = router;
