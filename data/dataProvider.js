const fetch = require('node-fetch');

/**
 * Fetches the data from the given url, with the help of fetch API.
 *
 * @returns {Promise<*>}
 */
const fetchTestData = async () => {
    try {
        const response = await fetch('http://localhost:3000/testData/jobSearchDetails');
        return response;
    } catch (error) {
        console.error(error);
    }
}

/**
 * Converts the data to JSON format.
 *
 * @returns {Promise<*>}
 */
const responseDataToJson = async () => {
    try {
        const data = await fetchTestData();
        const jsonData = await data.json();
        return jsonData;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Picks a random data from the data array, based on the array length.
 *
 * @returns {Promise<*>}
 */
exports.getRandomTestData = async () => {
    try {
        const jsonData = await responseDataToJson()
        return jsonData[Math.floor(Math.random() * jsonData.length)];
    } catch (error) {
        console.log(error);
    }
}
