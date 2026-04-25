/*
  Módulo responsável por definir as rotas relacionadas às escolas no sistema.

  Funcionalidades:
  - Chama a rota do cadastro de escolas
  - Chama a rota de atualização dos dados da escola
  - Chama a rota de remoção da escola

  Rotas:
  - POST /escolas → Cadastra uma nova escola
  - PUT /escolas/:id → Atualiza os dados da escola
  - DELETE /escolas/:id → Remove a escola do sistema

  Integração:
  - As requisições são direcionadas para o escolaController,
    responsável por processar a lógica e interagir com o banco de dados
    e possíveis serviços (ex: cálculo de sensores e previsão de gastos).

  Objetivo:
  - Gerenciar as informações das escolas cadastradas no sistema,
    permitindo o controle e organização dos ambientes monitorados
*/