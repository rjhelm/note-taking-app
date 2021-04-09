const express = require('express');
const fs = require('fs');
const path = require('path');
// const database = require('./db/db');

const app = express();
const PORT = process.env.PORT || 3000;

// data parsing setup for Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes for api and html
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`));