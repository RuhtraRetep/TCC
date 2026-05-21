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

class SensorService {

    /*
    =========================================================
    Método principal responsável pela previsão dos sensores
    =========================================================
    */
    preverSensores(ambientes) {

        // Lista que armazenará todos os sensores recomendados
        const sensores = [];

        // Percorre todos os ambientes informados
        ambientes.forEach((ambiente) => {

            switch (ambiente.tipo) {

                /*
                ============================================
                SALAS
                ============================================
                */
                case "SALA":

                    sensores.push({
                        tipo: "ENERGIA",
                        localizacao: ambiente.nome,
                        descricao: "Monitoramento de consumo elétrico da sala"
                    });

                    break;

                /*
                ============================================
                BANHEIROS
                ============================================
                */
                case "BANHEIRO":

                    sensores.push({
                        tipo: "AGUA",
                        localizacao: ambiente.nome,
                        descricao: "Monitoramento de consumo de água"
                    });

                    sensores.push({
                        tipo: "ENERGIA",
                        localizacao: ambiente.nome,
                        descricao: "Monitoramento de energia do banheiro"
                    });

                    break;

                /*
                ============================================
                PÁTIOS
                ============================================
                */
                case "PATIO":

                    sensores.push({
                        tipo: "ENERGIA",
                        localizacao: ambiente.nome,
                        descricao: "Monitoramento de iluminação do pátio"
                    });

                    break;

                /*
                ============================================
                QUADRAS
                ============================================
                */
                case "QUADRA":

                    sensores.push({
                        tipo: "ENERGIA",
                        localizacao: ambiente.nome,
                        descricao: "Monitoramento da iluminação da quadra"
                    });

                    sensores.push({
                        tipo: "AGUA",
                        localizacao: ambiente.nome,
                        descricao: "Monitoramento hidráulico da quadra"
                    });

                    break;

                /*
                ============================================
                LABORATÓRIOS
                ============================================
                */
                case "LABORATORIO":

                    sensores.push({
                        tipo: "ENERGIA",
                        localizacao: ambiente.nome,
                        descricao: "Controle de equipamentos elétricos"
                    });

                    sensores.push({
                        tipo: "AGUA",
                        localizacao: ambiente.nome,
                        descricao: "Controle de utilização de água"
                    });

                    break;

                /*
                ============================================
                COZINHAS
                ============================================
                */
                case "COZINHA":

                    sensores.push({
                        tipo: "AGUA",
                        localizacao: ambiente.nome,
                        descricao: "Controle de consumo de água da cozinha"
                    });

                    sensores.push({
                        tipo: "ENERGIA",
                        localizacao: ambiente.nome,
                        descricao: "Controle de equipamentos elétricos"
                    });

                    break;

                /*
                ============================================
                AMBIENTE NÃO IDENTIFICADO
                ============================================
                */
                default:

                    sensores.push({
                        tipo: "ENERGIA",
                        localizacao: ambiente.nome,
                        descricao: "Sensor padrão de energia"
                    });

                    break;
            }
        });

        /*
        ============================================
        RETORNO DA PREVISÃO
        ============================================
        */
        return {

            totalSensores: sensores.length,

            totalSensoresAgua:
                sensores.filter(sensor =>
                    sensor.tipo === "AGUA"
                ).length,

            totalSensoresEnergia:
                sensores.filter(sensor =>
                    sensor.tipo === "ENERGIA"
                ).length,

            sensores
        };
    }
}

/*
=========================================================
EXPORTAÇÃO DO SERVIÇO
=========================================================
*/
module.exports = new SensorService();