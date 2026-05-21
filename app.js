const express = require('express');
const path = require('path');
const app = express();
const sessionToken  = require('express-session');

// Importando suas rotas
const escolaRoute = require('./src/routes/escolaRoute'); 
const usuarioRoute = require('./src/routes/usuarioRoute');
// const sensorRoute = require('./src/routes/sensorRoute');

// Configurações e Middlewares
app.use(sessionToken({
    secret: 'token',
    resave: false,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota da Home (pode ficar aqui)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'view', 'index.html'));
});

// Usando as rotas importadas
// Todas as rotas dentro de escolaRoute agora começam com /escolas
app.use('/escolas', escolaRoute); 

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000")); //Não aparece pro usuário, serve apenas para teste


const sensorRoutes =
    require("./src/routes/sensorRoutes");

    app.use(express.json());
app.use("/api", sensorRoutes);