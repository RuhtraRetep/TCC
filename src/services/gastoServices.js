const db = require('../config/db');

class GastoServices {
    static tarifaAgua = 5.50;
    static tarifaEnergia = 0.92;

    static calcular(consumoAgua, consumoEnergia) {
        consumoAgua = Number(consumoAgua) || 0;
        consumoEnergia = Number(consumoEnergia) || 0;

        const valorAgua = consumoAgua * this.tarifaAgua;
        const valorEnergia = consumoEnergia * this.tarifaEnergia;
        const total = valorAgua + valorEnergia;

        return {
            consumoAgua,
            consumoEnergia,
            valorAgua,
            valorEnergia,
            total
        };
    }

    static async salvarHistorico(ambienteId, dados) {
        const sql = `
            INSERT INTO historico_gastos
            (ambiente_id, consumo_agua, consumo_energia, valor_agua, valor_energia, total)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        await db.execute(sql, [
            ambienteId,
            dados.consumoAgua,
            dados.consumoEnergia,
            dados.valorAgua,
            dados.valorEnergia,
            dados.total
        ]);
    }
}

module.exports = GastoServices;