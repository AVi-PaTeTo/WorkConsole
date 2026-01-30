import express from "express";
import { User } from "../models/user.js";
import { requiresAuth } from "../middlewares/auth.middleware.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch("/", requiresAuth, async (req, res) => {
    try {
        const user = await User.findById(req.userID).select("+password");
        if (!user) return res.status(404).json({ message: "User not found" });

        if (req.body.newPassword !== undefined) {
            const { currentPassword, newPassword } = req.body;

            if (!currentPassword) {
                return res.status(400).json({
                    message: "Current password required to change password",
                });
            }

            const isMatch = await bcrypt.compare(
                currentPassword,
                user.password,
            );
            if (!isMatch) {
                return res
                    .status(401)
                    .json({ message: "Current password incorrect" });
            }

            user.password = newPassword;
        } else {
            if (req.body.email !== undefined) user.email = req.body.email;
            if (req.body.name !== undefined) user.name = req.body.name;
            if (req.body.profilePic !== undefined)
                user.picture = req.body.profilePic;
        }

        await user.save();

        const userResponse = user.toObject();
        delete userResponse.password;

        res.json(userResponse);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/", requiresAuth, async (req, res) => {
    try {
        const user = User.findOneAndDelete({ _id: req.userID });

        if (!user) return res.status(400).json({ message: "User not found" });

        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
export default router;
