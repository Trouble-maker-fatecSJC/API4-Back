import { Request, Response } from "express";
import MedidasService from "../services/medidasService";

class MedidasController {
  async cadastrar(req: Request, res: Response) {
    try {
      const medida = await MedidasService.cadastrar(req.body);
      return res.status(201).json(medida);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const medida = await MedidasService.buscarPorId(Number(req.params.id));
      if (!medida) return res.status(404).json({ message: "Medida não encontrada" });
      return res.json(medida);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ error: err.message });
    }
  }

  async buscarTodas(req: Request, res: Response) {
    try {
      const medidas = await MedidasService.buscarTodas();
      return res.json(medidas);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ error: err.message });
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const medida = await MedidasService.atualizar(Number(req.params.id), req.body);
      return res.json(medida);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      await MedidasService.deletar(Number(req.params.id));
      return res.json({ message: "Medida deletada com sucesso" });
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new MedidasController();

