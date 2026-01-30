import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import connectDB from "./db.js";

const PORT = process.env.PORT || 5000;
const app = express();

import authRoutes from "./src/routes/auth.js";
import userRoutes from "./src/routes/userRoutes.js";
import sessionRoutes from "./src/routes/sessionRoutes.js";

app.use(
    cors({
        origin: "http://localhost:4173",
        credentials: true,
    }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sessions", sessionRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Backend is online." });
});

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log("App runnin on port", PORT);
        });
    } catch (err) {
        console.error(err);
    }
};

startServer();
