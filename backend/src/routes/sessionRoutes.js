import express from 'express';
import { requiresAuth } from '../middlewares/auth.middleware.js';
import { Session } from '../models/session.js';

const router = express.Router()

//Fetch all user sessions
router.get('/', requiresAuth, async (req, res) => {
    
    try{
        const Id = req.userID
        const grouped = {
                            active: [],
                            planned: [],
                            completed: [],
                        };
        
        const sessions = await Session.find({ userID: Id }).sort({ updatedAt: -1});
        if (!sessions) return res.json(grouped);
        
        for (const s of sessions) {
            if (s.status === "active" || s.status === "paused") {
                grouped.active.push(s);
            } else if (s.status === "planned") {
                grouped.planned.push(s);
            } else if (s.status === "completed") {
                grouped.completed.push(s);
            }

        } 
        return res.json(grouped)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});


//Create Session
router.post('/', requiresAuth, async (req, res) => {
    const { title , tags } = req.body

    try{
        const session = await Session.create({ userID: req.userID, title, tags })
        return res.status(201).json(session)
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})



export default router;