const express = require('express');

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
 * Specifies the port.
 * You can access the server through the http://localhost:PORT/ url.
 * @type {number}
 */
const PORT = 3000;
app.listen(PORT);