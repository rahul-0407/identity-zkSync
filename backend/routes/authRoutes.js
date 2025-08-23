import express from 'express';
import { connectWallet } from '../controllers/authController.js';

const authRouter = express.Router();

// Connect wallet and create/get user space
authRouter.post('/connectWallet', connectWallet);

export default authRouter;

