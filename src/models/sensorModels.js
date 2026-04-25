/*
  Módulo responsável por montar e executar queries relacionadas aos sensores no banco de dados.

  Funcionalidades:
  - Cria query que executa a inserção de novos sensores no banco
  - Cria query que executa a listagem de todos os sensores cadastrados
  - Cria query que executa a remoção de um sensor do banco
  - Cria query que executa a inserção de dados (leituras) enviados pelos sensores

  Operações:
  - INSERT → Cadastra um novo sensor ou insere leituras
  - SELECT → Lista ou busca sensores
  - UPDATE → Atualiza dados do sensor
  - DELETE → Remove sensor

  Integração:
  - É utilizado pelo sensorController, que chama as funções
    responsáveis por montar e executar as queries conforme a necessidade.

  Objetivo:
  - Centralizar o acesso ao banco de dados relacionado aos sensores,
    mantendo as queries organizadas e separadas da lógica da aplicação
*/