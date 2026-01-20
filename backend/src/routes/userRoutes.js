import express from "express";
import {User} from "../models/user.js";
import { requiresAuth } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const users = await User.find();
        res.json(users)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/', async (req, res) => {
    try{
        const {name , email , password} = req.body
        const user = await User.create({name, email, password})

        res.json(user)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})


router.patch("/", requiresAuth, async (req, res) => {
    const updates = {}
    if (req.body.email !== undefined) {
        updates.email = req.body.email;
    }

    if (req.body.password !== undefined) {
        updates.password = req.body.password;
    }
    try{
        const user = User.findOneAndUpdate(
            { _id: req.userID},
            { $set: { updates }},
            { new: true, runValidators: true}
        )

    if (!user) return res.status(400).json({ message: "User not found"})

    res.json(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


router.delete("/", requiresAuth, async (req, res) => {
    try{
        const user = User.findOneAndDelete( { _id: req.userID } )

        if (!user) return res.status(400).json({ message: "User not found" })

        res.json({message: "User deleted" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
export default router;