import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import mysql from "mysql2/promise"; // Usando mysql2
import { ParametrosSubscriber } from "../subscriber/parametroSubscriber";

dotenv.config();

// Função para verificar se o banco de dados existe e, se não, criá-lo
export const checkAndCreateDatabase = async () => {  // Agora a função é exportada
  // Conectar ao MySQL sem especificar o banco de dados
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  // Verificar se o banco de dados já existe
  const [rows]:any = await connection.query(
    `SHOW DATABASES LIKE '${process.env.DB_NAME}'`
  );

  // Se o banco de dados não existir, criá-lo
  if (rows.length === 0) {
    console.log(`💥 Banco de dados "${process.env.DB_NAME}" não encontrado. Criando...`);
    await connection.query(`CREATE DATABASE ${process.env.DB_NAME}`);
    console.log(`✅ Banco de dados "${process.env.DB_NAME}" criado com sucesso!`);
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
  database: process.env.DB_NAME, // Aqui já usamos o banco de dados correto
  entities: ["src/models/*.ts"],
  synchronize: true,
  logging: false,
  subscribers: [ParametrosSubscriber]
});
