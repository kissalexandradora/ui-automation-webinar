const express = require('express');
const mongoose = require('mongoose');


/**
 * Gives access to the .env file.
 */
require('dotenv/config');

/**
 * The app const gives the ability to create routes
 * with the help of express.
 *
 * @type {*|Express}
 */
const app = express();

app.get('/', (req, res) => {
    res.send('SUCCESS');
});

/**
 * Connect the server to the MongoDB Atlas database.
 */
mongoose.connect(
    /**
     * Use the database connection credentials from the .env file.
     * The useNewUrlParser is needed to avoid warnings.
     */
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => {
    console.log('Connected to database.');
});

/**
 * Specifies the port.
 * You can access the server through the http://localhost:PORT/ url.
 * @type {number}
 */
const PORT = 3000;
app.listen(PORT);