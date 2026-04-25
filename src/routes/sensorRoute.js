/*
  Módulo responsável por definir as rotas relacionadas aos sensores do sistema.

  Funcionalidades:
  - Chama a rota do cadastro de sensores nos ambientes da escola
  - Chama a rota da listagem e consulta de sensores cadastrados
  - Chama a rota do recebimento de dados (leituras) enviados pelos sensores

  Rotas:
  - POST /sensores → Cadastra um novo sensor
  - GET /sensores → Lista todos os sensores cadastrados
  - GET /sensores/:id → Retorna informações de um sensor específico
  - POST /sensores/dados → Recebe dados enviados pelos sensores (ex: consumo de água/energia)

  Integração:
  - As requisições são direcionadas para o sensorController,
    responsável por processar a lógica e interagir com o banco de dados
    e possíveis serviços (ex: simulação via MQTT).

  Objetivo:
  - Gerenciar e monitorar os sensores responsáveis pela coleta de dados
    de consumo de água e energia nos ambientes escolares
*/