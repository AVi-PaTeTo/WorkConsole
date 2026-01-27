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

// Fetch recently created or modified sessions
router.get('/recent', requiresAuth, async (req, res) => {
    try{
        const id = req.userID
        const sessions = await Session.find({userID: id}).sort({ updatedAt: -1 }).limit(10)

        res.json(sessions)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', requiresAuth, async(req,res) => {
    try{
        const session = await Session.findById(req.params.id);
        if(!session) return res.status(404).json({ message: "Session not found "})
        const obj = session.toObject();
        const duration = (session.getDurationMs() / 1000 / 60).toFixed(0);
        const withDuration = {
                ...obj,
                duration: duration,
            };
        res.json(withDuration)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

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
            const obj = started.toObject();
            const duration = (started.getDurationMs() / 1000 / 60).toFixed(0);
            const withDuration = {
                    ...obj,
                    duration: duration,
                };
            res.json(withDuration)
        });
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
    const obj = session.toObject();
    const duration = (session.getDurationMs() / 1000 / 60).toFixed(0);
    const withDuration = {
            ...obj,
            duration: duration,
        };
    res.json(withDuration)
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
    const obj = session.toObject();
    const duration = (session.getDurationMs() / 1000 / 60).toFixed(0);
    const withDuration = {
            ...obj,
            duration: duration,
        };
    res.json(withDuration)
})

//Update a session
router.patch("/:id", requiresAuth, async (req, res) => {
    const updates = {}
    if (req.body.title !== undefined) {
        updates.title = req.body.title;
    }

    if (req.body.tags !== undefined) {
        updates.tags = req.body.tags;
    }

    try{
        const updated = await Session.findOneAndUpdate(
            {
                _id: req.params.id,
                userID: req.userID,
            },
            {
                $set: updates,
            },
            {
                new: true,
                runValidators: true,
            }
        );
        
        if (!updated) {
        return res.status(404).json({ message: "Session not found" });
        }
        res.json(updated);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Delete a session
router.delete('/:id', requiresAuth, async (req,res) => {
    try {
        const session = await Session.findOneAndDelete(
            { 
                _id: req.params.id,
                userID: req.userID
            }
        )

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        res.json({deleted: session, message: "Session deleted" })
    } catch (err) {
        res.status(500).json({ message: err.nessage})
    }
})

export default router;