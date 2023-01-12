import express from "express";
import {User} from "../models/User.js";

const usersRouter = express.Router();

usersRouter
    .get("/", async (req, res) => {
        try {
            const users = await User.find({});
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json(error);
        }
    })
    .get("/:userId?", async (req, res) => {
        const {userId} = req.params;
        res.status(200);
        try {
            const user = await User.findById(userId);
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error);
        }
    })

export default usersRouter;