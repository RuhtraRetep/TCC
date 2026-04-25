/*
  Módulo responsável por configurar e estabelecer a conexão
  com o banco de dados MySQL.

  Funcionalidades:
  - Define os parâmetros de conexão com o banco
  - Cria a conexão com o MySQL
  - Disponibiliza a conexão para os models executarem queries

  Integração:
  - É utilizado pelos models, que importam este módulo
    para executar operações no banco de dados

  Objetivo:
  - Centralizar a configuração de acesso ao banco,
    facilitando manutenção e reutilização da conexão
*/