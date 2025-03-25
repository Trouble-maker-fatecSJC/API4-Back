import { Request, Response } from "express";
import tipoAlertaService from "../services/tipoAlertaService";
import parametroService from "../services/parametroService"; // Importando o serviço para pegar o parâmetro

class TipoAlertaController {
  async cadastrar(req: Request, res: Response) {
    try {
      // Verificando se o parâmetro existe
      const parametro = await parametroService.buscarPorId(Number(req.body.id_do_parametro));
      if (!parametro) {
        return res.status(404).json({ message: "Parâmetro não encontrado" });
      }

      // Associando o parâmetro ao tipo de alerta
      const tipoAlerta = await tipoAlertaService.cadastrar({
        ...req.body,
        parametro, // Passando o parâmetro para a criação
      });

      return res.status(201).json(tipoAlerta);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const tipoAlerta = await tipoAlertaService.buscarPorId(Number(req.params.id));
      if (!tipoAlerta) return res.status(404).json({ message: "TipoAlerta não encontrado" });
      return res.json(tipoAlerta);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ error: err.message });
    }
  }

  async buscarTodas(req: Request, res: Response) {
    try {
      const tipoAlertas = await tipoAlertaService.buscarTodas();
      return res.json(tipoAlertas);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ error: err.message });
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      // Verificando se o parâmetro existe
      const parametro = await parametroService.buscarPorId(Number(req.body.id_do_parametro));
      if (!parametro) {
        return res.status(404).json({ message: "Parâmetro não encontrado" });
      }

      // Atualizando tipo de alerta com o parâmetro
      const tipoAlerta = await tipoAlertaService.atualizar(
        Number(req.params.id),
        { ...req.body, parametro } // Atualizando com o novo parâmetro
      );

      return res.json(tipoAlerta);
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
