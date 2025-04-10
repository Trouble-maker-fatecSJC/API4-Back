import { Request, Response } from "express";
import AlarmeService from "../services/alarmeService";

class AlarmeController {
  // Função para cadastrar um Alarme
  async cadastrar(req: Request, res: Response) {
    try {
      const alarme = await AlarmeService.cadastrar(req.body);
      return res.status(201).json(alarme);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }

  // Função para buscar um Alarme por ID
  async buscarPorId(req: Request, res: Response) {
    try {
      const alarme = await AlarmeService.buscarPorId(Number(req.params.id));
      if (!alarme) {
        return res.status(404).json({ message: "Alarme não encontrado" });
      }
      return res.json(alarme);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ error: err.message });
    }
  }

  // Função para buscar todos os Alarmes
  async buscarTodos(req: Request, res: Response) {
    try {
      const alarmes = await AlarmeService.buscarTodos();
      return res.json(alarmes);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ error: err.message });
    }
  }

  // Função para atualizar um Alarme
  async atualizar(req: Request, res: Response) {
    try {
      const alarme = await AlarmeService.atualizar(Number(req.params.id), req.body);
      return res.json(alarme);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }

  // Função para deletar um Alarme
  async deletar(req: Request, res: Response) {
    try {
      await AlarmeService.deletar(Number(req.params.id));
      return res.json({ message: "Alarme deletado com sucesso" });
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }

  // Função para verificar detalhes da medida, estação e parâmetro
  async verificarDetalhes(req: Request, res: Response) {
    try {
      const detalhes = await AlarmeService.verificarDetalhes(Number(req.params.id));
      return res.json(detalhes);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new AlarmeController();
