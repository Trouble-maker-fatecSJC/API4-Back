import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "secreto";

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    console.warn("Acesso negado: Nenhum cabeçalho de autorização fornecido.");
    return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
  }

  const token = authHeader.replace("Bearer ", "");
  console.log("Token recebido no backend:", token);

  if (!token) {
    console.warn("Acesso negado: Token vazio.");
    return res.status(401).json({ message: "Acesso negado. Token inválido." });
  }

  try {
    const decoded = jwt.verify(token, secret);
    console.log("Token decodificado com sucesso:", decoded);
    (req as any).user = decoded; // Anexar usuário ao request
    next();
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    return res.status(401).json({ message: "Token inválido" });
  }
};
