const fs = require('fs');

// Give each note a unique id in order to delete note at a later time
const { v4: uuidv4 } = require('uuid');

// Route handling
module.exports = app => {
    
    app.get('/api/notes', (req, res) => {
        console.log('/n/nExecuting GET notes request');

        let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

        console.log('/nGET request returning notes data: ' + JSON.stringify(data));
        response.json(data);
    });
    // API Post request
    app.post('/api/notes', (req, res) => {
        const newNote = request.body;
        console.log('POST request - New Note: ' + JSON.stringify(newNote));

        //assign the new note a unigue id
        newNote.id = uuidv4();

        // Give ability to read data fron db.json
        let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
        data.push(newNote);

        fs.writeFileSync('./db/db.json', JSON.stringify(data));
    })
}