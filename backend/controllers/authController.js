import User from "../models/user.js";
import { sendCookies } from "../utils/sendCookie.js";
import { ErrorHandler } from "../middlewares/error.js";

// Connect wallet and create/get user space
export const connectWallet = async (req, res, next) => {
  try {
    const { walletAddress } = req.body;

    if (!walletAddress) {
      return next(new ErrorHandler("Wallet address is required", 400));
    }

    // Check if user already exists
    let user = await User.findOne({ walletAddress });

    if (!user) {
      user = new User({
        walletAddress
      });

      await user.save();
      console.log("New user created:", user);
    } else {
      // Update last login
      user.lastLogin = new Date();
      await user.save();
      console.log("Existing user logged in:", walletAddress);
    }

    // OPTION A: Generate JWT token for authentication

    const data = {
      userId: user._id,
      walletAddress: user.walletAddress,
    };

    sendCookies(data, res, 200, user);
  } catch (error) {
    console.error("Connect wallet error:", error);
    next(new ErrorHandler("Failed to connect wallet", 500));
  }
};

// Create Web3.Storage space for user
// const createUserSpace = async (walletAddress) => {
//   try {
//     const client = await create();

//     // Create space with wallet address identifier
//     const spaceName = `user-${walletAddress.slice(2, 8)}`;
//     const space = await client.createSpace(spaceName);
//     const userDID = space.did();

//     console.log(`Created space for ${walletAddress}: ${userDID}`);

//     return { userDID, spaceName };
//   } catch (error) {
//     console.error("Failed to create user space:", error);
//     throw new ErrorHandler("Failed to create storage space", 500);
//   }
// };
