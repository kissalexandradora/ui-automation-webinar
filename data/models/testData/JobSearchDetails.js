const mongoose = require('mongoose');

const JobSearchDetailsSchema = mongoose.Schema({
    country: {
        type: String,
        required: true
    },
    city:  {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    positionName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('JobSearchDetails', JobSearchDetailsSchema);