const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const {
  getProfileController,
  postProfileController,
  patchProfileController,
  deleteProfileController
} = require('../controllers/profile-controller');

//check for valid auth middleware
router.use(checkAuth);

// Profile Get route
router.get('/', getProfileController);

// Profile create route
router.post('/', postProfileController);

// Profile update route
router.patch('/:Id', patchProfileController);

// delete profile route
router.delete('/:profileId', deleteProfileController);

module.exports = router;
