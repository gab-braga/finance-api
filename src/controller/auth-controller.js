import { Router } from "express";
import User from "../database/model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authController = Router();

authController.post("/auth/signup", async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        const userExists = await User.findOne({ where: { email } });
        if(userExists) {
            res.status(400).json({ message: "This e-mail already exists." });
            return;
        }
    
        const passwordHash = await bcrypt.hash(password, 12);
        const user = await User.create({ name, email, password: passwordHash });
        res.status(201).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error." });
    }
});

authController.post("/auth/signin", async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ where: { email } });
        if(!user) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        
        const isSamePassword  = await bcrypt.compare(password, user.password);
        if(isSamePassword) {
            const { id, name, email } = user;
            const payload = { id, name, email };
            const secret = process.env.JWT_SECRET;
            const token = jwt.sign(payload, secret, { expiresIn: "7d" });
            res.status(200).json({ token: `Bearer ${token}` });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error." });
    }
});

export default authController;