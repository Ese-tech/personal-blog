import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User";
import { verifyToken } from "../middleware/verifyToken";
const router = express.Router();
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!email || !password || !username)
            return res.status(400).json({ message: "Missing fields" });
        const existing = await User.findOne({ email });
        if (existing)
            return res.status(409).json({ message: "Email already in use" });
        const hash = await bcrypt.hash(password, 10);
        // Assign admin role for specific emails
        const adminEmails = ['admin@ecommerce.com', 'admin@lumapress.com'];
        const role = adminEmails.includes(email.toLowerCase()) ? 'admin' : 'user';
        const user = await User.create({ username, email, password: hash, role });
        // create JWT
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "no-secret", { expiresIn: '7d' });
        // set httpOnly cookie
        res.cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 60 * 60 * 1000 });
        res.json({ user: { id: user._id, email: user.email, username: user.username, role: user.role } });
    }
    catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user)
            return res.status(401).json({ message: "Invalid credentials" });
        const ok = await bcrypt.compare(password, user.password);
        if (!ok)
            return res.status(401).json({ message: "Invalid credentials" });
        // Upgrade to admin role for specific emails
        const adminEmails = ['admin@ecommerce.com', 'admin@lumapress.com'];
        if (adminEmails.includes(email.toLowerCase()) && user.role !== 'admin') {
            user.role = 'admin';
            await user.save();
            console.log(`Upgraded user ${email} to admin role`);
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "no-secret", { expiresIn: '7d' });
        res.cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 60 * 60 * 1000 });
        res.json({ user: { id: user._id, email: user.email, username: user.username, role: user.role } });
    }
    catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
router.post("/logout", (req, res) => {
    res.clearCookie('token');
    res.json({ message: "Logged out successfully" });
});
router.get("/me", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user)
            return res.status(404).json({ message: "User not found" });
        // Upgrade to admin role for specific emails
        const adminEmails = ['admin@ecommerce.com', 'admin@lumapress.com'];
        if (adminEmails.includes(user.email.toLowerCase()) && user.role !== 'admin') {
            user.role = 'admin';
            await user.save();
            console.log(`Upgraded user ${user.email} to admin role`);
        }
        res.json({ _id: user._id, username: user.username, email: user.email, role: user.role });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        // Always return success to prevent email enumeration
        if (!user) {
            return res.json({ message: "If an account with this email exists, a password reset email has been sent." });
        }
        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now
        // Save token to user
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpiry;
        await user.save();
        // In a real app, you would send an email here
        // For now, we'll just log the reset URL
        const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
        console.log(`Password reset URL for ${email}: ${resetUrl}`);
        res.json({ message: "If an account with this email exists, a password reset email has been sent." });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
router.get("/verify-reset-token/:token", async (req, res) => {
    try {
        const { token } = req.params;
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date() }
        });
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }
        res.json({ message: "Token is valid" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
router.post("/reset-password", async (req, res) => {
    try {
        const { token, password } = req.body;
        if (!token || !password) {
            return res.status(400).json({ message: "Token and password are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date() }
        });
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }
        // Hash new password
        const hash = await bcrypt.hash(password, 10);
        // Update user
        user.password = hash;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        res.json({ message: "Password has been reset successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
export default router;
