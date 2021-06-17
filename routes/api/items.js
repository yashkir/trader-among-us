const express = require('express');
const router = express.Router();
const itemsCtrl = require('../../controllers/api/items');
const authenticate = require('../../helpers/authenticate');
const multer = require('multer');

// S3
if (process.env.USE_S3) {
  var aws = require('aws-sdk');
  var multerS3 = require('multer-s3');
  var s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    endpoint: process.env.AWS_ENDPOINT,
  });
  var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_STORAGE_BUCKET_NAME,
      metadata: function(req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString());
      },
      acl: 'public-read',
    })
  });
} else {
  var upload = multer({ dest: 'uploads/' });
}

router.use(authenticate);

router.post('/', upload.single('image'), itemsCtrl.create);
router.post('/:itemId/delete', itemsCtrl.delete);


module.exports = router;
