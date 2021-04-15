const fs = require('fs');

exports.writeScreenShot = (data, filename) => {
    const stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data, 'base64'));
    stream.end();
}