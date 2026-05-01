/*
  Módulo responsável por configurar e estabelecer a conexão
  com o banco de dados MySQL.

  Funcionalidades:
  - Define os parâmetros de conexão com o banco
  - Cria a conexão com o MySQL
  - Disponibiliza a conexão para os models executarem queries

  Integração:
  - É utilizado pelos models, que importam este módulo
    para executar operações no banco de dados

  Objetivo:
  - Centralizar a configuração de acesso ao banco,
    facilitando manutenção e reutilização da conexão
*/

const MySQL = require('mysql2');

const pool = MySQL.createPool({  

  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,

  waitForConnections: true,
  connectionLimit: 10, //Permite criar ao mesmo tempo até 10 conexões com o BD
  queueLimit: 0
})


module.exports = pool; //Envia apenas a conexão