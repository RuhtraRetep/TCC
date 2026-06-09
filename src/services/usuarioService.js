const db = require('../config/db');




class UsuarioService {

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

            // Camada 4: verifica a senha
            if (usuario.senha !== senha) {
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