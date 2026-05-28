/*
=========================================================
SERVIÇO DE PREVISÃO DE SENSORES PARA ESCOLAS
============s=============================================

Objetivo:
- Realizar a previsão da quantidade e dos tipos de sensores
  necessários para ambientes escolares.

Sensores disponíveis:
- Água
- Energia

Ambientes suportados:
- Sala
- Banheiro
- Pátio
- Quadra
- Laboratório
- Cozinha

=========================================================
*/
function preverSensores(ambientes) {
    const sensores = [];

    const regras = {
        SALA: ["ENERGIA"],
        BANHEIRO: ["AGUA", "ENERGIA"],
        PATIO: ["ENERGIA"],
        QUADRA: ["AGUA", "ENERGIA"],
        LABORATORIO: ["ENERGIA"],
        COZINHA: ["AGUA", "ENERGIA"]
    };

    ambientes.forEach((ambiente) => {
        const tiposSensores = regras[ambiente.tipo] || ["ENERGIA"];

        tiposSensores.forEach((sensor) => {
            sensores.push({
                tipo: sensor,
                localizacao: ambiente.nome
            });
        });
    });

    return {
        totalSensores: sensores.length,
        sensores
    };
}

module.exports = { preverSensores };

