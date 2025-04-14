import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { ColetarParametros } from "../models/coletarParametros";
import { Estacao } from "../models/estacao";
import { Parametros } from "../models/parametros";
import { Medidas } from "../models/medidas";

class ColetarParametrosService {
  private coletarParametrosRepository: Repository<ColetarParametros>;

  constructor() {
    this.coletarParametrosRepository = AppDataSource.getRepository(ColetarParametros);
  }

  // Cadastrar um novo ColetarParametros
    // Cadastrar um novo ColetarParametros
    async cadastrar(dados: Partial<ColetarParametros>) {
      const medidaId = typeof dados.medida === 'object' ? dados.medida.id_medida : dados.medida;
  
      // Buscar a medida com suas relações
      const medida = await AppDataSource.getRepository(Medidas).findOne({
        where: { id_medida: medidaId },
        relations: ['estacao', 'parametro']
      });
  
      if (!medida) {
        throw new Error("Medida não encontrada");
      }
  
      if (!medida.estacao) {
        throw new Error("Estação não encontrada na medida");
      }
  
      // Criando a nova coleta de parâmetros
      const coleta = this.coletarParametrosRepository.create({
        ...dados,
        estacao: medida.estacao,
        medida
      });
  
      return await this.coletarParametrosRepository.save(coleta);
    }
  
    // Buscar todas as coletas de parâmetros
    async buscarTodos() {
      return await this.coletarParametrosRepository.find({
        relations: [
          "estacao",
          "medida",
          "medida.parametro"
        ],
      });
    }
  
    // Buscar ColetarParametros por ID
    async buscarPorId(id: number) {
      const coleta = await this.coletarParametrosRepository.findOne({
        where: { id },
        relations: ['estacao', 'medida', 'medida.parametro']
      });
  
      if (!coleta) {
        throw new Error("Coleta de parâmetros não encontrada");
      }
  
      return coleta;
    }
  
    // Atualizar ColetarParametros por ID
    async atualizar(id: number, dados: Partial<ColetarParametros>) {
      const coleta = await this.coletarParametrosRepository.findOne({
        where: { id },
        relations: ['estacao', 'medida']
      });
  
      if (!coleta) {
        throw new Error("Coleta de parâmetros não encontrada");
      }
  
      if (dados.medida) {
        const medida = await AppDataSource.getRepository(Medidas).findOne({
          where: { id_medida: typeof dados.medida === 'object' ? dados.medida.id_medida : dados.medida },
          relations: ['estacao', 'parametro']
        });
  
        if (!medida) {
          throw new Error("Medida não encontrada");
        }
  
        dados.estacao = medida.estacao;
        dados.medida = medida;
      }
  
      this.coletarParametrosRepository.merge(coleta, dados);
      return await this.coletarParametrosRepository.save(coleta);
    }
  
    // Buscar ColetarParametros por ID da Estação
    async buscarPorIdEstacao(id_estacao: number) {
      const coletas = await this.coletarParametrosRepository.find({
        where: { estacao: { id_estacao } },
        relations: ['estacao', 'medida', 'medida.parametro'],
      });
  
      if (!coletas || coletas.length === 0) {
        throw new Error("Nenhuma coleta encontrada para esta estação.");
      }
  
      return coletas;
    }
  }

export default new ColetarParametrosService();
