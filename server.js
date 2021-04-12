const express = require('express');
const fs = require('fs');
const path = require('path');
const noteData = require('./db/db');

// use Express.js
const app = express();
const PORT = process.env.PORT || 3000;

// data parsing setup for Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes for api and html
// require('./routes/routes')(app);

// Load page and start with index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Open notes.html file 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// API routes (GET, POST, and DELETE) //

// GET & Post in one function because they use the same route //
app.route('/api/notes')
.get(function(req, res) {
    res.json(noteData);
})

    .post(function(req, res) {
        let filePath = path.join(__dirname, 'db/db.json');
        let newNote = req.body;

        // Set a test id value //
        let testId = 0;
        for (let i = 0; i < noteData.length; i++) {
            let individualNote = noteData[i];

            if(individualNote > noteData[i]) {
                testId = individualNote.id;
            }
        }

        newNote.id = testId + 1;
        noteData.push(newNote)

        fs.writeFile(filePath, JSON.stringify(noteData), (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('Note Saved!');
        });
        res.json(newNote);
    });

// Delete note by indentifying id of saved notes//remove from db.json //
app.delete('/api/notes/:id', (req, res) => {
// file location to delete note from users saved notes //
    let filePath = (__dirname, './db/db.json');

    for (let i = o; i < noteData.length; i++) {

        if(noteData[i].id == req.params.id) {
            noteData.splice(i, 1);
            break;
        }
    }
    fs.writeFileSync(filePath, JSON.stringify(noteData), (err) => {

        // if statement to confirm note was deleted or prompt that an error occured //
        if (err) {
            return console.log(err);
        } else {
            console.log('/nNote was deleted!');
        }
    });
    res.json(noteData);
})

app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`));