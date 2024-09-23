import jwt from "jsonwebtoken";
import User from "../database/model/User.js";

async function verifyToken(req, res, next) {
    const authorization = req.headers.authorization;

    if (!authorization) {
        res.status(400).json({ message: "Invalid token." });
        return;
    }

    const [authType, token] = authorization.split(" ");

    if (authType !== 'Bearer' || !token) {
        res.status(400).json({ message: "Invalid token format." });
        return;
    }

    try {
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);
        const user = await User.findOne({ where: { id: decoded.id } });

        if (!user) {
            res.status(404).json({ message: "User not found." });
            return;
        }

        req.user = user;
        next();
    } catch (err) {
        console.log(err)
        if (err instanceof jwt.TokenExpiredError) {
            res.status(401).json({ message: "Token expired." });
        }
        else if (err instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ message: "Invalid token." });
        }
        else
            res.status(500).json({ message: "Server error." });
    }
};

export default verifyToken;