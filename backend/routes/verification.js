// routes/verificationRoutes.js
import express from 'express';
import { getVerifications, addVerification,logScannedQr } from '../controllers/verification.js';

const verificationRouter = express.Router();

verificationRouter.get('/', getVerifications);
verificationRouter.post('/', addVerification);
verificationRouter.post('/log-qr', logScannedQr);

export default verificationRouter;
