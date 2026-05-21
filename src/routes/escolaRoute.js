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



// 2. Rota POST que recebe os dados do formulário HTML e chama o Service
// Note o uso de 'async' antes de (req, res) para permitir o 'await'
router.post('/cadastro-escola', async (req, res) => {
    const {
        nomeFantasia,
        razaoSocial,
        cnpj,
        codigoInep,
        tipoGestao,
        email,
        telefone,
        cep // O CEP vindo do formulário
    } = req.body;

    // Validação básica dos campos obrigatórios da tabela
    if (!nomeFantasia || !razaoSocial || !cnpj || !tipoGestao) {
        return res.status(400).json({ erro: 'Por favor, preencha todos os campos obrigatórios.' });
    }

    try {
        /* IMPORTANTE: Como sua tabela exige 'fk_id_endereco', em um cenário real você
           cadastraria o CEP antes em uma tabela de endereços e pegaria o ID gerado.
           Aqui estamos simulando o ID 1 provisoriamente para o código funcionar.
        */
        const fk_id_endereco = 1; 

        // Agrupa os dados recebidos do formulário
        const dadosEscola = { nomeFantasia, razaoSocial, cnpj, codigoInep, tipoGestao, email, telefone };

        // Chama o service para inserir no banco de dados
        const novaEscola = await escolaService.cadastrarEscola(dadosEscola, fk_id_endereco);

        // Se der tudo certo, retorna status 201 (Criado) com os dados da escola
        return res.status(201).json({
            sucesso: true,
            mensagem: 'Escola cadastrada com sucesso!',
            dados: novaEscola
        });

    } catch (error) {
        // Se o banco rejeitar (ex: CNPJ duplicado), cai aqui e avisa o front-end
        return res.status(400).json({ 
            sucesso: false,
            erro: error.message 
        });
    }
});

module.exports = router;
