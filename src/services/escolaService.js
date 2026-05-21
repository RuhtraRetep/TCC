// 1. Importa a conexão com o banco de dados primeiro
const db = require('../config/db'); 

class EscolaService {
    // Alinhado o nome do parâmetro para fk_id_endereco
    async cadastrarEscola(dadosEscola, fk_id_endereco) {
        const query = `
            INSERT INTO Escolas 
            (nome_fantasia, razao_social, cnpj, codigo_inep, tipo_gestao, email, telefone, fk_id_endereco) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const valores = [
            dadosEscola.nomeFantasia,
            dadosEscola.razaoSocial,
            dadosEscola.cnpj,   
            dadosEscola.codigoInep || null, 
            dadosEscola.tipoGestao,
            dadosEscola.email || null,
            dadosEscola.telefone || null,
            fk_id_endereco // Agora bate perfeitamente com o parâmetro lá de cima!
        ];

        try {
            // Executa a query de forma compatível
            const [resultado] = await db.execute(query, valores);
            return { id: resultado.insertId, ...dadosEscola };
        } catch (error) {
            // Trata erros duplicados de CNPJ ou INEP (Erro 1062 no MySQL)
            if (error.errno === 1062) {
                throw new Error('CNPJ ou Código INEP já cadastrado.');
            }
            throw new Error('Erro ao cadastrar a escola no banco de dados: ' + error.message);
        }
    }
}

// Exporta o serviço para ser usado nas rotas
module.exports = new EscolaService();