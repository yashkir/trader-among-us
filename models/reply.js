const mongoose = require("mongoose");

const replySchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  itemsOffered: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model("reply", replySchema)