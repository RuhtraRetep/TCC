const express = require('express');
const path = require('path');
const router = express.Router();
const usuarioService = require('../services/usuarioService');

router.post('/cadastro-usuario', async (req, res) => {
 
    const fk_id_escola = req.session.usuario.escolaId;

    const {
        // DADOS PESSOAIs
        nome,
        sobrenome,
        cpf,
        telefone,
 
        // VÍNCULO ESCOLAR
        cargo,
        modulos,
 
        // CREDENCIAIS
        email,
        senha
    } = req.body;
 
    // VALIDAÇÃO DOS CAMPOS OBRIGATÓRIOS
    if (!nome || !sobrenome || !email || !senha) {
        return res.status(400).json({
            sucesso: false,
            erro: 'Preencha todos os campos obrigatórios: nome, sobrenome, e-mail e senha.'
        });
    }
 
    // OBJETO COMPLETO PARA O SERVICE
    const dadosUsuario = {
        nome,
        sobrenome,
        cpf:      cpf      || null,
        telefone: telefone  || null,
        cargo:    cargo     || null,
        email,
        senha,
        fk_id_escola
    };

    console.log("fk_id_escola:", fk_id_escola);
    console.log("dadosUsuario:", dadosUsuario);
 
    try {
 
        const novoUsuario = await usuarioService.cadastroUsuario(dadosUsuario);
 
        return res.status(201).json({
            sucesso: true,
            mensagem: 'Usuário cadastrado com sucesso.',
            dados: novoUsuario
        });
 
    } catch (error) {
 
        return res.status(400).json({
            sucesso: false,
            erro: error.message
        });
    }
});



// Não permite qualquer um entrar na tela de Cadastro de usuário
function verificarAcesso(req, res, next) {
    if (req.session && req.session.podeAcessarCadastro) {
        return next(); // Permite o acesso se a sessão for válida
    }
    res.redirect('/'); 
}
router.get('/liberar-acesso-cadastro-usuario', (req, res) => {
    req.session.podeAcessarCadastro = true;
    res.redirect('/usuarios/cadastro-usuario'); 
});

router.get('/cadastro-usuario', verificarAcesso, (req, res) => {
    req.session.podeAcessarCadastro = false; // Bloqueia reentradas diretas pela URL
    
    // Caminho ajustado para 'View' (V maiúsculo) e arquivo 'cadastroUsuario.html'
    res.sendFile(path.join(__dirname, '..', 'View', 'cadastroUsuario.html'));
});
//---------------------------------------------------------

router.get('/alunos', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'View', 'telaVisualizacaoAlunos.html'));
});

// Logar usuário
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'View', 'loginUsuario.html'));
});
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

// -----------------------------------------------------------------------------

router.get('/me', (req, res) => {
    if (!req.session.usuario) {
        return res.status(401).json({ erro: 'Não autenticado.' });
    }
    return res.status(200).json(req.session.usuario);
});



module.exports = router;