import { Request, Response } from "express";
import authService from "../services/authService";

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const token = await authService.login(req.body.email, req.body.senha);
      return res.json({ token });
    } catch (error) {
      const err = error as Error;
      return res.status(401).json({ error: err.message });
    }
  }
}

export default new AuthController();
