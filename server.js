const express = require('express');
const fs = require('fs');
const path = require('path');
const notesData = require('./db/db');

// use Express.js
const app = express();
const PORT = process.env.PORT || 3000;
const router = express.Router();

// data parsing setup for Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes for api and html
// require('./routes/routes')(app);

// Load page and start with index.html
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Open notes.html file 
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// API routes (GET, POST, and DELETE) //

// GET & Post in one function because they use the same route //
app.route('api/notes')
.get(function(req, res) {
    res.json(notesData);
})

    .post(function(req, res) {
        let filePath = path.join(__dirname, 'db/db.json');
        let newNote = req.body;
    })
// GET and POST in same function because they are using the same route to the data //
// app.route('/api/notes')
//     .get(function(req, res) {
//         res.json(notesData);
//     })

//     .post(function(req, res) {
//         let filePath = path.join(__dirname, '/db/db.json');
//         let newNote = req.body;

//         let testId = 99;
//     for (let i = 0; i < notesData.length; i++) {
        
//             let individualNote = notesData[i];

//         if (individualNote.id > notesData[i]) {
//             testId = individualNote.id;
//         }
//     }

//         newNote.id = testId + 1;
//         notesData.push(newNote)

//     fs.writeFile(filePath, JSON.stringify(notesData), (err) => {
//         if (err) {
//             return console.log(err);
//         }
//         console.log('Note saved!');
//     });
//         res.json(newNote);
// });

// // DELETE users note based on id without causing issues with saved notes and the data inside db.json //
// app.delete('/api/notes/:id', (req, res) => {
//     let filePath = path.join(__dirname, './db/db.json');

//     for (let i = 0; i < notesData.length; i++) {
//         if (notesData[i].id == req.params.id) {
//             notesData.splice(i, 1);
//             break;
//         }
//     }
//     fs.writeFileSync(filePath, JSON.stringify(notesData), (err) => {
//         if (err) {
//             return console.log(err);
//         } else {
//             console.log('/nNote deleted');
//         }
//     });
//     res.json(notesData);
// });

app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`));