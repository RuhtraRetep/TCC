const mysql = require('mysql2');

// Cria o pool de conexões normalmente
const pool = mysql.createPool({
    host: 'acela.proxy.rlwy.net',
    user: 'root',
    password: 'pGFnAuIxojQbsoIHXjUfyVHWRmMWXdYU',
    database: 'tcc',
    port: 37397,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});

// O SEGREDO ESTÁ AQUI: Exportar usando o .promise()
module.exports = pool.promise();