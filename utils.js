'use strict'

class Utils {
    static getRandomData(data) {
        const min = 0;
        return data[Math.floor(Math.random() * (data.length - min + 1)) + min];
    }
}

module.exports = Utils;