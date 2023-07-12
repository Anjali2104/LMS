const express = require('express');
const { registerUser, loginUser, logoutUser, getUser } = require('../controllers/user.controller');
const router = express.Router();

router.post('/register' , registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/me',getUser);

module.exports = router;