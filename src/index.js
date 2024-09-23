import "dotenv/config";

import express from "express";

const server = express();

server.listen(3000, _ => {
    console.log("Server running.")
});