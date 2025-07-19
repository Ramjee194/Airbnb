import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from 'crypto';

import { sendEmail } from '../utils/sendEmail.js';

// ✅ SIGNUP
export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log("Signup request body:", req.body);

        // ✅ Check if user already exists
        const existUser = await User.findOne({ email }).populate("listings", "title image1 image2 image3 description rent category city landMark");

        if (existUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 🔐 Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // 👤 Create new user
        const user = await User.create({ name, email, password: hashPassword });

        // 🪙 Generate token
        const token = genToken(user._id);

        // 🍪 Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // ✅ only secure in prod
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // ✅ adaptive
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // ✅ Response
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: `Signup error: ${error.message}` });
    }
};

// ✅ LOGIN
export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = genToken(user._id);

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });


    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
    });
};

// ✅ LOGOUT
export const logOut = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "Logged out successfully" });
};



export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    await sendEmail(user.email, 'Reset Your Password', `Click here to reset: ${resetLink}`);

    res.json({ message: 'Password reset link sent to email' });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: 'Token and new password are required' });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    // 💾 Save new password
    user.password = password; // make sure your model hashes it in pre-save hook
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({ message: 'Password reset successful. Please login.' });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({ message: 'Error resetting password', error: error.message });
  }
};
