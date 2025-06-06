import { Request, Response } from "express"; 
import ColetarParametrosService from "../services/coletarParametrosService";
import { ColetarParametros } from "../models/coletarParametros";
import { AppDataSource } from "../config/database";
import { Estacao } from "../models/estacao";
import { Parametros } from "../models/parametros";
import { Medidas } from "../models/medidas";

class ColetarParametrosController {
  private coletarParametrosRepository = AppDataSource.getRepository(ColetarParametros);

  // Cadastrar um novo ColetarParametros
  async cadastrar(req: Request, res: Response) {
    try {
      const dados: Partial<ColetarParametros> = req.body;

      // Extrair os IDs da estação, do parâmetro e da medida
      const estacaoId = typeof dados.estacao === 'object' ? dados.estacao.id_estacao : dados.estacao;
      const parametroId = typeof dados.parametro === 'object' ? dados.parametro.id_parametro : dados.parametro;
      const medidaId = typeof dados.medida === 'object' ? dados.medida.id_medida : dados.medida;

      // Buscar a estação, o parâmetro e a medida no banco de dados
      const estacao = await AppDataSource.getRepository(Estacao).findOneBy({ id_estacao: estacaoId });
      const parametro = await AppDataSource.getRepository(Parametros).findOneBy({ id_parametro: parametroId });
      const medida = await AppDataSource.getRepository(Medidas).findOneBy({ id_medida: medidaId });

      if (!estacao) {
        return res.status(404).json({ error: "Estação não encontrada" });
      }
      if (!parametro) {
        return res.status(404).json({ error: "Parâmetro não encontrado" });
      }
      if (!medida) {
        return res.status(404).json({ error: "Medida não encontrada" });
      }

      // Criar a nova coleta de parâmetros com os relacionamentos
      const coleta = this.coletarParametrosRepository.create({
        ...dados,
        estacao, // Associação correta do objeto Estacao
        parametro, // Associação correta do objeto Parametros
        medida, // Associação correta do objeto Medidas
      });

      // Salvar no banco de dados
      const novaColeta = await this.coletarParametrosRepository.save(coleta);

      return res.status(201).json(novaColeta);
    } catch (error) {
      console.error("Erro ao cadastrar coleta:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  // Buscar todos os ColetarParametros
  async buscarTodos(req: Request, res: Response) {
    try {
      const coletas = await ColetarParametrosService.buscarTodos();
      return res.json(coletas);
    } catch (error) {
      console.error("Erro ao buscar coletas:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }


  // Buscar ColetarParametros por ID
  async buscarPorId(req: Request, res: Response) {
    try {
      const coleta = await ColetarParametrosService.buscarPorId(parseInt(req.params.id));
      return res.json(coleta);
    } catch (error) {
      const err = error as Error;
      return res.status(404).json({ error: err.message });
    }
  }

   // Buscar ColetarParametros por ID
   async buscarEstacaoId(req: Request, res: Response) {
    try {
      const coleta = await ColetarParametrosService.buscarPorIdEstacao(parseInt(req.params.id));
      return res.json(coleta);
    } catch (error) {
      const err = error as Error;
      return res.status(404).json({ error: err.message });
    }
  }

  // Atualizar ColetarParametros
  async atualizar(req: Request, res: Response) {
    try {
      const coleta = await ColetarParametrosService.atualizar(parseInt(req.params.id), req.body);
      return res.json(coleta);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }

  // Deletar ColetarParametros
  async deletar(req: Request, res: Response) {
    try {
      await ColetarParametrosService.deletar(parseInt(req.params.id));
      return res.json({ message: "Coleta de parâmetros deletada com sucesso" });
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new ColetarParametrosController();



