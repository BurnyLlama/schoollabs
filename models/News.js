const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 2,
        max: 64
    },
    content: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: false
    }//,
    //recievers: {
    //    type: Array,
    //    required: false
    //}
});

module.exports = mongoose.model('News', newsSchema);