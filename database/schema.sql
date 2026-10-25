CREATE DATABASE IF NOT EXISTS coquito_amarillo
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_spanish_ci;

USE coquito_amarillo;

CREATE TABLE IF NOT EXISTS registros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_cliente VARCHAR(100) NOT NULL,
  producto VARCHAR(100) NOT NULL,
  cantidad INT NOT NULL,
  correo VARCHAR(150) NOT NULL,
  fecha_registro DATETIME NOT NULL
);