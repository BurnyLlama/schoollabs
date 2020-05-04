const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 64
    },
    schedules: {
        type: Array,
        required: false
    },
    subjects: {
        type: Array,
        required: false
    },
    calendar: {
        type: Array,
        required: false
    }
});

module.exports = mongoose.model('Group', groupSchema);