import { Request, Response } from "express";
import MedidasService from "../services/medidasService";

class MedidasController {
  async cadastrar(req: Request, res: Response) {
    try {
      const dados = { ...req.body, unix_time: new Date(req.body.unix_time) }; // Convert unix_time to Date
      const medida = await MedidasService.cadastrar(dados);
      res.status(201).json(medida);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Erro ao cadastrar medida" });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const medida = await MedidasService.buscarPorId(id);
      res.status(200).json(medida);
    } catch (error: any) {
      res.status(404).json({ error: error.message || "Erro ao buscar medida por ID" });
    }
  }

  async buscarTodos(req: Request, res: Response) {
    try {
      const medidas = await MedidasService.buscarTodos();
      res.status(200).json(medidas);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Erro ao buscar todas as medidas" });
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await MedidasService.deletar(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ error: error.message || "Erro ao deletar medida" });
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const dados = { ...req.body, unix_time: new Date(req.body.unix_time) }; // Convert unix_time to Date
      const medida = await MedidasService.atualizar(id, dados);
      res.status(200).json(medida);
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Erro ao atualizar medida" });
    }
  }
}

export default new MedidasController();
