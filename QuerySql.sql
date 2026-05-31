-- 1. Criação do Banco de Dados
CREATE DATABASE tcc;
USE tcc;

-- 2. Tabela de Endereços
CREATE TABLE Enderecos (
    id_endereco INT PRIMARY KEY AUTO_INCREMENT,
    logradouro VARCHAR(255) NOT NULL,
    numero VARCHAR(10) DEFAULT 'S/N',
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    cep CHAR(8) NOT NULL
);

-- 3. Tabela de Escolas (Depende de Enderecos)
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

-- 4. Tabela de Usuários (Depende de Escolas)
CREATE TABLE Usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome_usuario VARCHAR(30) NOT NULL,
    sobrenome_usuario VARCHAR(100) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    funcao ENUM('Diretor', 'Financeiro', 'Manutencao', 'Professor'),
    senha VARCHAR(255) NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    fk_id_escola INT NOT NULL,
    FOREIGN KEY (fk_id_escola) REFERENCES Escolas(id_escola)
);

-- 5. Tabela de Telefones (Depende de Escolas)
CREATE TABLE Telefones (
    id_telefone INT PRIMARY KEY AUTO_INCREMENT,
    fk_id_escola INT NOT NULL,
    pais VARCHAR(3) NOT NULL,
    ddd VARCHAR(2) NOT NULL,
    numero VARCHAR(9) NOT NULL,
    tipo ENUM('Celular','Fixo') NOT NULL,
    principal BOOLEAN DEFAULT FALSE,
    ativo BOOLEAN DEFAULT TRUE,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_id_escola) REFERENCES Escolas(id_escola)
);

-- 6. Tabela de Tipos de Sensores
CREATE TABLE tipos_sensores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

-- 7. Tabela de Ambientes (Depende de Escolas) ← ATUALIZADA
CREATE TABLE ambientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    fk_id_escola INT NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_id_escola) REFERENCES Escolas(id_escola) ON DELETE CASCADE
);

-- 8. Tabela de Sensores por Ambiente (Depende de ambientes e tipos_sensores)
CREATE TABLE sensores_ambientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ambiente_id INT NOT NULL,
    tipo_sensor_id INT NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ambiente_id) REFERENCES ambientes(id) ON DELETE CASCADE,
    FOREIGN KEY (tipo_sensor_id) REFERENCES tipos_sensores(id)
);

-- 9. Tabela de Histórico de Gastos (Depende de ambientes)
CREATE TABLE historico_gastos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ambiente_id INT NOT NULL,
    consumo_agua DECIMAL(10,4),
    consumo_energia DECIMAL(10,4),
    valor_agua DECIMAL(10,2),
    valor_energia DECIMAL(10,2),
    total DECIMAL(10,2),
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ambiente_id) REFERENCES ambientes(id) ON DELETE CASCADE
);