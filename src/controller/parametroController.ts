import { Request, Response } from "express";
import ParametroService from "../services/parametroService";
import tipoParametroService from "../services/tipoParametroService";

class ParametroController {
  // async cadastrar(req: Request, res: Response) {
  //   try {
  //     const { tipo_parametro, ...dados } = req.body;

  //     // Verificar se o tipo de parâmetro existe
  //     const tipoParametro = await tipoParametroService.buscarPorId(tipo_parametro);
  //     if (!tipoParametro) return res.status(404).json({ message: "Tipo de parâmetro não encontrado" });

  //     // Criar o parâmetro com o tipo de parâmetro validado
  //     const parametro = await ParametroService.cadastrar({
  //       tipoParametro,
  //       ...dados,
  //     });

  //     return res.status(201).json(parametro);
  //   } catch (error) {
  //     return res.status(400).json({ error: (error as Error).message });
  //   }
  // }

  async buscarPorId(req: Request, res: Response) {
    try {
      const parametro = await ParametroService.buscarPorId(Number(req.params.id));
      if (!parametro) return res.status(404).json({ message: "Parâmetro não encontrado" });
      return res.json(parametro);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  async buscarTodos(req: Request, res: Response) {
    try {
      const parametros = await ParametroService.buscarTodos();
      return res.json(parametros);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  // async atualizar(req: Request, res: Response) {
  //   try {
  //     const { tipo_parametro, ...dados } = req.body;
  //     const id = Number(req.params.id);

  //     // Verificar se o parâmetro existe antes de atualizar
  //     const parametroExiste = await ParametroService.buscarPorId(id);
  //     if (!parametroExiste) return res.status(404).json({ message: "Parâmetro não encontrado" });

  //     let tipoParametro = parametroExiste.tipoParametro;
  //     if (tipo_parametro) {
  //       const tipoParametroEncontrado = await tipoParametroService.buscarPorId(tipo_parametro);
  //       if (!tipoParametroEncontrado) return res.status(404).json({ message: "Tipo de parâmetro não encontrado" });
  //       tipoParametro = tipoParametroEncontrado;
  //     }

  //     // Atualizar o parâmetro
  //     const parametroAtualizado = await ParametroService.atualizar(id, {
  //       tipoParametro,
  //       ...dados,
  //     });

  //     return res.json(parametroAtualizado);
  //   } catch (error) {
  //     return res.status(400).json({ error: (error as Error).message });
  //   }
  // }

//   async deletar(req: Request, res: Response) {
//     try {
//       const id = Number(req.params.id);
//       const parametro = await ParametroService.buscarPorId(id);
//       if (!parametro) return res.status(404).json({ message: "Parâmetro não encontrado" });

//       await ParametroService.deletar(id);
//       return res.json({ message: "Parâmetro deletado com sucesso" });
//     } catch (error) {
//       return res.status(400).json({ error: (error as Error).message });
//     }
//   }

}

export default new ParametroController();
