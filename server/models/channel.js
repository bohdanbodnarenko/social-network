const mongoose = require("mongoose");
const {
    ObjectId
} = mongoose.Schema;

const channelSchema = new mongoose.Schema({
    isPrivate: {
        type: Boolean,
        default: false
    },
    participants: [{
        type: ObjectId,
        ref: 'User'
    }],
    name: {
        type: String,
        default: ''
    },
    messages: [{
        sender: {
            type: ObjectId,
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
    }],
    messagesCount: {
        type: Number,
        default: 0
    }

})

module.exports = mongoose.model("Channel", channelSchema);