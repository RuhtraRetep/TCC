/*
  Módulo responsável por processar as requisições relacionadas aos sensores.

  Funcionalidades:
  - Recebe os dados para cadastro de um novo sensor e chama o sensorModel para executar a query de inserção
  - Recebe requisições para listagem de sensores e chama o sensorModel para executar a query de consulta
  - Recebe dados (leituras) enviados pelos sensores e chama o sensorModel para executar a query de inserção das leituras
  - Pode processar informações de monitoramento e status dos sensores

  Responsabilidades:
  - Receber dados da requisição (req)
  - Validar informações básicas (quando necessário)
  - Chamar o model responsável pela operação no banco
  - Retornar a resposta adequada (res) para o cliente

  Integração:
  - Utiliza o sensorModel para acesso ao banco de dados
  - Pode utilizar services (ex: previsaoService, gastoService) para aplicar regras de negócio quando necessário
  - Pode integrar com simulação de dados via MQTT

  Objetivo:
  - Controlar o fluxo das operações relacionadas aos sensores,
    garantindo o registro, a consulta e o processamento dos dados coletados
*/