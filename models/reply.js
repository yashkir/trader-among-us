const mongoose = require("mongoose");

const replySchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  itemsOffered: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model("Reply", replySchema);
