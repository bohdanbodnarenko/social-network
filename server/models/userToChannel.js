const mongoose = require("mongoose");
const {
    ObjectId
} = mongoose.Schema;

const userToChannelSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    channel: {
        type: ObjectId,
        ref: 'Channel'
    },
})

module.exports = mongoose.model("UserToChannel", userToChannelSchema);