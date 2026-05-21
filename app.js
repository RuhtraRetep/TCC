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




app.use(express.json());

// IMPORT DO SERVICE
const sensorService =
    require("./src/services/sensorServices");

/*
=================================================
ROTA ÚNICA (SEM CONTROLLER E SEM ROUTES)
=================================================
*/
app.post("/prever-sensores", (req, res) => {

    try {

        const { ambientes } = req.body;

        if (!ambientes || !Array.isArray(ambientes)) {
            return res.status(400).json({
                erro: "Envie uma lista de ambientes"
            });
        }

        const resultado =
            sensorService.preverSensores(ambientes);

        return res.status(200).json(resultado);

    } catch (error) {

        return res.status(500).json({
            erro: "Erro interno",
            detalhes: error.message
        });
    }
});

/*
=================================================
SUBIR SERVIDOR
=================================================
*/
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});