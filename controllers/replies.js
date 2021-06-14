const Reply = require('../../models/reply');

async function index(req, res) {
  try {
    const replys = await Reply.find({});
    res.json(replys);
  } catch (err) {
    res.status(400).json("database query failed");
  }
}

async function show(req, res) {
  try {
    const reply = await Reply.findById(req.params.replyId);
    res.status(200).json(reply);
  } catch (err) {
    res.status(404).json("database query failed");
  }
}

async function create(req, res) {
  try {
    req.body.author = req.user._id;
    const newReply = await Reply.create(req.body);
    res.status(200).json(newReply);
  } catch (err) {
    res.status(400).json("reply creation failed");
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
    return res.status(500).json("Delete Failed. Internal Error.");
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  delete: _delete,
};
