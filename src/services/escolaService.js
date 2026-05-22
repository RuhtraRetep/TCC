const db = require('../config/db');

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
                    dadosEscola.endereco.logradouro,
                    dadosEscola.endereco.numero,
                    dadosEscola.endereco.bairro,
                    dadosEscola.endereco.cidade,
                    dadosEscola.endereco.cep
                ]
            );

            // Pega o ID do endereço criado
            const fk_id_endereco = resultadoEndereco.insertId;

            // =========================
            // CADASTRO DA ESCOLA
            // =========================
            const queryEscola = "INSERT INTO Escolas (nome_fantasia, razao_social, cnpj, codigo_inep, tipo_gestao, email, telefone, fk_id_endereco) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

            const [resultadoEscola] = await connection.execute(
                queryEscola,
                [
                    dadosEscola.nomeFantasia,
                    dadosEscola.razaoSocial,
                    dadosEscola.cnpj,
                    dadosEscola.codigoInep || null,
                    dadosEscola.tipoGestao,
                    dadosEscola.email || null,
                    dadosEscola.telefone?.numero || null, // Ajustado para pegar a propriedade correta se for um objeto
                    fk_id_endereco
                ]
            );

            // Pega o ID da escola criada para usar no telefone
            const fk_id_escola = resultadoEscola.insertId;

            // =========================
            // CADASTRO DO TELEFONE
            // =========================
            const queryTelefone = "INSERT INTO Telefones (fk_id_escola, pais, ddd, numero, tipo, principal, ativo) VALUES (?, ?, ?, ?, ?, ?, ?)";

            await connection.execute(
                queryTelefone,
                [
                    fk_id_escola, // Usando o ID da escola que acabou de ser criada
                    dadosEscola.telefone.pais,
                    dadosEscola.telefone.ddd,
                    dadosEscola.telefone.numero,
                    dadosEscola.telefone.tipo,
                    dadosEscola.telefone.principal,
                    dadosEscola.telefone.ativo
                ]
            );

            // Salva definitivamente todas as operações se nenhuma falhar
            await connection.commit();

            return {
                sucesso: true,
                mensagem: 'Escola, endereço e telefone cadastrados com sucesso.',
                idEscola: fk_id_escola
            };

        } catch (error) {

            // Desfaz tudo se der erro
            await connection.rollback();

            // Erro de valor duplicado
            if (error.errno === 1062) {

                throw new Error(
                    'CNPJ ou código INEP já cadastrado.'
                );
            }

            throw new Error(
                'Erro ao cadastrar escola: ' +
                error.message
            );

        } finally {

            // Libera conexão
            connection.release();
        }
    }
}

module.exports = new EscolaService();