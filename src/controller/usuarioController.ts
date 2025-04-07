import { Request, Response } from "express";
import UsuarioService from "../services/usuarioService";
import usuarioService from "../services/usuarioService";


class UsuarioController {
  async cadastrar(req: Request, res: Response) {
    try {
      const usuario = await UsuarioService.cadastrar(req.body);
      return res.status(201).json(usuario);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }

  async buscarPorCpf(req: Request, res: Response) {
    try {
      const usuario = await UsuarioService.buscarPorCpf(req.params.cpf);
      if (!usuario) return res.status(404).json({ message: "Usuário não encontrado" });
      return res.json(usuario);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ error: err.message });
    }
  }

  async buscarTodos(req: Request, res: Response) {
    try {
      const usuarios = await UsuarioService.buscarTodos();
      return res.json(usuarios);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ error: err.message });
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const usuario = await UsuarioService.atualizar(req.params.cpf, req.body);
      return res.json(usuario);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      await UsuarioService.deletar(req.params.cpf);
      return res.json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }



  async login(req: Request, res: Response) {
    try {
        const { email, senha } = req.body;

        // Busca o usuário pelo e-mail
        const usuario = await UsuarioService.buscarPorEmail(email);

        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        // Verifica as credenciais e gera o token
        const token = await UsuarioService.login(email, senha);

        // Retorna o token e o tipo correto do usuário
        console.log("Tipo do usuário:", usuario.tipo);
        return res.json({ token, tipo: usuario.tipo });
    } catch (error) {
        const err = error as Error;
        return res.status(401).json({ error: err.message });
    }
}

  async verificarTipo(req: Request, res: Response) {
    try {
        const { tipo } = req.body; // Recebe o tipo do corpo da requisição
        const mensagem = await usuarioService.verificarTipoUsuario(tipo);
        return res.json({ mensagem });
    } catch (error) {
        const err = error as Error;
        return res.status(400).json({ error: err.message });
    }
  }
}

export default new UsuarioController();
