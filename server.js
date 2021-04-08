const express = require('express');
const fs = require('fs');
const path = require('path');
const database = require('./db/db');

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
// app.get('/api/notes', (req, res) => {
//     res.sendFile(path.join(__dirname, '/db/db.json'));
// });

// route user to main page otherwise
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.route('/api/notes')
.get((req, res) => {
    let jsonFilePath = path.join(__dirname, "/db/db.json");
    let newNote = req.body;

    let originalId = 99;
    for (let i = 0; i < database.length; i++) {
        let individualNote = database[i];

        if (individualNote.id > originalId) {
            originalId = individualNote.id;
        }
    }

    newNote.id = highestId + 1;
    database.push(newNote);

    fs.writeFileSync(jsonFilePath, JSON.stringify(database),(err) => {
        if(err) {
            return console.log(err);
        }
        console.log('Your note was saved!');
    });
});

app.listen(PORT, () => console.log('Server listening on port: ' + PORT));