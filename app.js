const express = require('express');
const path = require('path');
const app = express();
const sessionToken = require('express-session');

// Importando suas rotas
const escoLaroute = require('./src/routes/escolaRoute'); 
const usuarioRoute = require('./src/routes/usuarioRoute');
const sensorRoute = require('./src/routes/sensorRoute');

// Configurações e Middlewares
app.use(sessionToken({
    secret: 'token',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota da Home
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'view', 'index.html'));
});

// VINCULANDO AS ROTAS DE VERDADE NO EXPRESS:
app.use('/escolas', escoLaroute); 
//app.use('/usuarios', usuarioRoute);
//app.use('/sensores', sensorRoute);

// Inicializa o servidor na porta 3000
app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));