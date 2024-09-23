import "dotenv/config";

import { connection } from "./database/config.js";
import "./database/model/User.js";
import "./database/model/Transaction.js";
await connection.sync();

import express from "express";
import cors from "cors";

import authController from "./controller/auth-controller.js";
import userController from "./controller/user-controller.js";
import transactionController from "./controller/transaction-controller.js";

const server = express();

server.use(cors({ origin: "*" }))
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use(authController);
server.use(userController);
server.use(transactionController);

server.listen(3000, _ => {
    console.log("Server running.");
});