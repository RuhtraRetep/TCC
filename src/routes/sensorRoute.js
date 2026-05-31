const express = require('express');
const router  = express.Router();
const sensorService = require('../services/sensorServices');

// Middleware: só passa quem está logado e tem escola vinculada
function autenticado(req, res, next) {
    if (req.session.usuario?.escolaId) {
        next();
    } else {
        res.status(401).json({ sucesso: false, erro: 'Não autenticado.' });
    }
}

// GET /sensores/ambientes — lista ambientes da escola logada
router.get('/ambientes', autenticado, async (req, res) => {
    try {
        const escolaId = req.session.usuario.escolaId;
        const ambientes = await sensorService.listarAmbientes(escolaId);
        return res.status(200).json({ sucesso: true, ambientes });
    } catch (error) {
        return res.status(500).json({ sucesso: false, erro: error.message });
    }
});

// POST /sensores/ambientes — cadastra ambiente vinculado à escola logada
router.post('/ambientes', autenticado, async (req, res) => {
    const { nome, tipo } = req.body;

    if (!nome || !tipo) {
        return res.status(400).json({ sucesso: false, erro: 'Nome e tipo são obrigatórios.' });
    }

    try {
        const escolaId = req.session.usuario.escolaId;
        const ambiente = await sensorService.cadastrarAmbiente(nome, tipo, escolaId);
        return res.status(201).json({ sucesso: true, ambiente });
    } catch (error) {
        return res.status(500).json({ sucesso: false, erro: error.message });
    }
});

// DELETE /sensores/ambientes/:id — remove apenas se pertence à escola logada
router.delete('/ambientes/:id', autenticado, async (req, res) => {
    try {
        const escolaId = req.session.usuario.escolaId;
        await sensorService.removerAmbiente(req.params.id, escolaId);
        return res.status(200).json({ sucesso: true, mensagem: 'Ambiente removido.' });
    } catch (error) {
        return res.status(404).json({ sucesso: false, erro: error.message });
    }
});

module.exports = router;