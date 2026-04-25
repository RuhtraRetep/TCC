/*
  Módulo responsável por definir as rotas relacionadas aos usuários do sistema.

  Funcionalidades:
  - Chama a rota do cadastro de novos usuários
  - Chama a rota da autenticação (login)
  - Chama a rota do possível gerenciamento de dados do usuário (perfil, atualização, etc.)

  Rotas:
  - POST /register → Realiza o cadastro de um novo usuário
  - POST /login → Autentica o usuário e permite acesso ao sistema

  Integração:
  - As requisições são direcionadas para o userController,
    responsável por processar a lógica e interagir com o banco de dados.

  Objetivo:
  - Gerenciar o acesso ao sistema de forma segura e organizada
*/