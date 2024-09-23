import { DataTypes } from "sequelize";
import { connection } from "../config.js";
import User from "./User.js";

const Transaction = connection.define("Transaction", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    capital: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: false
    },
    classification: {
        type: DataTypes.ENUM,
        values: ["in", "out"],
        allowNull: false
    },
    motive: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    }
});

User.hasMany(Transaction, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});

Transaction.belongsTo(User, {
    foreignKey: 'userId',
});

export default Transaction;