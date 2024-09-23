import "dotenv/config";

import { connection } from "./database/config.js";
import "./database/model/User.js";
import "./database/model/Transaction.js";
await connection.sync();

import express from "express";

const server = express();

server.listen(3000, _ => {
    console.log("Server running.");
});