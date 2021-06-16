const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');

router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);
router.get('/:id/items', usersCtrl.showItem);
module.exports = router;
