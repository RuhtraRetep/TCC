const db           = require('../config/db');
const GastoServices = require('./gastoServices');

async function iniciarMonitoramento() {

    setInterval(async () => {
        try {
            console.log('Atualizando sensores...');

            // Busca todos os ambientes cadastrados no banco
            const [ambientes] = await db.execute('SELECT id, tipo FROM ambientes');

            if (ambientes.length === 0) {
                console.log('Nenhum ambiente cadastrado ainda.');
                return;
            }

            const regras = {
                SALA:        { agua: 0,    energia: 0.20 },
                LABORATORIO: { agua: 0,    energia: 0.30 },
                PATIO:       { agua: 0,    energia: 0.08 },
                BANHEIRO:    { agua: 0.15, energia: 0.10 },
                COZINHA:     { agua: 0.20, energia: 0.25 },
                QUADRA:      { agua: 0.05, energia: 0.12 }
            };

            // Para cada ambiente, simula e salva o histórico individualmente
            for (const ambiente of ambientes) {
                const regra = regras[ambiente.tipo] || { agua: 0, energia: 0.10 };

                const consumoAgua    = Math.random() * regra.agua;
                const consumoEnergia = Math.random() * regra.energia;

                const gastos = GastoServices.calcular(consumoAgua, consumoEnergia);

                GastoServices.salvarHistorico(ambiente.id, gastos);
            }

        } catch (erro) {
            console.error('Erro no monitoramento de sensores:', erro.message);
        }

    }, 15000);
}

module.exports = iniciarMonitoramento;