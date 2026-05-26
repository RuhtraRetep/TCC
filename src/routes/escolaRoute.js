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

    console.log("DADOS QUE CHEGARAM NO BACK-END:", req.body);
    try {
        // 1. Pegamos os dados respeitando a estrutura de sub-objetos vinda do Front-end
        const {
            nomeFantasia,
            razaoSocial,
            cnpj,
            codigoInep,
            tipoGestao,
            email,
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
            ativo
        } = req.body;

        // 2. VALIDAÇÃO DE CAMPOS OBRIGATÓRIOS (Antes de montar o objeto final)
        if (
            !nomeFantasia ||
            !razaoSocial ||
            !cnpj ||
            !tipoGestao ||
            !logradouro ||
            !numero ||
            !bairro ||
            !cidade ||
            !cep ||
            !pais ||
            !ddd ||
            !numeroTel ||
            !tipo
        ) {
            return res.status(400).json({
                sucesso: false,
                erro: 'Preencha todos os campos obrigatórios do formulário.'
            });
        }

        // 3. ESTRUTURA DO OBJETO COMPLETO (Passando as variáveis diretas que vieram do req.body)
        const dadosEscola = {
            nomeFantasia,
            razaoSocial,
            cnpj,
            codigoInep: codigoInep || null,
            tipoGestao,
            email: email || null,
            endereco: {
                logradouro, // Equivalente a logradouro: logradouro
                numero: numero || null,
                bairro,
                cidade,
                cep
            },
            telefone: {
                pais: pais || null,
                ddd: ddd || null,
                numero: numeroTel || null, // Mapeia a variável numeroTel para a chave 'numero' que o Service espera
                tipo: tipo || null,
                principal,
                ativo
            }
        };

        // 4. CHAMA O SERVICE (Onde rodam as validações estritas de tamanho e formato)
        const novaEscola = await escolaService.cadastroEscolaCompleto(dadosEscola);

        return res.status(201).json({
            sucesso: true,
            mensagem: 'Escola cadastrada com sucesso.',
            dados: novaEscola
        });

    } catch (error) {
        // 5. CAPTURA O ERRO PERSONALIZADO DO SERVICE
        // Enviamos na chave 'erro' para manter a consistência do seu back-end
        return res.status(400).json({
            sucesso: false,
            erro: error.message
        });
    }
});


module.exports = router;