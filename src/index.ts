import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/database";
import usuarioRoutes from "./routes/usuarioRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", usuarioRoutes);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("🔥 Conectado ao banco de dados com sucesso!");
    app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
  })
  .catch((error) => console.error("Erro ao conectar ao banco:", error));
