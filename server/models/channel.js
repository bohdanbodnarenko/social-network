const mongoose = require("mongoose");
const {
    ObjectId
} = mongoose.Schema;

const channelSchema = new mongoose.Schema({
    participants: [{
        type: Objectid,
        ref: 'User'
    }],
    messages: [{
        sender: {
            type: Objectid,
            ref: 'User'
        },
        content: {
            type: String,
            required: "Content is required"
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        created: {
            type: Date,
            default: Date.now
        }
    }]

})

module.exports = mongoose.model("Channel", postSchema);