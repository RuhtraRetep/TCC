const db = require('../config/db');


class EscolaService {

    async cadastroEscolaCompleto(dadosEscola) {

        const connection = await db.getConnection();



        try {
            // ==========================================
            // VALIDAÇÕES DOS DADOS (PRINCIPAIS VERIFICAÇÕES)
            // ==========================================

            //  VERIFICAÇÃO NOME FANTASIA
            if (!dadosEscola.nomeFantasia || dadosEscola.nomeFantasia.trim().length <= 2 || dadosEscola.nomeFantasia.trim().length > 100) {
                throw new Error('O Nome Fantasia deve ter entre 3 e 100 caracteres.');
            }

            //  VERIFICAÇÃO RAZÃO SOCIAL
            if (!dadosEscola.razaoSocial || dadosEscola.razaoSocial.trim().length < 1 || dadosEscola.razaoSocial.trim().length > 60) {
                throw new Error('A Razão Social deve ter entre 1 e 60 caracteres.');
            }

            //  VERIFICAÇÃO CNPJ
            if (!dadosEscola.cnpj || !/^\d{14}$/.test(dadosEscola.cnpj.replace(/\D/g, ''))) {
                throw new Error('CNPJ inválido. Deve conter exatamente 14 dígitos.');
            }

            //  VERIFICAÇÃO CODIGO INEP
            if (!dadosEscola.codigoInep || !/^\d{8}$/.test(dadosEscola.codigoInep.replace(/\D/g, ''))) {
                throw new Error('Código INEP inválido. Deve conter exatamente 8 dígitos.');
            }

            //  VERIFICAÇÃO EMAIL
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!dadosEscola.email || !emailRegex.test(dadosEscola.email)) {
                throw new Error('Por favor, insira um e-mail válido.');
            }

            //  VERIFICAÇÃO TIPO GESTÃO
            if (!dadosEscola.tipoGestao) {
                throw new Error('O tipo de gestão é obrigatório.');
            }

            //  VERIFICAÇÃO ENDEREÇO COMPLETO
            if (!dadosEscola.endereco) {
                throw new Error('Os dados de endereço são obrigatórios.');
            }

            //  VERIFICAÇÃO CEP
            if (!dadosEscola.endereco.cep || !/^\d{8}$/.test(dadosEscola.endereco.cep.replace(/\D/g, ''))) {
                throw new Error('CEP inválido. Deve conter exatamente 8 dígitos.');
            }
            else{
                const resposta = await fetch (`https://viacep.com.br/ws/${dadosEscola.endereco.cep}/json/`);
                const dados = await resposta.json();

                if(dados.erro)
                {
                    throw new Error('CEP inválido.');
                }
            }

            //  VERIFICAÇÃO LOGRADOURO
            if (!dadosEscola.endereco.logradouro || !dadosEscola.endereco.bairro || !dadosEscola.endereco.cidade) {
                throw new Error('Logradouro, Bairro e Cidade são campos obrigatórios.');
            }

            //  VERIFICAÇÃO NÚMERO ENDEREÇO
            if (!dadosEscola.endereco.numero || !/^\d{1,5}$/.test(dadosEscola.endereco.numero)) {
                throw new Error('Número do endereço inválido. Deve conter de 1 a 5 números.');
            }

            //  VERIFICAÇÃO TELEFONE COMPLETO
            if (!dadosEscola.telefone) {
                throw new Error('Os dados de telefone são obrigatórios.');
            }

            //  VERIFICAÇÃO DDI
            if (!dadosEscola.telefone.pais || !/^\d{2,3}$/.test(dadosEscola.telefone.pais)) {
                throw new Error('Código do país inválido. Deve ter 2 ou 3 dígitos.');
            }

            //  VERIFICAÇÃO DDD
            if (!dadosEscola.telefone.ddd || !/^\d{2}$/.test(dadosEscola.telefone.ddd)) {
                throw new Error('DDD inválido. Deve conter exatamente 2 dígitos.');
            }

            //  VERIFICAÇÃO NÚMERO E TIPO TELEFONE
            const ehFixo = dadosEscola.telefone.tipo === 'Fixo';
            const numTelefoneLimpo = (dadosEscola.telefone.numero || '').replace(/\D/g, '');
            const regexTelefone = ehFixo ? /^\d{8}$/ : /^\d{9}$/;

            if (!regexTelefone.test(numTelefoneLimpo)) {
                const msg = ehFixo ? 'Telefone fixo inválido (deve ter 8 dígitos).' : 'Telefone celular inválido (deve ter 9 dígitos).';
                throw new Error(msg);
            }


            // ==========================================
            // FLUXO DO BANCO DE DADOS (SE PASSAR NAS VALIDAÇÕES)
            // ==========================================

            // Inicia transação
            await connection.beginTransaction();

            // =========================
            // CADASTRO DE ENDEREÇO
            // =========================
            const queryEndereco = "INSERT INTO Enderecos (logradouro, numero, bairro, cidade, cep) VALUES (?, ?, ?, ?, ?)";

            // Passamos os dados já limpos com .trim() ou replace se necessário
            const [resultadoEndereco] = await connection.execute(
                queryEndereco,
                [
                    dadosEscola.endereco.logradouro.trim(),
                    dadosEscola.endereco.numero,
                    dadosEscola.endereco.bairro.trim(),
                    dadosEscola.endereco.cidade.trim(),
                    dadosEscola.endereco.cep.replace(/\D/g, '')
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
                    dadosEscola.nomeFantasia.trim(),
                    dadosEscola.razaoSocial.trim(),
                    dadosEscola.cnpj.replace(/\D/g, ''),
                    dadosEscola.codigoInep.replace(/\D/g, ''),
                    dadosEscola.tipoGestao,
                    dadosEscola.email.trim().toLowerCase(), // Salva o email padronizado em minúsculo
                    fk_id_endereco
                ]
            );

            // Pega o ID da escola criada para usar no telefone
            const fk_id_escola = resultadoEscola.insertId;

            // =========================
            // CADASTRO DO TELEFONE
            // =========================
            const queryTelefone = "INSERT INTO Telefones (fk_id_escola, pais, ddd, numero, tipo, principal, ativo) VALUES ( ?, ?, ?, ?, ?, ?, ?)";

            // Garante a conversão dos booleanos / strings vindas do front-end para 1 ou 0 de forma estrita
            const ehPrincipal = (dadosEscola.telefone?.principal === true || dadosEscola.telefone?.principal === 'true' || dadosEscola.telefone?.principal === 1) ? 1 : 0;
            const ehAtivo = (dadosEscola.telefone?.ativo === true || dadosEscola.telefone?.ativo === 'true' || dadosEscola.telefone?.ativo === 1 || dadosEscola.telefone?.ativo === undefined) ? 1 : 0;

            await connection.execute(
                queryTelefone,
                [
                    fk_id_escola,
                    dadosEscola.telefone.pais,
                    dadosEscola.telefone.ddd,
                    numTelefoneLimpo,
                    dadosEscola.telefone.tipo,
                    ehPrincipal,
                    ehAtivo
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

            if (connection && connection.commit) {
                await connection.rollback();
            }

            if (error.errno === 1062) {
                throw new Error('CNPJ ou código INEP já cadastrado.');
            }

            throw new Error(error.message || 'Erro desconhecido no servidor');
        } finally {
            // Libera conexão
            if (connection) connection.release();
        }
    }
}


module.exports = new EscolaService();