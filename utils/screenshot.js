const fs = require('fs');
//const dayjs = require("dayjs");
const { toCamelCase }  = require("./stringFormatter");
const { getFormattedTime } = require("./date");


const writeScreenShot = (data, filename) => {
    const stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data, 'base64'));
    stream.end();
}
exports.takeScreenshot = async scenario => {
    const screenshot = await browser.takeScreenshot();
    await writeScreenShot(screenshot, `./reports/screenshots/${toCamelCase(scenario.pickle.name)}-${getFormattedTime()}.png`);
}
