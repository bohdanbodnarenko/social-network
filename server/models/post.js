const mongoose = require("mongoose");
const {
  ObjectId
} = mongoose.Schema;
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
  photo: {
    data: Buffer,
    contentType: String
  },
  postedBy: {
    type: ObjectId,
    ref: "User"
  },
  created: {
    type: Date,
    default: Date.now
  },
  likes: [{
    type: ObjectId,
    ref: "User"
  }],
  comments: [{
    text: String,
    created: {
      type: Date,
      default: Date.now
    },
    postedBy: {
      type: ObjectId,
      ref: "User"
    }
  }],
  commentsCount: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Post", postSchema);