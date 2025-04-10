import { Request, Response } from "express";
import alertaService from "../services/AlertaService";
import parametroService from "../services/parametroService";

class AlertaController {
  async cadastrar(req: Request, res: Response) {
    try {
        // Convertendo id_do_parametro para número
        const idParametro = Number(req.body.id_do_parametro);

        if (isNaN(idParametro)) {
            return res.status(400).json({ message: "ID do parâmetro inválido" });
        }

        // Verificando se o parâmetro existe
        const parametro = await parametroService.buscarPorId(idParametro);
        if (!parametro) {
            return res.status(404).json({ message: "Parâmetro não encontrado" });
        }

        // Associando o parâmetro ao alerta
        const alerta = await alertaService.cadastrar({
            ...req.body,
            parametro, // Passando o parâmetro para a criação
        });

        return res.status(201).json(alerta);
    } catch (error) {
        const err = error as Error;
        return res.status(400).json({ error: err.message });
    }
}

  async buscarPorId(req: Request, res: Response) {
    try {
      const alerta = await alertaService.buscarPorId(Number(req.params.id));
      if (!alerta) return res.status(404).json({ message: "Alerta não encontrado" });
      return res.json(alerta);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ error: err.message });
    }
  }

  async buscarTodas(req: Request, res: Response) {
    try {
      const alertas = await alertaService.buscarTodas();
      return res.json(alertas);
    } catch (error) {
      const err = error as Error;
      return res.status(500).json({ error: err.message });
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      // Verificando se o parâmetro existe
      const parametroId = req.body.parametro?.id;
      if (!parametroId) {
        return res.status(400).json({ message: "ID do parâmetro é obrigatório" });
      }

      const parametro = await parametroService.buscarPorId(Number(parametroId));
      if (!parametro) {
        return res.status(404).json({ message: "Parâmetro não encontrado" });
      }

      // Atualizando alerta com o parâmetro
      const alerta = await alertaService.atualizar(
        Number(req.params.id),
        { ...req.body, parametro } // Atualizando com o novo parâmetro
      );

      return res.json(alerta);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      await alertaService.deletar(Number(req.params.id));
      return res.json({ message: "Alerta deletado com sucesso" });
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new AlertaController();
