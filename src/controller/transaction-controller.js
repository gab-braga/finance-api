import { Router } from "express";
import Transaction from "../database/model/Transaction.js";
import verifyToken from "../middleware/verify-token.js";

const transactionController = Router();

transactionController.use(verifyToken);

transactionController.get("/transactions", async (req, res) => {
    try {
        const transactions = await Transaction.findAll();
        res.status(200).json(transactions);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error." });
    }
});

transactionController.get("/transactions/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const transaction = await Transaction.findByPk(id);
        if (transaction) {
            res.status(200).json(transaction);
        }
        else {
            res.status(404).json({ message: "Transaction not found." });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error." });
    }
});

transactionController.post("/transactions", async (req, res) => {
    const { capital, classification, motive, description, userId } = req.body;
    try {
        const transaction = await Transaction.create({
            capital, classification, motive, description, userId
        });
        res.status(201).json(transaction);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error." });
    }
});

transactionController.put("/transactions/:id", async (req, res) => {
    const { id } = req.params;
    const { capital, classification, motive, description, userId } = req.body;
    try {
        const transaction = await Transaction.findByPk(id);
        if (transaction) {
            await transaction.update({ capital, classification, motive, description, userId });
            res.status(200).json(transaction);
        }
        else {
            res.status(404).json({ message: "Transaction not found." });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error." });
    }
});

transactionController.delete("/transactions/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const transaction = await Transaction.findByPk(id);
        if (transaction) {
            await transaction.destroy();
            res.status(200).json({ message: "Transaction removed." });
        }
        else {
            res.status(404).json({ message: "Transaction not found." });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error." });
    }
});

export default transactionController;