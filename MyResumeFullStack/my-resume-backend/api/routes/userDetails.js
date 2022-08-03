const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const upload = require('../middleware/upload');

const {
  getUserDetailController,
  postUserDetailController,
  patchUserDetailController,
  deleteUserDetailController
} = require('../controllers/user-detail-controller');

router.get('/', getUserDetailController);

router.post('/', checkAuth, postUserDetailController);

// # add middleware for uploading user image
//upload.single('userimage'),
/*
 # multiple file upload configurations
 # upload.array('userimage', 3),
 # Multifield upload
 # upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
*/
router.patch(
  '/:userId',
  checkAuth,
  upload.fields([{ name: 'userimage', maxCount: 1 }]),
  patchUserDetailController
);

router.delete('/:userId', checkAuth, deleteUserDetailController);

module.exports = router;
