const mysql = require('mysql2');

// Cria o pool de conexões normalmente
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password:"",
    database: 'tcc',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// O SEGREDO ESTÁ AQUI: Exportar usando o .promise()
module.exports = pool.promise();