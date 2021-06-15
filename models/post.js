const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  deals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Deal",
  }],
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reply",
  }],
  itemsOffered: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model("Post", postSchema);
