import { Request, Response } from "express";
import ParametroService from "../services/parametroService";
import usuarioService from "../services/usuarioService";
import estacaoService from "../services/estacaoService";
import tipoParametroService from "../services/tipoParametroService";
import medidasService from "../services/medidasService";

class ParametroController {
  async cadastrar(req: Request, res: Response) {
    try {
      const { cpf_usuario, tipo_parametro, id_da_estacao, id_de_medida, ...dados } = req.body;

      // Verificar se o usuário existe pelo CPF
      const usuario = await usuarioService.buscarPorCpf(cpf_usuario);
      if (!usuario) return res.status(404).json({ message: "Usuário não encontrado" });

      // Verificar se o tipo de parâmetro existe
      const tipoParametro = await tipoParametroService.buscarPorId(tipo_parametro);
      if (!tipoParametro) return res.status(404).json({ message: "Tipo de parâmetro não encontrado" });

      // Verificar se a estação existe
      const estacao = await estacaoService.buscarPorId(id_da_estacao);
      if (!estacao) return res.status(404).json({ message: "Estação não encontrada" });

      // Verificar se a medida existe
      const medida = await medidasService.buscarPorId(id_de_medida);
      if (!medida) return res.status(404).json({ message: "Medida não encontrada" });

      // Criar o parâmetro com as entidades validadas
      const parametro = await ParametroService.cadastrar({
        usuario,
        tipoParametro,
        estacao,
        medida,
        ...dados,
      });

      return res.status(201).json(parametro);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

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

  async atualizar(req: Request, res: Response) {
    try {
      const { cpf_usuario, tipo_parametro, id_da_estacao, id_de_medida, ...dados } = req.body;
      const id = Number(req.params.id);
  
      // Verificar se o parâmetro existe antes de atualizar
      const parametroExiste = await ParametroService.buscarPorId(id);
      if (!parametroExiste) return res.status(404).json({ message: "Parâmetro não encontrado" });
  
      let usuario = parametroExiste.usuario;
      if (cpf_usuario) {
        const usuarioEncontrado = await usuarioService.buscarPorCpf(cpf_usuario);
        if (!usuarioEncontrado) return res.status(404).json({ message: "Usuário não encontrado" });
        usuario = usuarioEncontrado;
      }
  
      let tipoParametro = parametroExiste.tipoParametro;
      if (tipo_parametro) {
        const tipoParametroEncontrado = await tipoParametroService.buscarPorId(tipo_parametro);
        if (!tipoParametroEncontrado) return res.status(404).json({ message: "Tipo de parâmetro não encontrado" });
        tipoParametro = tipoParametroEncontrado;
      }
  
      let estacao = parametroExiste.estacao;
      if (id_da_estacao) {
        const estacaoEncontrada = await estacaoService.buscarPorId(id_da_estacao);
        if (!estacaoEncontrada) return res.status(404).json({ message: "Estação não encontrada" });
        estacao = estacaoEncontrada;
      }
  
      let medida = parametroExiste.medida;
      if (id_de_medida) {
        const medidaEncontrada = await medidasService.buscarPorId(id_de_medida);
        if (!medidaEncontrada) return res.status(404).json({ message: "Medida não encontrada" });
        medida = medidaEncontrada;
      }
  
      // Atualizar o parâmetro
      const parametroAtualizado = await ParametroService.atualizar(id, {
        usuario,
        tipoParametro,
        estacao,
        medida,
        ...dados,
      });
  
      return res.json(parametroAtualizado);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const parametro = await ParametroService.buscarPorId(id);
      if (!parametro) return res.status(404).json({ message: "Parâmetro não encontrado" });

      await ParametroService.deletar(id);
      return res.json({ message: "Parâmetro deletado com sucesso" });
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
}

export default new ParametroController();
