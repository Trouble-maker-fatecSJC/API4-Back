import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "secreto";
const chaveFixa = process.env.API_KEY || "chave_fixa";

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.header("Authorization");
  
  console.log("=== Debug Info ===");
  console.log("Header recebido:", authHeader);
  console.log("Chave fixa:", chaveFixa);

  if (!authHeader) {
    console.warn("Acesso negado: Nenhum cabeçalho de autorização fornecido.");
    res.status(401).json({ message: "Acesso negado. Token não fornecido." });
    return;
  }

  const token = authHeader.replace("Bearer ", "").trim();

  // Primeiro verifica se é a chave fixa
  if (token === chaveFixa) {
    console.log("Acesso via chave API autorizado");
    (req as any).user = { tipo: "api" };
    next();
    return;
  }

  // Se chegou aqui, não é a chave fixa
  try {
    const decoded = jwt.verify(token, secret);
    console.log("Token decodificado com sucesso:", decoded);
    (req as any).user = decoded;
    next();
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    res.status(401).json({ 
      message: "Token inválido. Use 'Bearer com a chave fixa' ou um JWT válido." 
    });
  }
};