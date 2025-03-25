  import express from "express";
  import cors from "cors";
  import { AppDataSource } from "./config/database";
  import usuarioRoutes from "./routes/usuarioRoutes";
  import estacaoRoutes from "./routes/estacaoRoutes";
  import medidasRoutes from "./routes/medidasRoutes";
  import tipoParametroRoutes from "./routes/tipoParametroRoutes";
  import dotenv from "dotenv";
  import { checkAndCreateDatabase } from "./config/database"; // Importe a função de verificação/criação do banco de dados
  
  dotenv.config();
  
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/api", usuarioRoutes);
  app.use("/api", estacaoRoutes);
  app.use("/api", medidasRoutes)
  app.use("/api", tipoParametroRoutes)
  const PORT = process.env.PORT || 3000;
  
  // Função principal que aguarda a verificação e criação do banco
  const startServer = async () => {
    try {
      // Verifique e crie o banco de dados, se necessário
      await checkAndCreateDatabase();
  
      // Inicialize o TypeORM após a criação/verificação do banco
      await AppDataSource.initialize();
      console.log("🔥 Conectado ao banco de dados com sucesso!");
  
      // Inicie o servidor Express
      app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
    } catch (error) {
      console.error("Erro ao conectar ao banco:", error);
    }
  };
  
  // Inicie o servidor
  startServer();
  