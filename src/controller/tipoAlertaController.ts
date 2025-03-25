import { Request, Response } from "express";
import tipoAlertaService from "../services/tipoAlertaService";

class TipoAlertaController {
  async cadastrar(req: Request, res: Response) {
    try {
      const TipoAlerta = await tipoAlertaService.cadastrar(req.body);
      return res.status(201).json(TipoAlerta);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const TipoAlerta = await tipoAlertaService.buscarPorId(Number(req.params.id));
      if (!TipoAlerta) return res.status(404).json({ message: "TipoAlerta não encontrado" });
      return res.json(TipoAlerta);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ error: err.message });
    }
  }

  async buscarTodas(req: Request, res: Response) {
    try {
      const TipoAlertas = await tipoAlertaService.buscarTodas();
      return res.json(TipoAlertas);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ error: err.message });
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const TipoAlerta = await tipoAlertaService.atualizar(Number(req.params.id), req.body);
      return res.json(TipoAlerta);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      await tipoAlertaService.deletar(Number(req.params.id));
      return res.json({ message: "TipoAlerta deletado com sucesso" });
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new TipoAlertaController();