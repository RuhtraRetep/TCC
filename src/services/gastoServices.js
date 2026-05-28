/*
  Serviço responsável por calcular os gastos de água e energia
  com base nos dados coletados pelos sensores.

  Entrada:
  - Dados de consumo (água e energia)

  Processo:
  - Aplica valores tarifários sobre o consumo
  - Calcula o custo total

  Saída:
  - Valor gasto com água
  - Valor gasto com energia
  - Total geral

  Observação:
  - Os cálculos são baseados em dados simulados dos sensores
*/

const db =
require('../config/db');

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

    static salvarHistorico(
        ambienteId,
        dados
    ) {

        const sql = `
            INSERT INTO historico_gastos
            (
                ambiente_id,
                consumo_agua,
                consumo_energia,
                valor_agua,
                valor_energia,
                total
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(sql, [

            ambienteId,

            dados.consumoAgua,
            dados.consumoEnergia,

            dados.valorAgua,
            dados.valorEnergia,

            dados.total

        ], (erro) => {

            if (erro) {

                console.log(erro);
                return;
            }

            console.log(
                'Histórico salvo'
            );
        });
    }
}

module.exports =
GastoServices;