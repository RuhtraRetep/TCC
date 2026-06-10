const db = require('../config/db');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;


class UsuarioService {


    async cadastroUsuario(dadosUsuario) {

        console.log("=================================");
        console.log("Dados recebidos:", dadosUsuario);
        console.trace("Origem da chamada");
        // Abre conexão
        const connection = await db.getConnection();

        try {
            // Inicia transação
            await connection.beginTransaction();

            // =========================
            // HASH DA SENHA
            // =========================
            const senhaHash = await bcrypt.hash(dadosUsuario.senha, SALT_ROUNDS);

            // =========================
            // CADASTRO DO USUÁRIO
            // =========================
            const queryUsuario = `INSERT INTO Usuarios (nome_usuario, sobrenome_usuario, cpf, email, funcao, senha, fk_id_escola)VALUES (?, ?, ?, ?, ?, ?, ?)`;

            const [resultadoUsuario] = await connection.execute(
                queryUsuario,
                [
                    dadosUsuario.nome || null,
                    dadosUsuario.sobrenome || null,
                    dadosUsuario.cpf || null,
                    dadosUsuario.email || null,
                    dadosUsuario.cargo || null,
                    senhaHash,
                    dadosUsuario.fk_id_escola || null
                ]
            );

            await connection.commit();

            return {
                sucesso: true,
                mensagem: 'Usuário cadastrado com sucesso.',
                idUsuario: resultadoUsuario.insertId
            };
        } catch (error) {

            // Desfaz tudo se der erro
            await connection.rollback();

            // Erro de valor duplicado (e-mail ou CPF já cadastrado)
            if (error.errno === 1062) {
                throw new Error('E-mail ou CPF já cadastrado.');
            }

            throw new Error('Erro ao cadastrar usuário: ' + error.message);

        } finally {
            // Libera conexão
            connection.release();
        }
    }

    async autenticar(emailEscola, codigoInep, emailUsuario, senha) {

        const connection = await db.getConnection();

        try {
            /*
             * Verificação em 4 camadas em uma única query com JOIN:
             * 1. A escola existe com esse email?
             * 2. O código INEP bate com essa escola?
             * 3. O usuário com esse email pertence a essa escola?
             * 4. A senha está correta?
             */
            const query = `
                SELECT 
                    u.id_usuario,
                    u.nome_usuario,
                    u.sobrenome_usuario,
                    u.email,
                    u.funcao,
                    u.senha,
                    u.fk_id_escola,
                    e.nome_fantasia,
                    e.codigo_inep
                FROM Usuarios u
                INNER JOIN Escolas e ON u.fk_id_escola = e.id_escola
                WHERE e.email       = ?
                  AND e.codigo_inep = ?
                  AND u.email       = ?
                LIMIT 1
            `;

            const [rows] = await connection.execute(query, [
                emailEscola,
                codigoInep,
                emailUsuario
            ]);

            // Escola não encontrada ou INEP não bate ou usuário não pertence à escola
            if (rows.length === 0) {
                throw new Error('Dados da escola ou usuário incorretos.');
            }

            const usuario = rows[0];

            // Camada 4: compara a senha digitada com o hash salvo no banco
            const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

            if (!senhaCorreta) {
                throw new Error('Senha incorreta.');
            }

            // Remove a senha do objeto antes de retornar
            delete usuario.senha;

            return usuario;

        } finally {
            connection.release();
        }
    }


}

module.exports = new UsuarioService();