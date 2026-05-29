const express = require('express');
const path = require('path');
const router = express.Router();
const usuarioService = require('../services/usuarioService');

// Rota para servir a página de login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'loginUsuario.html'));
});

// Rota POST de autenticação
router.post('/login', async (req, res) => {
    const { emailEscola, codigoInep, emailUsuario, senha } = req.body;

    if (!emailEscola || !codigoInep || !emailUsuario || !senha) {
        return res.status(400).json({ 
            erro: 'Preencha todos os campos: e-mail da escola, código INEP, e-mail do usuário e senha.' 
        });
    }

    try {
        const usuario = await usuarioService.autenticar(
            emailEscola,
            codigoInep,
            emailUsuario,
            senha
        );

        // Salva o usuário na sessão
        req.session.usuario = {
            id:           usuario.id_usuario,
            nome:         usuario.nome_usuario,
            email:        usuario.email,
            funcao:       usuario.funcao,
            escolaId:     usuario.fk_id_escola,
            nomeEscola:   usuario.nome_fantasia
        };

        return res.status(200).json({
            sucesso: true,
            mensagem: 'Login realizado com sucesso.',
            usuario: req.session.usuario
        });

    } catch (error) {
        return res.status(401).json({ erro: error.message });
    }
});

// Rota de logout
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

router.get('/me', (req, res) => {
    if (!req.session.usuario) {
        return res.status(401).json({ erro: 'Não autenticado.' });
    }
    return res.status(200).json(req.session.usuario);
});

module.exports = router;