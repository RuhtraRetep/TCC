require('dotenv').config();
const mysql = require('mysql2');

// Cria o pool de conexões usando as variáveis de ambiente
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});

module.exports = pool.promise();