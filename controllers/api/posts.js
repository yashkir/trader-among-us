const Post = require('../../models/post')

async function index(req, res) {
  try {
    const posts = await Post.find({})
    res.json(posts);
  } catch (err) {
    res.status(400).json("database query failed");
  }
}

async function show(req, res) {
  try {
    const post = await Post.findById(req.params.postId)
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json("database query failed");
  }
}

async function create(req, res) {
  try {
    const newPost = await Post.create(req.body)
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json("database query failed");
  }
}

async function update(req, res) {
  try {
    const result = await Post.update({_id: req.params.postId}, req.body)
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json("database query failed");
  }
}

async function _delete(req, res) {
  try {
    const result = await Post.deleteOne({_id: req.params.postId})
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json("database query failed");
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  delete: _delete,
}
