import { Request, Response } from "express";
import EstacaoService from "../services/estacaoService";

class EstacaoController {
  async cadastrar(req: Request, res: Response) {
    try {
      const estacao = await EstacaoService.cadastrar(req.body);
      return res.status(201).json(estacao);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }

  async buscarPorNome(req: Request, res: Response) {
    try {
      const estacao = await EstacaoService.buscarPorNome(req.params.nome);
      if (!estacao || estacao.length === 0) {
        return res.status(404).json({ message: "Estação não encontrada" });
      }
      return res.json(estacao);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ error: err.message });
    }
  }

  async buscarTodos(req: Request, res: Response) {
    try {
      const estacoes = await EstacaoService.buscarTodos();
      return res.json(estacoes);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ error: err.message });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const estacao = await EstacaoService.buscarPorId(parseInt(req.params.id));
      if (!estacao) {
        return res.status(404).json({ message: "Estação não encontrada" });
      }
      return res.json(estacao);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ error: err.message });
    }
  }

  async buscarPorUid(req: Request, res: Response) {
    try {
      const estacao = await EstacaoService.buscarPorUid(req.params.uid);
      if (!estacao) {
        return res.status(404).json({ message: "Estação não encontrada" });
      }
      return res.json(estacao);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ error: err.message });
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const estacao = await EstacaoService.atualizar(parseInt(req.params.id), req.body);
      return res.json(estacao);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      await EstacaoService.deletar(parseInt(req.params.id));
      return res.json({ message: "Estação deletada com sucesso" });
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new EstacaoController();