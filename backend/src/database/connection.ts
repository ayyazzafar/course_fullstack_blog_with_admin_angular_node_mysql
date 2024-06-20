
import { Sequelize } from "sequelize-typescript";


export const connection = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT as any || 3306,
    models: [__dirname + '/../models']
});