const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: { //todo
    type: String,
  },
  description: {
    type: String,
  },
  isSold: {
    type: Boolean,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("item", itemSchema)
