import { Request, Response } from "express";
import AlertaService from "../services/alertaService";

class AlertaController {
  // Função para cadastrar um Alerta
  async cadastrar(req: Request, res: Response) {
    try {
      const alerta = await AlertaService.cadastrar(req.body);
      return res.status(201).json(alerta);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }

  // Função para buscar um Alerta por ID
  async buscarPorId(req: Request, res: Response) {
    try {
      const alerta = await AlertaService.buscarPorId(Number(req.params.id));
      if (!alerta) {
        return res.status(404).json({ message: "Alerta não encontrado" });
      }
      return res.json(alerta);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ error: err.message });
    }
  }

  // Função para buscar todos os Alertas
  async buscarTodos(req: Request, res: Response) {
    try {
      const alertas = await AlertaService.buscarTodos();
      return res.json(alertas);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ error: err.message });
    }
  }

  // Função para atualizar um Alerta
  async atualizar(req: Request, res: Response) {
    try {
      const alerta = await AlertaService.atualizar(Number(req.params.id), req.body);
      return res.json(alerta);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }

  // Função para deletar um Alerta
  async deletar(req: Request, res: Response) {
    try {
      await AlertaService.deletar(Number(req.params.id));
      return res.json({ message: "Alerta deletado com sucesso" });
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new AlertaController();
