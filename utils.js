'use strict'

class Utils {
    static getRandomData(data) {
        return data[Math.floor(Math.random() * data.length)];
    }
}

module.exports = Utils;