const mongoose = require("mongoose");

const dealSchema = mongoose.Schema({
  reply: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reply",
  },
  posterHasConfirmed: {
    type: Boolean,
  },
  replierHasConfirmed: {
    type: Boolean,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("deal", dealSchema)
