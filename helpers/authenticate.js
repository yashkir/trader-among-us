const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

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
    token.replace("Bearer ", "");

    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json({ message: "Invalid token." });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } else {
    next();
  }
}

module.exports = authenticate;
