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
    funcao ENUM('Diretor', 'Financeiro', 'Manutencao', 'Professor'),
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


-- Tabelas para gerador de sensores
CREATE TABLE ambientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tipos_sensores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

CREATE TABLE sensores_ambientes (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    ambiente_id INT NOT NULL,
    tipo_sensor_id INT NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (ambiente_id) REFERENCES ambientes(id),
    FOREIGN KEY (tipo_sensor_id) REFERENCES tipos_sensores(id)
);


-- Tabelas para gastos
CREATE TABLE historico_gastos (

    id INT AUTO_INCREMENT PRIMARY KEY,
    ambiente_id INT,
    consumo_agua DECIMAL(10,2),
    consumo_energia DECIMAL(10,2),
    valor_agua DECIMAL(10,2),
    valor_energia DECIMAL(10,2),
    total DECIMAL(10,2),
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



