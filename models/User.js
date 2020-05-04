const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 64
    },
    email: {
        type: String,
        required: true,
        min: 2,
        max: 128
    },
    title: {
        type: String,
        required: true,
        min: 2,
        max: 32
    },
    theme: {
        type: String,
        required: false,
        default: "light",
        min: 2
    },
    pass: {
        type: String,
        required: true,
        min: 1,
        max: 1024
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
    },
    groups: {
        type: Array,
        required: false
    }
});

module.exports = mongoose.model('User', userSchema);