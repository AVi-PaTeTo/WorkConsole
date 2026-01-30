import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { accessCookieOptions, refreshCookieOptions } from "../utils/cookie.js";
import { signAccessToken, signRefreshToken } from "../utils/jwt.js";
import { requiresAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = signAccessToken(user.id);
    const refreshToken = signRefreshToken(user.id);
    res.cookie("access", accessToken, accessCookieOptions)
        .cookie("refresh", refreshToken, refreshCookieOptions)
        .json({ message: "Login successfull." });
});

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing)
        return res.status(400).json({ message: "Email already registered." });

    const user = User.create({ name, email, password });

    const accessToken = signAccessToken(user.id);
    const refreshToken = signRefreshToken(user.id);
    res.cookie("access", accessToken, accessCookieOptions)
        .cookie("refresh", refreshToken, refreshCookieOptions)
        .status(201)
        .json({ message: "Registered Successfully" });
});

router.post("/refresh", (req, res) => {
    const token = req.cookies.refres;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const newToken = signAccessToken(payload.sub);

        res.cookie("access", newToken, accessCookieOptions).json({
            message: "Token refreshed",
        });
    } catch {
        return res.status(401).json({ message: "Invalid refresh token." });
    }
});

router.post("/logout", (req, res) => {
    res.clearCookie("access")
        .clearCookie("refresh")
        .json({ message: "Logged out successfully." });
});

router.get("/me", requiresAuth, async (req, res) => {
    try {
        const user = await User.findById(req.userID).select(
            "_id name email picture",
        );

        if (!user) return res.status(401).json({ message: "User not found" });

        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
