const express = require('express');
const path = require('path');
const router = express.Router();
const escolaService = require('../services/escolaService');

// Middleware de segurança das sessões
const verificarAcesso = (req, res, next) => {
    if (req.session.podeAcessarCadastro) {
        next();        
    } else {
        res.redirect('/');
    }
};

// Permite entrar no cadastro a partir da página inicial
router.get('/liberar-acesso-cadastro', (req, res) => {  
    req.session.podeAcessarCadastro = true; 
    res.redirect('/escolas/cadastro-escola');
});

// Rota para a página de Cadastro (HTML)
router.get('/cadastro-escola', verificarAcesso, (req, res) => {
    req.session.podeAcessarCadastro = false; // Bloqueia reentradas diretas pela URL
    res.sendFile(path.join(__dirname, '..', 'view', 'cadastroEscola.html'));
});

// CORREÇÃO AQUI: Mudado de '/cadastrar-escola' para '/cadastro-escola' para bater com o fetch do seu script.js
router.post('/cadastro-escola', async (req, res) => {
    const {
        nomeFantasia,
        razaoSocial,
        cnpj,
        codigoInep,
        tipoGestao,
        email,
        telefone
    } = req.body;

    // Validação básica dos campos obrigatórios da tabela
    if (!nomeFantasia || !razaoSocial || !cnpj || !tipoGestao) {
        return res.status(400).json({ erro: 'Por favor, preencha todos os campos obrigatórios.' });
    }

    try {
        // ID simulado de endereço para a FK do banco
        const fk_id_endereco = 2; 

        // Agrupa os dados recebidos do formulário
        const dadosEscola = { nomeFantasia, razaoSocial, cnpj, codigoInep, tipoGestao, email, telefone };

        // Chama o service para inserir no banco de dados (usando os nomes idênticos de variáveis)
        const novaEscola = await escolaService.cadastrarEscola(dadosEscola, fk_id_endereco);

        // Retorna status 201 (Criado) com os dados da escola
        return res.status(201).json({
            sucesso: true,
            mensagem: 'Escola cadastrada com sucesso!',
            dados: novaEscola
        });

    } catch (error) {
        // Se o banco rejeitar (ex: CNPJ duplicado), envia a mensagem limpa
        return res.status(400).json({ 
            sucesso: false,
            erro: error.message 
        });
    }
});

module.exports = router;