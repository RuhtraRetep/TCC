/*
  Arquivo principal responsável pela inicialização e configuração geral da aplicação backend.

  Funcionalidades:
  - Inicializa o servidor utilizando o framework Express
  - Configura middlewares globais para tratamento de requisições (ex: parsing de JSON)
  - Define e registra as rotas da aplicação (usuários, escolas e sensores)
  - Integra os diferentes módulos do sistema (routes, controllers, models e services)
  - Garante a inicialização da conexão com o banco de dados

  Responsabilidades:
  - Atuar como ponto de entrada da aplicação
  - Centralizar todas as configurações principais do servidor
  - Garantir que os módulos estejam corretamente conectados
  - Definir a porta de execução do servidor

  Rotas Integradas:
  - /users → Rotas relacionadas aos usuários (cadastro, login)
  - /escolas → Rotas relacionadas às escolas
  - /sensores → Rotas relacionadas aos sensores e suas leituras

  Fluxo da Aplicação:
  - Cliente realiza uma requisição HTTP
  - A requisição é recebida pelo servidor Express
  - A rota correspondente é acionada
  - O controller processa a requisição
  - O controller pode utilizar services (regras de negócio) e models (acesso ao banco)
  - Uma resposta é enviada ao cliente

  Integração:
  - Utiliza os módulos de rotas (userRoutes, escolaRoutes, sensorRoutes)
  - Depende da configuração de banco de dados (db.js)
  - Pode integrar serviços adicionais (ex: MQTT para simulação de sensores)

  Objetivo:
  - Servir como núcleo da aplicação backend,
    garantindo a organização, integração e funcionamento correto de todos os componentes
*/