const express = require('express');
const router = express.Router();
const itemsCtrl = require('../../controllers/api/items');
const authenticate = require('../../helpers/authenticate');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.use(authenticate);

router.post('/', upload.single('image'), itemsCtrl.create);
router.post('/:itemId/delete', itemsCtrl.delete);

module.exports = router;
