// App dependencies //
const express = require('express');
const fs = require('fs');
const path = require('path');
const noteData = require('./db/db');

// Sets up Express app for our backend //
const app = express();
const PORT = process.env.PORT || 3000;

// Data parsing || API calls || Link to assets //
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// HTML routes for index.html and notes.html for initial loadup //
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// GET, POST, and DELETE API Routes //

// Route uses the same JSON file to GET and POST so they are included together //
// GET notes stored in JSON file
app.route('/api/notes')
.get(function(req, res) { // GET function for our notes, this will update when a note is saved or deleted //
    res.json(noteData);
})
// POST function, gives us the ability to add our notes to the json file //
    .post(function(req, res) {
        let filePath = path.join(__dirname, 'db/db.json');
        let newNote = req.body;

        // Original note will be this test note with this id and allows new notes to have unique id //
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