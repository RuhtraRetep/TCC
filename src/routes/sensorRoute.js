const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');

const db = require('../config/db');
const sensorService = require('../services/sensorServices');
const { iniciarMonitoramento, estaAtivo } = require('../services/sensorMonitorService');

function autenticado(req, res, next) {
    if (req.session.usuario?.escolaId) {
        next();
    } else {
        res.status(401).json({
            sucesso: false,
            erro: 'Não autenticado.'
        });
    }
}

// LISTAR AMBIENTES
router.get('/ambientes', autenticado, async (req, res) => {
    try {
        const escolaId = req.session.usuario.escolaId;
        const ambientes = await sensorService.listarAmbientes(escolaId);

        return res.status(200).json({
            sucesso: true,
            ambientes
        });

    } catch (error) {
        return res.status(500).json({
            sucesso: false,
            erro: error.message
        });
    }
});

// CADASTRAR AMBIENTE
router.post('/ambientes', autenticado, async (req, res) => {
    const { nome, tipo } = req.body;

    if (!nome || !tipo) {
        return res.status(400).json({
            sucesso: false,
            erro: 'Nome e tipo são obrigatórios.'
        });
    }

    try {
        const escolaId = req.session.usuario.escolaId;
        const ambiente = await sensorService.cadastrarAmbiente(nome, tipo, escolaId);

        if (!estaAtivo()) {
            iniciarMonitoramento();
        }

        return res.status(201).json({
            sucesso: true,
            ambiente
        });

    } catch (error) {
        return res.status(500).json({
            sucesso: false,
            erro: error.message
        });
    }
});

// REMOVER AMBIENTE
router.delete('/ambientes/:id', autenticado, async (req, res) => {
    try {
        const escolaId = req.session.usuario.escolaId;

        await sensorService.removerAmbiente(req.params.id, escolaId);

        return res.status(200).json({
            sucesso: true,
            mensagem: 'Ambiente removido.'
        });

    } catch (error) {
        return res.status(404).json({
            sucesso: false,
            erro: error.message
        });
    }
});

// GASTOS PARA A TELA DE SENSORES
router.get('/gastos', autenticado, async (req, res) => {
    try {
        const escolaId = req.session.usuario.escolaId;

        const [dados] = await db.execute(`
            SELECT
                a.id,
                a.nome,
                a.tipo,
                COALESCE(SUM(h.consumo_agua), 0) AS consumo_agua,
                COALESCE(SUM(h.consumo_energia), 0) AS consumo_energia,
                COALESCE(SUM(h.valor_agua), 0) AS valor_agua,
                COALESCE(SUM(h.valor_energia), 0) AS valor_energia,
                COALESCE(SUM(h.total), 0) AS total
            FROM ambientes a
            LEFT JOIN historico_gastos h
                ON h.ambiente_id = a.id
            WHERE a.fk_id_escola = ?
            GROUP BY a.id, a.nome, a.tipo
            ORDER BY a.data_cadastro DESC
        `, [escolaId]);

        return res.status(200).json({
            sucesso: true,
            gastos: dados
        });

    } catch (error) {
        return res.status(500).json({
            sucesso: false,
            erro: error.message
        });
    }
});

// DASHBOARD REAL DO BANCO
router.get('/dashboard', autenticado, async (req, res) => {
    try {
        const escolaId = req.session.usuario.escolaId;
        const periodo = req.query.periodo || '7dias';

        let filtroData = '';

        if (periodo === 'hoje') {
            filtroData = 'AND DATE(h.data_registro) = CURDATE()';
        } else if (periodo === '7dias') {
            filtroData = 'AND h.data_registro >= DATE_SUB(NOW(), INTERVAL 7 DAY)';
        } else if (periodo === '30dias') {
            filtroData = 'AND h.data_registro >= DATE_SUB(NOW(), INTERVAL 30 DAY)';
        } else if (periodo === '90dias') {
            filtroData = 'AND h.data_registro >= DATE_SUB(NOW(), INTERVAL 90 DAY)';
        }

        const [ambientes] = await db.execute(`
            SELECT
                a.id,
                a.nome,
                a.tipo,
                COALESCE(SUM(h.valor_agua), 0) AS valor_agua,
                COALESCE(SUM(h.valor_energia), 0) AS valor_energia,
                COALESCE(SUM(h.total), 0) AS total
            FROM ambientes a
            LEFT JOIN historico_gastos h
                ON h.ambiente_id = a.id
                ${filtroData}
            WHERE a.fk_id_escola = ?
            GROUP BY a.id, a.nome, a.tipo
            ORDER BY total DESC
        `, [escolaId]);

        const [historico] = await db.execute(`
            SELECT
                DATE(h.data_registro) AS dia,
                COALESCE(SUM(h.valor_agua), 0) AS valor_agua,
                COALESCE(SUM(h.valor_energia), 0) AS valor_energia,
                COALESCE(SUM(h.total), 0) AS total
            FROM historico_gastos h
            INNER JOIN ambientes a
                ON a.id = h.ambiente_id
            WHERE a.fk_id_escola = ?
            ${filtroData.replaceAll('h.', 'h.')}
            GROUP BY DATE(h.data_registro)
            ORDER BY dia ASC
        `, [escolaId]);

        return res.status(200).json({
            sucesso: true,
            ambientes,
            historico
        });

    } catch (error) {
        return res.status(500).json({
            sucesso: false,
            erro: error.message
        });
    }
});

router.get('/relatorio-pdf', autenticado, async (req, res) => {
    try {
        const escolaId = req.session.usuario.escolaId;
        const usuarioNome = req.session.usuario.nome || 'Usuário';

        const [escolaRows] = await db.execute(`
            SELECT nome_fantasia
            FROM Escolas
            WHERE id_escola = ?
        `, [escolaId]);

        const nomeEscola = escolaRows.length > 0
            ? escolaRows[0].nome_fantasia
            : 'Escola não encontrada';

        const [dados] = await db.execute(`
            SELECT
                a.nome,
                a.tipo,
                COALESCE(SUM(h.consumo_agua), 0) AS consumo_agua,
                COALESCE(SUM(h.consumo_energia), 0) AS consumo_energia,
                COALESCE(SUM(h.valor_agua), 0) AS valor_agua,
                COALESCE(SUM(h.valor_energia), 0) AS valor_energia,
                COALESCE(SUM(h.total), 0) AS total
            FROM ambientes a
            LEFT JOIN historico_gastos h
                ON h.ambiente_id = a.id
            WHERE a.fk_id_escola = ?
            GROUP BY a.id, a.nome, a.tipo
            ORDER BY total DESC
        `, [escolaId]);

        const doc = new PDFDocument({
            margin: 40,
            size: 'A4'
        });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=relatorio-gastos-sge.pdf'
        );

        doc.pipe(res);

        const teal = '#00b894';
        const navy = '#0d1117';
        const gray = '#666666';
        const lightGray = '#f2f2f2';

        const formatar = valor =>
            `R$ ${Number(valor || 0).toFixed(2).replace('.', ',')}`;

        let totalAgua = 0;
        let totalEnergia = 0;
        let totalGeral = 0;

        dados.forEach(item => {
            totalAgua += Number(item.valor_agua);
            totalEnergia += Number(item.valor_energia);
            totalGeral += Number(item.total);
        });

        // CABEÇALHO
        doc.rect(0, 0, doc.page.width, 105).fill(navy);

        doc.fillColor(teal)
            .fontSize(22)
            .text('SGE Escolar', 40, 24);

        doc.fillColor('#ffffff')
            .fontSize(14)
            .text('Relatório de Consumo e Gastos', 40, 52);

        doc.fillColor('#ffffff')
            .fontSize(10)
            .text(`Escola: ${nomeEscola}`, 40, 75);

        doc.fillColor('#ffffff')
            .fontSize(9)
            .text(
                `Emitido em: ${new Date().toLocaleString('pt-BR')}`,
                360,
                30,
                { width: 190, align: 'right' }
            );

        doc.fillColor('#ffffff')
            .fontSize(9)
            .text(
                `Gerado por: ${usuarioNome}`,
                360,
                48,
                { width: 190, align: 'right' }
            );

        doc.y = 130;

        // RESUMO
        doc.fillColor(navy)
            .fontSize(16)
            .text('Resumo Geral', 40, doc.y);

        doc.moveDown(0.8);

        const cardY = doc.y;
        const cardW = 160;
        const cardH = 70;
        const gap = 15;

        function card(x, titulo, valor, cor) {
            doc.roundedRect(x, cardY, cardW, cardH, 10)
                .fillAndStroke(lightGray, '#dddddd');

            doc.fillColor(gray)
                .fontSize(10)
                .text(titulo, x + 14, cardY + 14);

            doc.fillColor(cor)
                .fontSize(17)
                .text(valor, x + 14, cardY + 34);
        }

        card(40, 'Total em Água', formatar(totalAgua), '#2980b9');
        card(40 + cardW + gap, 'Total em Energia', formatar(totalEnergia), teal);
        card(40 + (cardW + gap) * 2, 'Total Geral', formatar(totalGeral), navy);

        doc.y = cardY + cardH + 35;

        // TABELA
        doc.fillColor(navy)
            .fontSize(16)
            .text('Gastos por Ambiente', 40, doc.y);

        doc.moveDown(0.8);

        const startX = 40;
        let y = doc.y;
        const rowH = 28;

        const cols = {
            ambiente: 40,
            tipo: 170,
            agua: 260,
            energia: 350,
            total: 455
        };

        function headerTabela() {
            doc.rect(startX, y, 515, rowH).fill(teal);

            doc.fillColor('#ffffff').fontSize(9);
            doc.text('Ambiente', cols.ambiente, y + 9);
            doc.text('Tipo', cols.tipo, y + 9);
            doc.text('Água', cols.agua, y + 9);
            doc.text('Energia', cols.energia, y + 9);
            doc.text('Total', cols.total, y + 9);

            y += rowH;
        }

        headerTabela();

        dados.forEach((item, index) => {
            if (y > 730) {
                doc.addPage();
                y = 50;
                headerTabela();
            }

            doc.rect(startX, y, 515, rowH)
                .fill(index % 2 === 0 ? '#ffffff' : '#f7f7f7');

            doc.fillColor('#222222').fontSize(8.5);
            doc.text(item.nome, cols.ambiente, y + 9, { width: 120 });
            doc.text(item.tipo, cols.tipo, y + 9, { width: 80 });
            doc.text(formatar(item.valor_agua), cols.agua, y + 9, { width: 80 });
            doc.text(formatar(item.valor_energia), cols.energia, y + 9, { width: 80 });
            doc.text(formatar(item.total), cols.total, y + 9, { width: 80 });

            y += rowH;
        });

        // INFORMAÇÕES FINAIS
        doc.y = y + 25;

       

        doc.moveDown(2);


        // RODAPÉ
        doc.fontSize(8)
            .fillColor(gray)
            .text(
                'SGE Escolar - Sistema de Gerenciamento Escolar',
                40,
                800,
                { align: 'center', width: 515 }
            );

        doc.end();

    } catch (error) {
        res.status(500).json({
            sucesso: false,
            erro: error.message
        });
    }
});

module.exports = router;