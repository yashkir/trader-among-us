const express = require("express");
const router = express.Router();
const repliesCtrl = require("../../controllers/api/replies");
const authenticate = require("../../helpers/authenticate");

router.get("/:replyId", repliesCtrl.show);

// Routes below this will have access to req.user, if the token is
// not present or invalid a 403 Forbidden will be returned.
router.use(authenticate);

router.post("/:replyId", repliesCtrl.update);
router.post("/:replyId/delete", repliesCtrl.delete);

module.exports = router;
