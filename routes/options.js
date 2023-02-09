import express from "express";
import {User} from "../models/User.js";

const optionsRouter = express.Router();

optionsRouter
    // getAllUsers
    .get("/manage-users", async (req, res) => {
        try {
            const users = await User.find({});
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json(error);
        }
    })
    // getSingleUser
    .get("/manage-users/:userId", async (req, res) => {
        const {userId} = req.params;
        res.status(200);
        try {
            const user = await User.findById(userId);
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error);
        }
    })
    // getAllProducts
    .get("/manage-products", async (req, res) => {
        res.send("/manage-products")
    })
    // getSingleProduct
    .get("/manage-products/:productId", async (req, res) => {
        res.send(`/manage-products/${req.params.productId}`)
    })


export default optionsRouter;