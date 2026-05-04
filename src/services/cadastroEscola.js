const express = require('express');
const app = express();

app.use(express.json());

app.post('/cadastroEscola', (req, res) =>{
const {
    nomeFantasia,
    razaoSocial,
    cnpj,
    codigoInep,
    tipoGestao,
    email,
    telefone,
    cep

}
});