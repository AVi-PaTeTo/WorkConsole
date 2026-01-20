import express from 'express';
import { requiresAuth } from '../middlewares/auth.middleware.js';
import { Session } from '../models/session.js';
import mongoose from 'mongoose';

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
            const obj = s.toObject();
            const duration = (s.getDurationMs() / 1000 / 60).toFixed(1);
            const withDuration = {
                ...obj,
                duration: duration,
            };

            if (s.status === "active" || s.status === "paused") {
                grouped.active.push(withDuration);
            } else if (s.status === "planned") {
                grouped.planned.push(withDuration);
            } else if (s.status === "completed") {
                grouped.completed.push(withDuration);
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

// Start a session
router.post('/:id/start', requiresAuth, async (req, res) => {
    const mongoSession = await mongoose.startSession();

    try{
        await mongoSession.withTransaction(async () => {
            const now = new Date();

            await Session.findOneAndUpdate(
                {   
                    userID: req.userID,
                    status: "active",
                    "intervals.end": null
                },
                {
                    $set: {
                        status: "paused",
                        "intervals.$.end": now
                    }
                }, { session: mongoSession}
            );

            const started = await Session.findOneAndUpdate(
                {
                    _id: req.params.id,
                    userID: req.userID,
                    status: { $in: ['paused', 'planned'] }
                },
                {
                    $set: { status: "active" },
                    $push: { 
                        intervals: {
                                    start: now,
                                    end: null
                                }
                        }
                }, { new: true, session: mongoSession }
            );

            if (!started) {
                throw new Error("Cannot start this session");
            }
        });

        return res.json({ message: "Session started" });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    } finally {
        mongoSession.endSession();
    }
});


//Pause a session
router.post('/:id/pause', requiresAuth, async (req, res) => {
    const now = new Date();
    const session = await Session.findOneAndUpdate(
        {
            _id: req.params.id,
            userID: req.userID,
            status: "active",
            "intervals.end": null,
        },
        {
            $set: { 
                status: "paused",
                "intervals.$.end": now
            }
        },
        { new: true}
    )

    if (!session) {
        return res.status(400).json({ error: "Invalid state transition" });
    }

    res.json(session);
})


//Stop a session
router.post('/:id/stop', requiresAuth, async (req, res) => {
    const now = new Date();
    const session = await Session.findOneAndUpdate(
        {
            _id: req.params.id,
            userID: req.userID,
            status: "active",
            "intervals.end": null,
        },
        {
            $set: { 
                status: "completed",
                "intervals.$.end": now
            }
        },
        { new: true}
    )

    if (!session) {
        session = await Session.findOneAndUpdate(
            {
                _id: req.params.id,
                userID: req.userID,
                status: "paused",
            },
            {
                $set: { 
                    status: "completed",
                }
            },
            { new: true}
        )
    }

    if (!session) {
        return res.status(400).json({ error: "Invalid state transition" });
    }

    res.json(session);
})

export default router;