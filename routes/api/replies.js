const express = require("express");
const router = express.Router();
const repliesCtrl = require("../../controllers/api/replies");
<<<<<<< HEAD

router.get("/", repliesCtrl.create);
=======
const authenticate = require("../../helpers/authenticate");

router.get("/:replyId", repliesCtrl.show);

// Routes below this will have access to req.user, if the token is
// not present or invalid a 403 Forbidden will be returned.
router.use(authenticate);

router.post("/:replyId", repliesCtrl.update);
router.post("/:replyId/delete", repliesCtrl.delete);
>>>>>>> 04fc31b6f0f8f991c8c994de097e939367c38dfc

module.exports = router;
