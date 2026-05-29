/*
  Módulo responsável por definir as rotas relacionadas aos usuários do sistema.

  Funcionalidades:
  - Chama a rota do cadastro de novos usuários
  - Chama a rota da autenticação (login)
  - Chama a rota do possível gerenciamento de dados do usuário (perfil, atualização, etc.)

  Rotas:
  - POST /register → Realiza o cadastro de um novo usuário
  - POST /login → Autentica o usuário e permite acesso ao sistema

  Integração:
  - As requisições são direcionadas para o userController,
    responsável por processar a lógica e interagir com o banco de dados.

  Objetivo:
  - Gerenciar o acesso ao sistema de forma segura e organizada
*/

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
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: 'Preencha e-mail e senha.' });
    }

    try {
        const usuario = await usuarioService.autenticar(email, senha);

        // Salva o usuário na sessão
        req.session.usuario = {
            id:    usuario.id_usuario,
            nome:  usuario.nome_usuario,
            email: usuario.email,
            funcao: usuario.funcao,
            escolaId: usuario.fk_id_escola
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

module.exports = router;