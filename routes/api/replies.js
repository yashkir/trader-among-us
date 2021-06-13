const express = require("express");
const router = express.Router();
const repliesCtrl = require("../../controllers/api/replies");

router.get("/", repliesCtrl.create);

module.exports = router;
