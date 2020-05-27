const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    days: [{
        name: {
            type: String,
            required: true
        },
        lessons: [{
            subject: {
                type: String,
                required: true
            },
            time: {
                type: Number,
                required: true
            },
            duration: {
                type: Number,
                required: true
            }
        }]
    }]
})

module.exports = mongoose.model('Subject', subjectSchema)