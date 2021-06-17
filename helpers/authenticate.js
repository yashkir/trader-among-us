const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const debug = require('debug')('auth');
const User = require("../models/user");

/**
 * Middleware that checks for a json web token and adds a user object to the
 * request if the token is valid.
 *
 * In case of error returns a 403 Forbidden with a json message. Since we are
 * running an api server, this behaviour is sufficient.
 */
function authenticate(req, res, next) {
  let token = req.get("Authorization") || req.query.token || req.body.token;

  if (token) {
    token = token.replace("Bearer ", "");

    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        debug(err);
        res.status(403).json({ message: "Invalid token." });
      } else {
        User.findById(decoded.user._id)
          .then(user => {
            if (!user) {
              req.user = null;
            }
            req.user = decoded.user;
            next();
          })
          .catch(err => {
            res.status(500).json({ message: "Internal Error, unable to authenticate." });
          });
      }
    });
  } else {
    res.status(403).json({ message: "Token required." });
  }
}

module.exports = authenticate;
