const Reply = require("../../models/reply");

function index(req, res) {
  res.send("reply index");
}

module.exports = {
  index,
};
