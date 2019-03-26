const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Title is required",
        min: 4,
        max: 150
    },
    body: {
        type: String,
        required: "Body is required",
        min: 4,
        max: 2000
    },
})

module.exports = mongoose.model('Post', postSchema);