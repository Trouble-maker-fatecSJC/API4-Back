import { Request, Response } from "express"; 
import ColetarParametrosService from "../services/coletarParametrosService";
import { ColetarParametros } from "../models/coletarParametros";
import { AppDataSource } from "../config/database";
import { Estacao } from "../models/estacao";

import { Medidas } from "../models/medidas";

class ColetarParametrosController {
  private coletarParametrosRepository = AppDataSource.getRepository(ColetarParametros);

  // Cadastrar um novo ColetarParametros
  async cadastrar(req: Request, res: Response) {
    try {
      const dados: Partial<ColetarParametros> = req.body;

      // Extrair apenas os IDs necessários da medida
      const medidaId = typeof dados.medida === 'object' ? dados.medida.id_medida : dados.medida;

      // Buscar a medida completa que já contém estação e parâmetro
      const medida = await AppDataSource.getRepository(Medidas).findOne({
        where: { id_medida: medidaId },
        relations: ['estacao', 'parametro']
      });

      if (!medida) {
        return res.status(404).json({ error: "Medida não encontrada" });
      }

      if (!medida.estacao) {
        return res.status(404).json({ error: "Estação não encontrada na medida" });
      }

      // Criar a nova coleta de parâmetros usando os dados da medida
      const coleta = this.coletarParametrosRepository.create({
        ...dados,
        estacao: medida.estacao,
        medida: medida
      });

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
    const coletas = await this.coletarParametrosRepository.find({
      relations: ['estacao', 'medida', 'medida.parametro']
    });
    return res.json(coletas);
  } catch (error) {
    console.error("Erro ao buscar coletas:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

// Buscar ColetarParametros por ID
async buscarPorId(req: Request, res: Response) {
  try {
    const coleta = await this.coletarParametrosRepository.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ['estacao', 'medida', 'medida.parametro']
    });
    
    if (!coleta) {
      return res.status(404).json({ error: "Coleta não encontrada" });
    }
    
    return res.json(coleta);
  } catch (error) {
    const err = error as Error;
    return res.status(404).json({ error: err.message });
  }
}

// Buscar ColetarParametros por ID da Estação
async buscarEstacaoId(req: Request, res: Response) {
  try {
    const coletas = await this.coletarParametrosRepository.find({
      where: { estacao: { id_estacao: parseInt(req.params.id) } },
      relations: ['estacao', 'medida', 'medida.parametro']
    });

    if (!coletas.length) {
      return res.status(404).json({ error: "Nenhuma coleta encontrada para esta estação" });
    }

    return res.json(coletas);
  } catch (error) {
    const err = error as Error;
    return res.status(404).json({ error: err.message });
  }
}

// Atualizar ColetarParametros
async atualizar(req: Request, res: Response) {
  try {
    const dados = req.body;
    const id = parseInt(req.params.id);

    const coleta = await this.coletarParametrosRepository.findOne({
      where: { id },
      relations: ['estacao', 'medida']
    });

    if (!coleta) {
      return res.status(404).json({ error: "Coleta não encontrada" });
    }

    if (dados.medida) {
      const medida = await AppDataSource.getRepository(Medidas).findOne({
        where: { id_medida: typeof dados.medida === 'object' ? dados.medida.id_medida : dados.medida },
        relations: ['estacao', 'parametro']
      });

      if (!medida) {
        return res.status(404).json({ error: "Medida não encontrada" });
      }

      dados.estacao = medida.estacao;
      dados.medida = medida;
    }

    this.coletarParametrosRepository.merge(coleta, dados);
    const coletaAtualizada = await this.coletarParametrosRepository.save(coleta);
    return res.json(coletaAtualizada);
  } catch (error) {
    const err = error as Error;
    return res.status(400).json({ error: err.message });
  }
} 

}

export default new ColetarParametrosController();