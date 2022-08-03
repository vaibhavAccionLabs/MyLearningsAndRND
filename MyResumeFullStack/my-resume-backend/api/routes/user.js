const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const {
  signupController,
  login,
  refreshToken,
  getUsers,
  deleteUsers
} = require('../controllers/auth-controller');

router.post('/signup', signupController);

router.post('/login', login);

router.post('/refresh-token', refreshToken);

router.get('/', checkAuth, getUsers);
router.delete('/:userId', checkAuth, deleteUsers);

module.exports = router;
