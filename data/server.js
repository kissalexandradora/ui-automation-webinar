const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
/**
 * Gives access to the .env file.
 */
require('dotenv/config');

/**
 * Import routes.
 */
const jobSearchDetailsRoute = require('./routes/testData/jobSearchDetails');

/**
 * The app const gives the ability to create routes
 * with the help of express.
 *
 * @type {*|Express}
 */
const app = express();

/**
 * Converts all the post data to JSON.
 */
app.use(bodyParser.json());

/**
 * With the use middleware the /testData/jobSearchDetails route uses the jobSearchDetailsRoute.
 */
app.use('/testData/jobSearchDetails', jobSearchDetailsRoute);

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
 * You can access the server through the http://localhost:3000/ url.
 * @type {number}
 */
app.listen(3000);