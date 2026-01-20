import express from "express";
import {User} from "../models/user.js";


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

export default router;