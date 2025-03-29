import { Request, Response } from "express";

export const getProtectedData = (req: Request, res: Response) => {
  const user = (req as any).user; // Usuário anexado pelo AuthMiddleware
  res.json({
    message: "Dados protegidos acessados com sucesso.",
    user,
  });
};
