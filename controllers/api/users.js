const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const secret = process.env.SECRET;

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
};
