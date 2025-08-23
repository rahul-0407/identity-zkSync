import jwt from "jsonwebtoken";

export const sendCookies = async (data, res, statusCode, user) => {
  try {
    const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "7d" });

    const isDevelopment = process.env.NODE_ENV !== "production";

    res
      .status(statusCode)
      .cookie("token", token, {
        httpOnly: false, // Try with false first to test
            sameSite: "Lax", // Always use Lax for localhost
            secure: false, // Always false for localhost HTTP
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            domain: undefined,
      })
      .json({
        success: true,
        user: {
          id: user._id,
          walletAddress: user.walletAddress,
          spaceName: user.spaceName,
        },
        token, // Send token to frontend
      });

      // console.log("Cookie set with token:", token.substring(0, 20) + "...");

    // console.log(cookies)
  } catch (error) {
    console.log(error);
  }
};
