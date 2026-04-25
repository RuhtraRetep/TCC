/*
  Módulo responsável por montar e executar queries relacionadas aos usuários no banco de dados.

  Funcionalidades:
  - Cria query que executa a inserção de novos usuários no banco
  - Cria query que executa a busca de um usuário pelo email (para autenticação)
  - Cria query que executa a listagem de usuários cadastrados

  Operações:
  - INSERT → Cadastra um novo usuário
  - SELECT → Busca usuário por email ou lista usuários

  Integração:
  - É utilizado pelo userController, que chama as funções
    responsáveis por montar e executar as queries conforme a necessidade.

  Objetivo:
  - Centralizar o acesso ao banco de dados relacionado aos usuários,
    mantendo as queries organizadas e separadas da lógica da aplicação
*/