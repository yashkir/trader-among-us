const mongoose = require("mongoose");

const dealSchema = mongoose.Schema({
  reply: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reply",
  },
  posterHasConfirmed: {
    type: Boolean,
    default: false,
  },
  replierHasConfirmed: {
    type: Boolean,
    default: false,
  },
  messages: [{
    type: String,
  }]
}, {
  timestamps: true,
});

module.exports = mongoose.model("Deal", dealSchema);
