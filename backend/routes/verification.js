// routes/verificationRoutes.js
import express from 'express';
import { getVerifications, addVerification } from '../controllers/verification.js';

const verificationRouter = express.Router();

verificationRouter.get('/', getVerifications);
verificationRouter.post('/', addVerification);

export default verificationRouter;
