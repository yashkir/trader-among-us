const User = require("../../models/user");
const Item = require("../../models/item");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const secret = process.env.SECRET;

async function showItem(req,res) {
  const userId = req.params.id;
  console.log(userId);
  try {
    const item = await Item.find({user: userId})
    res.status(200).json({item});
  }catch(err){
    res.status(400).json("Query failed")
  }
}

const create = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!(await bcrypt.compare(req.body.password, user.password))) throw new Error();
    const token = createJWT(user);

    res.status(200).json(token);
  } catch {
    res.status(400).json("Bad Credentials");
  }
}

function createJWT(user) {
  return jwt.sign({ user }, secret, { expiresIn: "24h" });
}

module.exports = {
  create,
  login,
  showItem,
};
