const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/api/posts');
const authenticate = require('../../helpers/authenticate');

router.get('/', postsCtrl.index);
router.get('/:postId', postsCtrl.show);
router.get('/:postId/replies', postsCtrl.indexReplies);
router.get('/:postId/deals/', postsCtrl.indexDeals);

// Routes below this will have access to req.user, if the token is
// not present or invalid a 403 Forbidden will be returned.
router.use(authenticate);

router.post('/', postsCtrl.create);
router.post('/:postId', postsCtrl.update);
router.post('/:postId/delete', postsCtrl.delete);
router.post('/:postId/reply', postsCtrl.createReply);
router.post('/:postId/deals/:replyId', postsCtrl.createDeal);
router.post('/:postId/deals/:replyId/confirm', postsCtrl.confirmDeal);

module.exports = router;
