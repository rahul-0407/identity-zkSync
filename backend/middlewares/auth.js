import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { ErrorHandler } from './error.js';

// OPTION A: JWT Token Authentication
export const authenticateUser = async (req, res, next) => {
  try {
    // Get token from Authorization header
    // console.log("hii")
    const {token} = req.cookies;
    // console.log("hello")
    // console.log(token)
    if (!token) {
      return next(new ErrorHandler('Access token required', 401));
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database
    const user = await User.findById(decoded.userId);
    if (!user) {
      return next(new ErrorHandler('User not found', 404));
    }
    // console.log(user)

    // Add user info to request object
    req.user = user;
    req.userId = user._id;
    req.walletAddress = user.walletAddress;
    req.userDID = user.userDID;

    next();
  } catch (error) {
    console.log(error)
    if (error.name === 'JsonWebTokenError') {
      return next(new ErrorHandler('Invalid token', 401));
    }
    if (error.name === 'TokenExpiredError') {
      return next(new ErrorHandler('Token expired', 401));
    }
    next(new ErrorHandler('Authentication failed', 401));
  }
};