const db = require('../config/db');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

class UsuarioService {

    async cadastroUsuario(dadosUsuario) {
        console.log("=================================");
        console.log("Dados recebidos:", dadosUsuario);
        
        // Pega a conexão do pool de Promises
        const connection = await db.getConnection();

        try {
            // Inicia transação de forma segura
            await connection.beginTransaction();

            // =========================
            // HASH DA SENHA
            // =========================
            const senhaHash = await bcrypt.hash(dadosUsuario.senha, SALT_ROUNDS);

            // =========================
            // CADASTRO DO USUÁRIO
            // =========================
            const queryUsuario = `
                INSERT INTO Usuarios 
                (nome_usuario, sobrenome_usuario, cpf, email, funcao, senha, fk_id_escola)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

            // Executa a query na conexão da transação
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

            // Confirma as alterações
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
            // Libera conexão de volta para o pool
            connection.release();
        }
    }

    async autenticar(emailEscola, codigoInep, emailUsuario, senha) {
        // Para uma consulta simples (SELECT), você NÃO precisa pegar uma conexão manual (.getConnection())
        // O próprio pool gerencia e libera a conexão automaticamente se você usar o `db.execute` direto!
        try {
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

            // Chamando direto do pool (db)
            const [rows] = await db.execute(query, [
                emailEscola,
                codigoInep,
                emailUsuario
            ]);

            if (rows.length === 0) {
                throw new Error('Dados da escola ou usuário incorretos.');
            }

            const usuario = rows[0];
            const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

            if (!senhaCorreta) {
                throw new Error('Senha incorreta.');
            }

            delete usuario.senha;
            return usuario;

        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new UsuarioService();