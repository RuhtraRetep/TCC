const express = require('express');
const path = require('path');
const app = express();
const sessionToken = require('express-session');

// Importando suas rotas
const escoLaroute = require('./src/routes/escolaRoute'); 
const usuarioRoute = require('./src/routes/usuarioRoute');
const sensorRoute = require('./src/routes/sensorRoute');

// IMPORT DO SERVICE (Vindo da main)
const sensorService = require("./src/services/sensorServices");

// Configurações e Middlewares
app.use(sessionToken({
    secret: 'token',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware: só passa quem está logado
function autenticado(req, res, next) {
    if (req.session && req.session.usuario) {
        return next();
    } else {
        res.redirect('/usuarios/login');
    }
}

// Rota da Home (Corrigido para 'View' maiúsculo)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'View', 'index.html'));
});

// VINCULANDO AS ROTAS NO EXPRESS:
app.use('/escolas', escoLaroute); 
app.use('/usuarios', usuarioRoute);
app.use('/sensores', sensorRoute);

/*
=================================================
ROTA ÚNICA DE PREVISÃO (Trazida da main)
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

        const resultado = sensorService.preverSensores(ambientes);
        return res.status(200).json(resultado);

    } catch (error) {
        return res.status(500).json({
            erro: "Erro interno",
            detalhes: error.message
        });
    }
});

// Rotas protegidas (Corrigido caminhos para 'View' maiúsculo e removido duplicadas)
app.get('/dashboard', autenticado, (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'View', 'dashboard.html'));
});

app.get('/painel', autenticado, (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'View', 'telaVisualizacaoGeral.html'));
});

app.get('/sensores', autenticado, (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'View', 'telaSensores.html'));
});

/*
###################### INICIALIZAR GASTO DE SENSORES ###################*/
const iniciarMonitoramento = require('./src/services/sensorMonitorService');
iniciarMonitoramento();

// Inicializa o servidor na porta 3000 (Apenas um único listener)
app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
