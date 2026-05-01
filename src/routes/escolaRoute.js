const express = require('express');
const path = require('path');
const router = express.Router();

const verificarAcesso = (req, res, next) =>{
    if (req.session.podeAcessarCadastro)
    {
        next();        
    } 
    else 
    {
        res.redirect('/');
    }
}

//PERMITE ENTRAR NO CADASTRO, NO CASO EVITA QUALQUER ABOBADO LOGAR SEM PASSAR POR ONDE QUERO QUE PASSE, que é  apágina inicial
router.get('/liberar-acesso-cadastro' , (req, res) =>{  
    req.session.podeAcessarCadastro = true; //FECHA A PERMISSÃO ASSIM QUE ENTRA, MANTENDO A REAL SEGURANÇA DA PÁGINA
    res.redirect('/escolas/cadastro-escola');
});

// Rota para a página de Cadastro (HTML)
router.get('/cadastro-escola', verificarAcesso , (req, res) => {
    // path.join(__dirname, '..', 'view', ...) serve para sair da pasta 'routes' e entrar na 'view'

    req.session.podeAcessarCadastro = false;
    res.sendFile(path.join(__dirname, '..', 'view', 'cadastroEscola.html'));
});


module.exports = router;
