import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import mysql from "mysql2/promise"; // Usando mysql2
import { ParametrosSubscriber } from "../subscriber/parametroSubscriber";
import { Usuario } from "../models/usuario";
import { TipoParametro } from "../models/tipoParametro";
import { Parametros } from "../models/parametros";
import { Estacao } from "../models/estacao";
import { Medidas } from "../models/medidas";
import { Alerta } from "../models/Alertas";
import { Alarme } from "../models/Alarme";
import { ColetarParametros } from "../models/coletarParametros";

dotenv.config();

// Função para verificar se o banco de dados existe e, se não, criá-lo
export const checkAndCreateDatabase = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  // Verificar se o banco de dados já existe
  const [rows]: any = await connection.query(
    `SHOW DATABASES LIKE '${process.env.DB_NAME}'`
  );

  if (rows.length === 0) {
    console.log(`💥 Banco de dados "${process.env.DB_NAME}" não encontrado. Criando...`);
    await connection.query(`CREATE DATABASE ${process.env.DB_NAME}`);
    console.log(`✅ Banco de dados "${process.env.DB_NAME}" criado com sucesso!`);
  }

  // Selecionar o banco de dados
  await connection.query(`USE ${process.env.DB_NAME}`);

  // Verificar se a tabela usuario existe
  const [userTable]: any = await connection.query(
    `SHOW TABLES LIKE 'usuario'`
  );

  // Se a tabela usuario não existir, criar e adicionar o usuário padrão
  if (userTable.length === 0) {
    console.log("💥 Tabela 'usuario' não encontrada. Criando e adicionando usuário padrão...");
    await connection.query(`
      CREATE TABLE usuario (
        cpf BIGINT PRIMARY KEY,
        email VARCHAR(50) UNIQUE NOT NULL,
        senha VARCHAR(200) NOT NULL,
        nome VARCHAR(200) NOT NULL,
        tipo INT NOT NULL
      )
    `);
    await connection.query(`
      INSERT INTO usuario (cpf, email, senha, nome, tipo)
      VALUES ('50145499855', 'adm@gmail.com', '$10$NEEerfkDRFu2lOVa6CvKoeNsMDgYu/GcJ8eHdI5xYeQI2P24FknU.', 'adm', 1)
    `);
    console.log("✅ Usuário padrão 'adm' criado com sucesso!");
  }

  // Fechar a conexão
  await connection.end();
};

// Configuração do TypeORM
export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    Usuario,            // Primeiro
    TipoParametro,      // Segundo
    Parametros,         // Terceiro
    Estacao,            // Quarto
    Medidas,            // Quinto
    Alerta,             // Sexto
    Alarme,             // Sétimo
    ColetarParametros   // Oitavo
  ],
  synchronize: true,
  logging: false,
  subscribers: [ParametrosSubscriber]
});
