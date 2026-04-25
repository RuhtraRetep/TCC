/*
  Módulo responsável por montar e executar queries relacionadas às escolas no banco de dados.

  Funcionalidades:
  - Cria query que executa a inserção de novas escolas no banco
  - Cria query que executa a listagem de todas as escolas cadastradas
  - Cria query que executa a busca de uma escola específica por ID
  - Cria query que executa a atualização dos dados de uma escola
  - Cria query que executa a remoção de uma escola do banco

  Operações:
  - INSERT → Cadastra uma nova escola
  - UPDATE → Atualiza dados da escola
  - DELETE → Remove escola

  Integração:
  - É utilizado pelo escolaController, que chama as funções
    responsáveis por montar e executar as queries conforme a necessidade.

  Objetivo:
  - Centralizar o acesso ao banco de dados, mantendo as queries organizadas
    e separadas da lógica da aplicação
*/