const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Subject', subjectSchema)