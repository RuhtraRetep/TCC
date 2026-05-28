const GastoServices =
require('./gastoServices');

function iniciarMonitoramento() {

    setInterval(() => {

        console.log(
            'Atualizando sensores...'
        );

        // consumo simulado

        const consumoAgua =
            Math.random() * 10;

        const consumoEnergia =
            Math.random() * 20;

        // cálculo dos gastos

        const gastos =
            GastoServices.calcular(
                consumoAgua,
                consumoEnergia
            );

        console.log(gastos);

        // salvar histórico

        GastoServices.salvarHistorico(
            1,
            gastos
        );

    }, 15000);
}

module.exports =
iniciarMonitoramento;