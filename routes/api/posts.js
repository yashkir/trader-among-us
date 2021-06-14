const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/api/posts');
const authenticate = require('../../helpers/authenticate');

router.get('/', postsCtrl.index);
router.get('/:postId', postsCtrl.show);
router.get('/:postId/replies', postsCtrl.indexReplies);

// Routes below this will have access to req.user, if the token is
// not present or invalid a 403 Forbidden will be returned.
router.use(authenticate);

router.post('/', postsCtrl.create);
router.post('/:postId', postsCtrl.update);
router.post('/:postId/delete', postsCtrl.delete);
router.post('/:postId/reply', postsCtrl.createReply);

module.exports = router;
