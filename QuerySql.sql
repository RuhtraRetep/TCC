CREATE DATABASE tcc;
use tcc;
CREATE TABLE Enderecos (
    id_endereco INT PRIMARY KEY AUTO_INCREMENT,
    logradouro VARCHAR(255) NOT NULL,
    numero VARCHAR(10) DEFAULT 'S/N',
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    cep CHAR(8) NOT NULL
);


CREATE TABLE Escolas (
	id_escola INT PRIMARY KEY AUTO_INCREMENT,
	nome_fantasia VARCHAR(150) NOT NULL,
	razao_social VARCHAR(255) NOT NULL,
	cnpj CHAR(14) NOT NULL UNIQUE,
	codigo_inep CHAR(8) UNIQUE,
	tipo_gestao ENUM('Pública', 'Privada') NOT NULL,
	email VARCHAR(100),
	fk_id_endereco INT NOT NULL UNIQUE, 
	data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (fk_id_endereco) REFERENCES Enderecos(id_endereco)
);

CREATE TABLE Usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome_usuario VARCHAR(30) NOT NULL,
    sobrenome_usuario VARCHAR(100) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE, -- Vai ser o login
    funcao ENUM('Diretor', 'Financeiro', 'Manutencao'),
    senha VARCHAR(8) NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    fk_id_escola INT NOT NULL,
    FOREIGN KEY (fk_id_escola) REFERENCES Escolas(id_escola)
);


CREATE TABLE Telefones (
    id_telefone INT PRIMARY KEY AUTO_INCREMENT,
     fk_id_escola INT NOT NULL,
    pais Varchar (3) NOT NULL,
    ddd Varchar(2) NOT NULL,
    numero VARCHAR(9) NOT NULL,
    tipo ENUM('Celular','Fixo') NOT NULL,
    principal BOOLEAN DEFAULT FALSE,
    ativo BOOLEAN DEFAULT TRUE,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_id_escola) REFERENCES Escolas(id_escola)
);



