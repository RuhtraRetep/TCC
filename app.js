require('dotenv').config();
const express = require('express');
const path    = require('path');
const app     = express();
const sessionToken = require('express-session');


const escolaRoute  = require('./src/routes/escolaRoute');
const usuarioRoute = require('./src/routes/usuarioRoute');
const sensorRoute  = require('./src/routes/sensorRoute');
const sensorService = require('./src/services/sensorServices');
const { iniciarMonitoramento } = require('./src/services/sensorMonitorService');

app.use(sessionToken({
    secret: process.env.SESSION_SECRET || 'sge-toc-secret',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function autenticado(req, res, next) {
    if (req.session && req.session.usuario) {
        return next();
    }
    res.redirect('/usuarios/login');
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'View', 'index.html'));
});

app.get('/mobile/:escolaId', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'View', 'telaMobile.html'));
});
app.get('/usuarios/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'View', 'loginUsuario.html'));
});

app.use('/escolas', escolaRoute);
app.use('/usuarios', usuarioRoute);
app.use('/sensores', sensorRoute);

app.post('/prever-sensores', (req, res) => {
    try {
        const { ambientes } = req.body;
        if (!ambientes || !Array.isArray(ambientes)) {
            return res.status(400).json({ erro: 'Envie uma lista de ambientes' });
        }
        const resultado = sensorService.preverSensores(ambientes);
        return res.status(200).json(resultado);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro interno', detalhes: error.message });
    }
});

app.get('/dashboard', autenticado, (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'View', 'dashboard.html'));
});

app.get('/painel', autenticado, (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'View', 'telaVisualizacaoGeral.html'));
});

app.get('/sensores', autenticado, (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'View', 'telaSensores.html'));
});

// O monitoramento NÃO é iniciado aqui.
// Ele liga automaticamente quando o primeiro ambiente é cadastrado (ver sensorRoute.js).

const PORT = process.env.APP_PORT || 3000;

iniciarMonitoramento();

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));