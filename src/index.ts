import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/database";
import usuarioRoutes from "./routes/usuarioRoutes";
import estacaoRoutes from "./routes/estacaoRoutes";
import medidasRoutes from "./routes/medidasRoutes";
import tipoParametroRoutes from "./routes/tipoParametroRoutes";
import AlertaRoutes from "./routes/alertaRoutes";
import AlarmeRoutes from "./routes/alarmeRoutes";
import parametroRoutes from "./routes/parametroRoutes";
import dotenv from "dotenv";
import { checkAndCreateDatabase } from "./config/database";
import coletarRoutes from "./routes/coletaRoutes";
import protectedRoutes from "./routes/protectedRoutes";
import { AuthMiddleware } from "./middleware/authMiddleware";



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


// Middleware global para proteger todas as outras rotas
app.use((req, res, next) => {
  if (req.path === "/api/login" || req.path === "/") {
    return next();
  }
  AuthMiddleware(req, res, next); // Aplicar autenticação
});

// Rotas privadas
app.use("/api", usuarioRoutes);
app.use("/api", estacaoRoutes);
app.use("/api", medidasRoutes);
app.use("/api", tipoParametroRoutes);
app.use("/api", AlertaRoutes);
app.use("/api", parametroRoutes);
app.use("/api", AlarmeRoutes);
app.use("/api", coletarRoutes);
app.use("/api", protectedRoutes);

const PORT = process.env.PORT || 3000;

// Função principal que aguarda a verificação e criação do banco
const startServer = async () => {
  try {
    await checkAndCreateDatabase();
    await AppDataSource.initialize();
    console.log("🔥 Conectado ao banco de dados com sucesso!");
    app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
  } catch (error) {
    console.error("Erro ao conectar ao banco:", error);
  }
};

// Inicie o servidor
startServer();
