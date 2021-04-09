const fs = require('fs');
const path = require('path');

// Give each note a unique id in order to delete note at a later time
// const { v4: uuidv4 } = require('uuid');

// Route handling
module.exports = app => {

    fs.readFile('db/db.json', function (err, data) {
        if (err) throw err;
        let notes = JSON.parse(data);

        // API routes //
        app.get('/api/notes', (req, res) => {
            res.json(notes);
        });

        app.post('/api/notes', (req, res) => {
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log(`New note: ${newNote.title}`);
        });

        app.get('api/notes/:id', (req, res) => {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log(`Deleted note: ${req.params.id}`);
        });

        app.get('/notes', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/notes.html'));
        });

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/index.html'));
        });

        function updateDb() {
            fs.writeFile('db/db.json', JSON.stringify(notes, '/t'), err => {
                if (err) throw err;
                return true;
            });
        }
    });
    
    // app.get('/api/notes', (req, res) => {
    //     console.log('Executing GET notes request');

    //     let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

    //     console.log('GET request returning notes data: ' + JSON.stringify(data));
    //     res.json(data);
    // });
    // API Post request
    // app.post('/api/notes', (req, res) => {
    //     const newNote = request.body;
    //     console.log('POST request - New Note: ' + JSON.stringify(newNote));

    //     //assign the new note a unigue id
    //     newNote.id = uuidv4();

    //     // Give ability to read data fron db.json
    //     let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    //     data.push(newNote);

    //     fs.writeFileSync('./db/db.json', JSON.stringify(data));

    //     console.log('You have succesfully added your new note!');

    //     res.json(data);
    // });

    // app.delete('/api/notes/:id', (req, res) => {
    //     let noteId = request.params.id.toString();
    //     console.log(`Delete note request for noteId: ${noteID}`);

    //     let data = JSON.parse(fs.writeFileSync('./db/db.json', 'utf8'));
    //     const newData = data.filter( note => note.id.toString() !== noteId);

    //     fs.writeFileSync('./db/db.json', JSON.stringify(newData));
    //     console.log(`Succesfully deleted note with id: ${newData}`);

    //     res.json(newData);
    // });

}