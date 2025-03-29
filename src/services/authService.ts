import { AppDataSource } from "../config/database";
import { Usuario } from "../models/usuario";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class AuthService {
  async login(email: string, senha: string) {
    const usuarioRepository = AppDataSource.getRepository(Usuario);
    const usuario = await usuarioRepository.findOne({ where: { email } });

    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      throw new Error("Credenciais inválidas");
    }

    return jwt.sign({ cpf: usuario.cpf }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
  }
}

export default new AuthService();
