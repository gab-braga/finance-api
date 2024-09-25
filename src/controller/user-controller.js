import { Router } from "express";
import verifyToken from "../middleware/verify-token.js";
import User from "../database/model/User.js";

const userController = Router();

userController.use(verifyToken);

userController.get("/users", async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error." });
    }
});

userController.get("/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: "User not found." });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error." });
    }
});

userController.post("/users", async (req, res) => {
    const { name, email, password, birthday } = req.body;
    try {
        const user = await User.create({
            name, email, password, birthday
        });
        res.status(201).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error." });
    }
});

userController.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, password, birthday } = req.body;
    try {
        const user = await User.findByPk(id);
        if (user) {
            await user.update({ name, email, password, birthday });
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: "User not found." });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error." });
    }
});

userController.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            res.status(200).json({ message: "User removed." });
        }
        else {
            res.status(404).json({ message: "User not found." });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error." });
    }
});

export default userController;