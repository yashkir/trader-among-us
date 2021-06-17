const Post = require('../../models/post');
const Reply = require('../../models/reply');
const Deal = require('../../models/deal');
const debug = require("debug")("api");
const sockets = require("../../helpers/sockets");

async function index(req, res) {
  try {
    const posts = await Post.find({})
      .populate("author", "name")
      .populate({
        path: "itemsOffered"         
      });
    res.json(posts);
  } catch (err) {
    res.status(400).json("database query failed");
  }
}

async function show(req, res) {
  try {
    // TODO there may be a way to populate replies in one line
    const post = await Post.findById(req.params.postId)
      .populate("author", "name")
      .populate({
        path: "replies", populate: {
          path: "author", select: "name",
        }})
      .populate({
        path: "replies", populate: {
          path: "itemsOffered",
        }})
      .populate({path: "itemsOffered"});
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
    const foundDeal = await Deal.findOne({ reply: req.params.replyId });
    if (foundDeal) {
      return res.status(200).json(foundDeal);
    }

    const post = await Post.findById(req.params.postId);
    const reply = await Reply.findById(req.params.replyId);

    if (req.user._id !== String(post.author._id)) {
      return res.status(403).json({
        message: "Deal failed. You are not the author of this post."
      });
    }

    const deal = await Deal.create({ reply: reply._id });

    post.deals.push(deal);
    await post.save();

    res.status(200).json(deal);
  } catch (err) {
    debug(err);
    res.status(500).json("Deal creation failed.");
  }
}

async function checkIfDealDone(deal) {
  if (deal.posterHasConfirmed && deal.replierHasConfirmed) {
    const post = await Post.findOne({ deals: deal._id})
      .populate("itemsOffered");
    const reply = await Reply.findById(deal.reply)
      .populate("itemsOffered");

    // set all items to be sold, we are not handling locking of the Deal
    // it can stil be toggled TODO
    post.itemsOffered.forEach(item => {
      item.isSold = true;
      item.save();
    });

    reply.itemsOffered.forEach(item => {
      item.isSold = true;
      item.save();
    });

  }
}

async function confirmDealToggle(req, res) {
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
      deal.posterHasConfirmed = !deal.posterHasConfirmed;
      await deal.save();
      checkIfDealDone(deal);
    } else if (req.user._id === String(reply.author._id)) {
      deal.replierHasConfirmed = !deal.replierHasConfirmed;
      await deal.save();
      checkIfDealDone(deal);
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

async function showDealForReply(req, res) {
  try {
    const deal = await Deal.findOne({ reply: req.params.replyId });
    res.json(deal);
  } catch (err) {
    debug(err);
    res.status(500).json("database query failed");
  }
}

async function deleteDeal(req, res) {
  try {
    const deal = await Deal.findOne({ reply: req.params.replyId });
    const post = await Post.findById(req.params.postId)
      .populate("author")

    if (req.user._id !== String(post.author._id)) {
      return res.status(403).json({
        message: "Deal delete failed. You are not the author of this post."
      });
    }

    const result = await Deal.deleteOne({ _id: deal._id });
    return res.status(200).json(result);
  } catch (err) {
    debug(err);
    return res.status(500).json("Delete Failed. Internal Error.");
  }
}

async function showDealMessages(req, res) {
  // TODO add check for user for privacy
  try {
    const post = await Post.findById(req.params.postId)
      .populate("author")
    const reply = await Reply.findById(req.params.replyId)
      .populate("author");
    const deal = await Deal.findOne({ reply: req.params.replyId });

    if (req.user._id === String(post.author._id) || 
        req.user._id === String(reply.author._id))
    {
      res.status(200).json(deal.messages);
    } else {
      return res.status(403).json({
        message: "Messages retrieveal failed. You are not the author of this post or the author of the reply."
      });
    }
  } catch (err) {
    debug(err);
    res.status(500).json("database query failed");
  }
}

async function sendDealMessage(req, res) {
  try {
    const post = await Post.findById(req.params.postId)
      .populate("author")
    const reply = await Reply.findById(req.params.replyId)
      .populate("author");
    const deal = await Deal.findOne({ reply: req.params.replyId });

    if (req.user._id === String(post.author._id) || 
        req.user._id === String(reply.author._id))
    {
      deal.messages.push(req.user.name + ": " + req.body.message);
      await deal.save();

      // Inform anyone watching that we have a new message
      sockets.informNewMessages(deal._id, deal.messages);

      return res.status(200).json(deal.messages);
    } else {
      return res.status(403).json({
        message: "Send failed. You are not the author of this post or the author of the reply."
      });
    }
  } catch (err) {
    debug(err);
    res.status(500).json("database query failed");
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
  confirmDealToggle,
  showDealForReply,
  deleteDeal,
  showDealMessages,
  sendDealMessage,
};
