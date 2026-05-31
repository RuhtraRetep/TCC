const db = require('../config/db');

const regras = {
    SALA:        ["ENERGIA"],
    BANHEIRO:    ["AGUA", "ENERGIA"],
    PATIO:       ["ENERGIA"],
    QUADRA:      ["AGUA", "ENERGIA"],
    LABORATORIO: ["ENERGIA"],
    COZINHA:     ["AGUA", "ENERGIA"]
};

class SensorService {

    async cadastrarAmbiente(nome, tipo, escolaId) {

        const connection = await db.getConnection();

        try {
            await connection.beginTransaction();

            // 1. Salva o ambiente vinculado à escola
            const [resultAmbiente] = await connection.execute(
                "INSERT INTO ambientes (nome, tipo, fk_id_escola) VALUES (?, ?, ?)",
                [nome, tipo, escolaId]
            );
            const ambienteId = resultAmbiente.insertId;

            // 2. Sensores do tipo de ambiente
            const tiposSensores = regras[tipo] || ["ENERGIA"];

            for (const nomeSensor of tiposSensores) {
                const [rows] = await connection.execute(
                    "SELECT id FROM tipos_sensores WHERE nome = ?",
                    [nomeSensor]
                );

                let tipoSensorId;
                if (rows.length > 0) {
                    tipoSensorId = rows[0].id;
                } else {
                    const [novoTipo] = await connection.execute(
                        "INSERT INTO tipos_sensores (nome) VALUES (?)",
                        [nomeSensor]
                    );
                    tipoSensorId = novoTipo.insertId;
                }

                await connection.execute(
                    "INSERT INTO sensores_ambientes (ambiente_id, tipo_sensor_id) VALUES (?, ?)",
                    [ambienteId, tipoSensorId]
                );
            }

            await connection.commit();

            return { id: ambienteId, nome, tipo, sensores: tiposSensores };

        } catch (error) {
            await connection.rollback();
            throw new Error("Erro ao cadastrar ambiente: " + error.message);
        } finally {
            connection.release();
        }
    }

    // Lista apenas os ambientes da escola logada
    async listarAmbientes(escolaId) {
        const [rows] = await db.execute(`
            SELECT 
                a.id,
                a.nome,
                a.tipo,
                GROUP_CONCAT(ts.nome ORDER BY ts.nome SEPARATOR ',') AS sensores
            FROM ambientes a
            LEFT JOIN sensores_ambientes sa ON sa.ambiente_id = a.id
            LEFT JOIN tipos_sensores ts ON ts.id = sa.tipo_sensor_id
            WHERE a.fk_id_escola = ?
            GROUP BY a.id, a.nome, a.tipo
            ORDER BY a.data_cadastro DESC
        `, [escolaId]);

        return rows.map(r => ({
            ...r,
            sensores: r.sensores ? r.sensores.split(',') : []
        }));
    }

    // Remove apenas se o ambiente pertence à escola logada
    async removerAmbiente(id, escolaId) {
        const [result] = await db.execute(
            "DELETE FROM ambientes WHERE id = ? AND fk_id_escola = ?",
            [id, escolaId]
        );
        if (result.affectedRows === 0) {
            throw new Error("Ambiente não encontrado ou sem permissão.");
        }
        return true;
    }

    // Função original mantida para a rota de previsão
    preverSensores(ambientes) {
        const sensores = [];
        ambientes.forEach(ambiente => {
            const tiposSensores = regras[ambiente.tipo] || ["ENERGIA"];
            tiposSensores.forEach(sensor => {
                sensores.push({ tipo: sensor, localizacao: ambiente.nome });
            });
        });
        return { totalSensores: sensores.length, sensores };
    }
}

module.exports = new SensorService();