/*
  Módulo responsável por processar as requisições relacionadas às escolas.

  Funcionalidades:
  - Recebe os dados para cadastro de uma nova escola e chama o escolaModel para executar a query de inserção
  - Recebe requisições para listagem de escolas e chama o escolaModel para executar a query de consulta
  - Recebe requisição para buscar uma escola específica por ID e chama o escolaModel para executar a query correspondente

  Responsabilidades:
  - Receber dados da requisição (req)
  - Validar informações básicas (quando necessário)
  - Chamar o model responsável pela operação no banco
  - Retornar a resposta adequada (res) para o cliente

  Integração:
  - Utiliza o escolaModel para acesso ao banco de dados
  - Pode utilizar services (ex: previsaoService) para aplicar regras de negócio quando necessário

  Objetivo:
  - Controlar o fluxo das operações relacionadas às escolas,
    garantindo a comunicação entre as rotas, os serviços e o banco de dados
*/