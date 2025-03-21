import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "secreto";

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, secret);
    (req as any).user = decoded; // Anexar usuário ao request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

