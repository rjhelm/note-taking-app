const { response } = require('express');
const path = require('path');

module.exports = app => {
    app.get('/notes', (res, req) => {
        response.sendFile(path.join(__dirname, '../public/notes.html'));
    });
}
