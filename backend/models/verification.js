// models/Verification.js
import mongoose from 'mongoose';

const VerificationSchema = new mongoose.Schema({
  ownerAddress: { type: String, required: true },
  ownerName: { type: String, required: true },
  verifiedAt: { type: Date, default: Date.now }
});

const Verification = mongoose.model('Verification', VerificationSchema);

export default Verification 
