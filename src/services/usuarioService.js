const db = require('../config/db');

class UsuarioService {

    async autenticar(email, senha) {

        const connection = await db.getConnection();

        try {
            // Busca o usuário pelo e-mail
            const query = `
                SELECT id_usuario, nome_usuario, sobrenome_usuario,
                       email, funcao, senha, fk_id_escola
                FROM Usuarios
                WHERE email = ?
                LIMIT 1
            `;

            const [rows] = await connection.execute(query, [email]);

            if (rows.length === 0) {
                throw new Error('E-mail ou senha incorretos.');
            }

            const usuario = rows[0];

            // Compara a senha (texto simples por enquanto — sem bcrypt)
            if (usuario.senha !== senha) {
                throw new Error('E-mail ou senha incorretos.');
            }

            return usuario;

        } finally {
            connection.release();
        }
    }
}

module.exports = new UsuarioService();