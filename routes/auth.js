import express from "express";
import {User} from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";

dotenv.config();

const authRouter = express.Router();

authRouter
    .post('/register', async (req, res) => {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password.trim(), salt);

            const user = new User({
                username: req.body.username.trim(),
                email: req.body.email.trim(),
                password: String(hash),
                admin: req.body.admin,
                profilePic: req.body.profilePic ?? ""
            })

            const newUser = await user.save();
            res.status(200).json(newUser);
        } catch (error) {
            const message = error.keyValue?.username ? `Login ${error.keyValue?.username} jest już zajęty` : `W bazie istnieje już użytkownik zarejestrowany na adres ${error.keyValue?.email}`
            res.status(500).json(message);
        }
    })

    .post('/login', async (req, res) => {
        try {
            const user = await User.findOne({username: req.body.username});

            if (!user) return res.status(400).json('Wrong credentials');

            const {password, username, profilePic} = user._doc;

            const isPasswordCorrect = await bcrypt.compare(req.body.password, password);
            if (!isPasswordCorrect) return res.status(400).json('Wrong credentials');

            const token = jwt.sign({userID: user._doc._id.toString(), admin: user._doc.admin}, process.env.ACCESS_TOKEN, {
                expiresIn: 60 * 60 * 7
            });

            return res.status(200).json({
                "username": user._doc.username,
                "profilePic": user._doc.profilePic,
                token,
            });
        } catch (error) {
            res.status(500).json(error)
        }
    })

export default authRouter;