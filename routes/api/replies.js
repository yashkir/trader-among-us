const express = require("express");
const router = express.Router();
const repliesCtrl = require("../../controllers/api/");

router.get("/", repliesCtrl.index);
