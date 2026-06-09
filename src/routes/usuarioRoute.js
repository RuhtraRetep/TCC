const express = require('express');
const path = require('path');
const router = express.Router();


// 🛠️ FUNÇÃO DE VERIFICAÇÃO (Adicionada diretamente para corrigir o ReferenceError)
function verificarAcesso(req, res, next) {
    if (req.session && req.session.podeAcessarCadastro) {
        return next(); // Permite o acesso se a sessão for válida
    }
    // Se tentar entrar direto sem passar pelo botão, manda para a tela inicial
    res.redirect('/'); 
}

// Permite entrar no cadastro a partir da página inicial
router.get('/liberar-acesso-cadastro-usuario', (req, res) => {
    req.session.podeAcessarCadastro = true;
    res.redirect('/usuarios/cadastro-usuario'); 
});

// Rota para a página de Cadastro de Usuário (HTML)
router.get('/cadastro-usuario', verificarAcesso, (req, res) => {
    req.session.podeAcessarCadastro = false; // Bloqueia reentradas diretas pela URL
    
    // Caminho ajustado para 'View' (V maiúsculo) e arquivo 'cadastroUsuario.html'
    res.sendFile(path.join(__dirname, '..', 'View', 'cadastroUsuario.html'));
});



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