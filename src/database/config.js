import { Sequelize } from 'sequelize';

const connection = new Sequelize('finance_db', 'root', '123456', {
    host: "127.0.0.1",
    dialect: 'mysql',
});

await connection.authenticate();

export { connection };