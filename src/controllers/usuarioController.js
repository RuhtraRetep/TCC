/*
  Módulo responsável por processar as requisições relacionadas aos usuários do sistema.

  Funcionalidades:
  - Recebe os dados para cadastro de um novo usuário e chama o userModel para executar a query de inserção
  - Recebe os dados de login e chama o userModel para buscar o usuário pelo email
  - Realiza a validação das credenciais do usuário durante o login

  Responsabilidades:
  - Receber dados da requisição (req)
  - Validar informações básicas (quando necessário)
  - Chamar o model responsável pela operação no banco
  - Retornar a resposta adequada (res) para o cliente

  Integração:
  - Utiliza o userModel para acesso ao banco de dados
  - Pode utilizar bibliotecas para autenticação (ex: criptografia de senha e geração de token)

  Objetivo:
  - Controlar o fluxo de cadastro e autenticação de usuários,
    garantindo acesso seguro ao sistema
*/