const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ensure that html document loads with appropriate styles and js from the public directory
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// get notes.html file in public directory
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// get db.json file and return saved notes
app.get()

app.listen(PORT, function () {
    console.log('App is listening on http://localhost: ' + PORT);
});