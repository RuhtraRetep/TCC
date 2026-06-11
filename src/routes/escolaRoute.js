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
    res.sendFile(path.join(__dirname, '..', 'View', 'cadastroEscola.html'));
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

        // ENDEREÇO
        logradouro,
        numero,
        bairro,
        cidade,
        cep,

        // TELEFONE
        pais,
        ddd,
        numeroTel,
        tipo,
        principal,
        ativo,

        // PRIMEIRO USUÁRIO
        usuarioNome,
        usuarioSobrenome,
        usuarioCpf,
        usuarioEmail,
        usuarioSenha
    } = req.body;

    // VALIDAÇÃO
    if (
        !nomeFantasia ||
        !razaoSocial ||
        !cnpj ||
        !tipoGestao ||
        !logradouro ||
        !bairro ||
        !cidade ||
        !cep ||
        !usuarioNome ||
        !usuarioSobrenome ||
        !usuarioCpf ||
        !usuarioEmail ||
        !usuarioSenha
    ) {
        return res.status(400).json({
            sucesso: false,
            erro: 'Preencha todos os campos obrigatórios.'
        });
    }

    try {

        // OBJETO COMPLETO
        const dadosEscola = {
            nomeFantasia,
            razaoSocial,
            cnpj,
            codigoInep,
            tipoGestao,
            email,

            endereco: {
                logradouro,
                numero,
                bairro,
                cidade,
                cep
            },

            telefone: {
                pais,
                ddd,
                numero: numeroTel,
                tipo,
                principal,
                ativo
            },

            primeiroUsuario: {
                nome:      usuarioNome,
                sobrenome: usuarioSobrenome,
                cpf:       usuarioCpf,
                email:     usuarioEmail,
                senha:     usuarioSenha,
                funcao:    'Diretor'
            }
        };

        // CHAMA O SERVICE
        const novaEscola = await escolaService.cadastroEscolaCompleto(dadosEscola);

        return res.status(201).json({
            sucesso: true,
            mensagem: 'Escola cadastrada com sucesso.',
            dados: novaEscola
        });

    } catch (error) {

        return res.status(400).json({
            sucesso: false,
            erro: error.message
        });
    }
});


module.exports = router;