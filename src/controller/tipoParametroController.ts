import { Request, Response } from "express";
import tipoParametroService from "../services/tipoParametroService";

class TipoParametroControler {
  async cadastrar(req: Request, res: Response) {
    try {
      const TipoParametro = await tipoParametroService.cadastrar(req.body);
      return res.status(201).json(TipoParametro);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const TipoParametro = await tipoParametroService.buscarPorId(Number(req.params.id));
      if (!TipoParametro) return res.status(404).json({ message: "TipoParametro não encontrado" });
      return res.json(TipoParametro);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ error: err.message });
    }
  }

  async buscarTodas(req: Request, res: Response) {
    try {
      const TipoParametros = await tipoParametroService.buscarTodas();
      return res.json(TipoParametros);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ error: err.message });
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const TipoParametro = await tipoParametroService.atualizar(Number(req.params.id), req.body);
      return res.json(TipoParametro);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      await tipoParametroService.deletar(Number(req.params.id));
      return res.json({ message: "TipoParametro deletado com sucesso" });
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new TipoParametroControler();