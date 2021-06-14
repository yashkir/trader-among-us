const Reply = require("../../models/reply");
const debug = require("debug")("api");

async function show(req, res) {
  try {
    const reply = await Reply.findById(req.params.replyId);

    if (!reply) {
      return res.status(404).json("Reply not found");
    } else {
      return res.status(200).json(reply);
    }
  } catch (err) {
    debug(err);
    res.status(500).json("Can not get Reply");
  }
}

async function update(req, res) {
  try {
    let reply = await Reply.findById(req.params.replyId);

    // Here we have to cast the author._id object to a String before comparing
    // We could also just add author to the query above, same result.
    if (req.user._id !== String(reply.author._id)) {
      return res.status(403).json({
        message: "Update failed. You are not the author of this reply."
      });
    }

    const result = await Reply.updateOne({_id: req.params.replyId}, req.body);

    return res.status(200).json(result);
  } catch (err) {
    debug(err);
    return res.status(500).json("Update failed. Internal error.");
  }
}

async function _delete(req, res) {
  try {
    let reply = await Reply.findById(req.params.replyId);

    if (req.user._id !== String(reply.author._id)) {
      return res.status(403).json({
        message: "Delete failed. You are not the author of this reply."
      });
    }

    const result = await Reply.deleteOne({_id: req.params.replyId});

    return res.status(200).json(result);
  } catch (err) {
    debug(err);
    return res.status(500).json("Delete Failed. Internal Error.");
  }
}

module.exports = {
  show,
  update,
  delete: _delete,
};
