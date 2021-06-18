const Item = require('../../models/item');
const debug = require("debug")("api");
const Post = require('../../models/post');

async function create(req, res) {
  try {
    debug("got file", req.file);

    req.body.user = req.user._id;

    if (process.env.USE_S3) {
      req.body.image = req.file.location;
    } else {
      req.body.image = "/" + req.file.filename;
    }

    const newItem = await Item.create(req.body);
    res.status(200).json(newItem);
  } catch (err) {
    debug(err);
    res.status(500).json("Item creation failed");
  }
}

async function _delete(req, res) {
  try {
    let item = await Item.findById(req.params.itemId);
    
    if (req.user._id !== String(item.user._id)) {
      return res.status(403).json({
        message: "Delete failed. You are not the owner of this item."
      });
    }

    const result = await Item.deleteOne({_id: req.params.itemId});
    return res.status(200).json(result);
    
  } catch (err) {
    debug(err);
    return res.status(500).json("Delete Failed. Internal Error.");
  }
}

module.exports = {
  create,
  delete: _delete,
};
