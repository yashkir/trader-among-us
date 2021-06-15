const Post = require('../../models/post');
const Reply = require('../../models/reply');
const Deal = require('../../models/deal');
const debug = require("debug")("api");

async function index(req, res) {
  try {
    const posts = await Post.find({})
      .populate("author", "name");
    res.json(posts);
  } catch (err) {
    res.status(400).json("database query failed");
  }
}

async function show(req, res) {
  try {
    const post = await Post.findById(req.params.postId)
      .populate("author", "name")
      .populate({
        path: "replies", populate: {
          path: "author", select: "name",
        }});
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json("database query failed");
  }
}


async function create(req, res) {
  try {
    req.body.author = req.user._id;
    const newPost = await Post.create(req.body);
    res.status(200).json(newPost);
  } catch (err) {
    debug(err);
    res.status(400).json("post creation failed");
  }
}

async function update(req, res) {
  try {
    let post = await Post.findById(req.params.postId);

    // Here we have to cast the author._id object to a String before comparing
    // We could also just add author to the query above, same result.
    if (req.user._id !== String(post.author._id)) {
      return res.status(403).json({
        message: "Update failed. You are not the author of this post."
      });
    }

    const result = await Post.updateOne({ _id: req.params.postId }, req.body);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json("Update failed. Internal error.");
  }
}

async function _delete(req, res) {
  try {
    let post = await Post.findById(req.params.postId);

    if (req.user._id !== String(post.author._id)) {
      return res.status(403).json({
        message: "Delete failed. You are not the author of this post."
      });
    }

    const result = await Post.deleteOne({ _id: req.params.postId });
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json("Delete Failed. Internal Error.");
  }
}

/* FIXME This may be redundant as we already have the index() but let's
 * leave it here in case we need it. */
async function indexReplies(req, res) {
  try {
    const post = await Post.findById(req.params.postId).populate('replies');
    res.status(200).json(post.replies);
  } catch (err) {
    debug(err);
    res.status(500).json("Unable to index Replies.");
  }
}

async function createReply(req, res) {
  try {
    req.body.author = req.user._id;
    let post = await Post.findById(req.params.postId);
    const newReply = await Reply.create(req.body);

    post.replies.push(newReply);
    await post.save();

    res.status(200).json(newReply);
  } catch (err) {
    debug(err);
    res.status(500).json("Reply creation failed.");
  }
}

/* Deals */

async function indexDeals(req, res) {
  try {
    const post = await Post.findById(req.params.postId)
      .populate("deals");
    res.json(post.deals);
  } catch (err) {
    debug(err);
    res.status(500).json("database query failed");
  }
}

async function createDeal(req, res) {
  try {
    const post = await Post.findById(req.params.postId);
    const reply = await Reply.findById(req.params.replyId);

    if (req.user._id !== String(post.author._id)) {
      return res.status(403).json({
        message: "Deal failed. You are not the author of this post."
      });
    }

    const deal = await Deal.create({ reply });
    post.deal = deal;

    post.deals.push(deal);
    await post.save();
    await deal.save();

    res.status(200).json(deal);
  } catch (err) {
    debug(err);
    res.status(500).json("Deal creation failed.");
  }
}

async function confirmDeal(req, res) {
  try {
    const post = await Post.findById(req.params.postId)
      .populate("author")
      .populate("deals");

    const reply = await Reply.findById(req.params.replyId)
      .populate("author");

    // FIXME there may be a better way of doing the below query
    const deal = post.deals.find(deal => {
      return deal.reply == String(reply._id);
    });

    if (req.user._id === String(post.author._id)) {
      deal.posterHasConfirmed = true;
    } else if (req.user._id === String(reply.author._id)) {
      deal.replierHasConfirmed = true;
    } else {
      return res.status(403).json({
        message: "Update failed. You are not the author of this post or the author of the reply."
      });
    }

    await deal.save();

    return res.status(200).json("Deal confirmed.");
  } catch (err) {
    debug(err);
    return res.status(500).json("Update failed. Internal error.");
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  delete: _delete,
  indexReplies,
  createReply,
  indexDeals,
  createDeal,
  confirmDeal,
};
