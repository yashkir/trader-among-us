const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/api/posts');

router.get('/', postsCtrl.index);
router.get('/:postId', postsCtrl.show);

router.post('/', postsCtrl.create);
router.post('/:postId', postsCtrl.update);
router.post('/:postId/delete', postsCtrl.delete);

module.exports = router;
