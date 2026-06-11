const db = require('../config/db');
const GastoServices = require('./gastoServices');

let monitoramentoAtivo = false;
let intervalId = null;

const regras = {
    SALA:        { agua: 0,    energia: 0.20 },
    LABORATORIO: { agua: 0,    energia: 0.30 },
    PATIO:       { agua: 0,    energia: 0.08 },
    BANHEIRO:    { agua: 0.15, energia: 0.10 },
    COZINHA:     { agua: 0.20, energia: 0.25 },
    QUADRA:      { agua: 0.05, energia: 0.12 }
};

async function ambienteExiste(ambienteId) {
    const [rows] = await db.execute(
        'SELECT id FROM ambientes WHERE id = ? LIMIT 1',
        [ambienteId]
    );

    return rows.length > 0;
}

async function cicloMonitoramento() {
    try {
        const [ambientes] = await db.execute(`
            SELECT id, tipo
            FROM ambientes
        `);

        if (ambientes.length === 0) {
            return;
        }

        for (const ambiente of ambientes) {
            const existe = await ambienteExiste(ambiente.id);

            if (!existe) {
                continue;
            }

            const regra = regras[ambiente.tipo] || { agua: 0, energia: 0.10 };

            const consumoAgua = Number((Math.random() * regra.agua).toFixed(4));
            const consumoEnergia = Number((Math.random() * regra.energia).toFixed(4));

            const gastos = GastoServices.calcular(consumoAgua, consumoEnergia);

            try {
                await GastoServices.salvarHistorico(ambiente.id, gastos);
            } catch (erro) {
                if (erro.errno === 1452) {
                    console.log('[Monitor] Ambiente removido antes de salvar. Ignorando...');
                    continue;
                }

                throw erro;
            }
        }

    } catch (erro) {
        if (erro.code === 'ETIMEDOUT') {
            console.error('[Monitor] Banco demorou para responder. Tentando novamente no próximo ciclo.');
            return;
        }

        console.error('[Monitor] Erro:', erro.message);
    }
}

function iniciarMonitoramento() {
    if (monitoramentoAtivo) return;

    monitoramentoAtivo = true;

    cicloMonitoramento();

    intervalId = setInterval(() => {
        cicloMonitoramento();
    }, 15000);

    console.log('[Monitor] Simulador iniciado no backend.');
}

function pararMonitoramento() {
    if (!monitoramentoAtivo) return;

    clearInterval(intervalId);
    intervalId = null;
    monitoramentoAtivo = false;

    console.log('[Monitor] Simulador parado.');
}

function estaAtivo() {
    return monitoramentoAtivo;
}

module.exports = {
    iniciarMonitoramento,
    pararMonitoramento,
    estaAtivo
};