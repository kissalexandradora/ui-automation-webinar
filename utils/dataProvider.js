exports.getRandomData = data => {
    return data[Math.floor(Math.random() * data.length)];
}