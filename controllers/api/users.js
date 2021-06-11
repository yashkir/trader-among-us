const User = require("../../models/user");
const jwt = require("jsonwebtoken");

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

function createJWT(user) {
  return jwt.sign({ user }, secret, { expiresIn: "24h" });
}

module.exports = {
  create,
};
