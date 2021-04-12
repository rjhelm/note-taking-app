const express = require('express');
const router = express.Router();



// API routes (GET, POST, and DELETE) //

// GET and POST in same function because they are using the same route to the data //
app.route('/api/notes')
    .get(function(req, res) {
        res.json(database);
    })

    .post(function(req, res) {
        let filePath = path.join(__dirname, '/db/db.json');
        let newNote = req.body;

        let testId = 99;
    for (let i = 0; i < database.length; i++) {
        
            let individualNote = database[i];

        if (individualNote.id > database[i]) {
            testId = individualNote.id;
        }
    }

        newNote.id = testId + 1;
        database.push(newNote)

    fs.writeFile(filePath, JSON.stringify(database), (err) => {
        if (err) {
            return console.log(err);
        }
        console.log('Note saved!');
    });
        res.json(newNote);
});

// // DELETE users note based on id without causing issues with saved notes and the data inside db.json //
app.delete('/api/notes/:id', (req, res) => {
    let filePath = path.join(__dirname, './db/db.json');

    for (let i = 0; i < database.length; i++) {
        if (database[i].id == req.params.id) {
            database.splice(i, 1);
            break;
        }
    }
    fs.writeFileSync(filePath, JSON.stringify(database), (err) => {
        if (err) {
            return console.log(err);
        } else {
            console.log('/nNote deleted');
        }
    });
    res.json(database);
});

module.exports = route