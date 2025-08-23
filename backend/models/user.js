import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  walletAddress: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  lastLogin: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model('User', userSchema);