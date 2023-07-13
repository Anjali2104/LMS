import express from 'express';

import { registerUser, loginUser ,logoutUser ,getProfile } from '../controllers/user.controller';

import isLoggedIn from '../middlewares/auth.middleware';

const router = express.Router();
router.post('/register' , registerUser);
router.post('/login', loginUser);
router.get('/logout', isLoggedIn , logoutUser);
router.get('/me', getProfile);

export default router;
