const db = require('../config/db');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

class EscolaService {
 
    async cadastroEscolaCompleto(dadosEscola) {
 
        // Abre conexão
        const connection = await db.getConnection();
 
        try {
            // Inicia transação
            await connection.beginTransaction();
 
            // =========================
            // CADASTRO DE ENDEREÇO
            // =========================
            const queryEndereco = "INSERT INTO Enderecos (logradouro, numero, bairro, cidade, cep) VALUES (?, ?, ?, ?, ?)";
 
            const [resultadoEndereco] = await connection.execute(
                queryEndereco,
                [
                    dadosEscola.endereco?.logradouro || null,
                    dadosEscola.endereco?.numero     || null,
                    dadosEscola.endereco?.bairro     || null,
                    dadosEscola.endereco?.cidade     || null,
                    dadosEscola.endereco?.cep        || null
                ]
            );
 
            // Pega o ID do endereço criado
            const fk_id_endereco = resultadoEndereco.insertId;
 
            // =========================
            // CADASTRO DA ESCOLA
            // =========================
            const queryEscola = "INSERT INTO Escolas (nome_fantasia, razao_social, cnpj, codigo_inep, tipo_gestao, email, fk_id_endereco) VALUES (?, ?, ?, ?, ?, ?, ?)";
 
            const [resultadoEscola] = await connection.execute(
                queryEscola,
                [
                    dadosEscola.nomeFantasia || null,
                    dadosEscola.razaoSocial  || null,
                    dadosEscola.cnpj         || null,
                    dadosEscola.codigoInep   || null,
                    dadosEscola.tipoGestao   || null,
                    dadosEscola.email        || null,
                    fk_id_endereco
                ]
            );
 
            // Pega o ID da escola criada
            const fk_id_escola = resultadoEscola.insertId;
 
            // =========================
            // CADASTRO DO TELEFONE
            // =========================
            const queryTelefone = "INSERT INTO Telefones (fk_id_escola, pais, ddd, numero, tipo, principal, ativo) VALUES (?, ?, ?, ?, ?, ?, ?)";
 
            const ehPrincipal = (dadosEscola.telefone?.principal === true || dadosEscola.telefone?.principal === 'true' || dadosEscola.telefone?.principal === 1) ? 1 : 0;
            const ehAtivo    = (dadosEscola.telefone?.ativo === true || dadosEscola.telefone?.ativo === 'true' || dadosEscola.telefone?.ativo === 1 || dadosEscola.telefone?.ativo === undefined) ? 1 : 0;
 
            await connection.execute(
                queryTelefone,
                [
                    fk_id_escola,
                    dadosEscola.telefone?.pais   || null,
                    dadosEscola.telefone?.ddd    || null,
                    dadosEscola.telefone?.numero || null,
                    dadosEscola.telefone?.tipo   || null,
                    ehPrincipal,
                    ehAtivo
                ]
            );
 
            // =========================
            // CADASTRO DO PRIMEIRO USUÁRIO
            // =========================
            const senhaHash = await bcrypt.hash(dadosEscola.primeiroUsuario.senha, SALT_ROUNDS);
 
            const queryUsuario = `
                INSERT INTO Usuarios (nome_usuario, sobrenome_usuario, cpf, email, funcao, senha, fk_id_escola)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
 
            await connection.execute(
                queryUsuario,
                [
                    dadosEscola.primeiroUsuario.nome      || null,
                    dadosEscola.primeiroUsuario.sobrenome || null,
                    dadosEscola.primeiroUsuario.cpf       || null,
                    dadosEscola.primeiroUsuario.email     || null,
                    'Diretor',
                    senhaHash,
                    fk_id_escola
                ]
            );
 
            // Salva definitivamente todas as operações se nenhuma falhar
            await connection.commit();
 
            return {
                sucesso: true,
                mensagem: 'Escola, endereço, telefone e usuário administrador cadastrados com sucesso.',
                idEscola: fk_id_escola
            };
 
        } catch (error) {
 
            // Desfaz tudo se der erro
            await connection.rollback();
 
            // Erro de valor duplicado
            if (error.errno === 1062) {
                throw new Error('CNPJ, código INEP, CPF ou e-mail já cadastrado.');
            }
 
            throw new Error('Erro ao cadastrar escola: ' + error.message);
 
        } finally {
            // Libera conexão
            connection.release();
        }
    }
}


module.exports = new EscolaService();